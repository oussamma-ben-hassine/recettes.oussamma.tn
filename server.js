import express from 'express';
import session from 'cookie-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

import { Storage } from './storage.js';
import { calculateShoppingList } from './shopping-calc.js';
import { AIService } from './ai-service.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = (process.env.APP_URL || 'https://recettes.oussamma.tn').replace(/\/$/, '');

// =============================================================================
// CONFIGURATION FOURNISSEUR SSO (OIDC)
// =============================================================================
const SSO_BASE_URL = (process.env.SSO_BASE_URL || 'https://sso-a.oussamma.tn').replace(/\/$/, '');
const SSO_CLIENT_ID = process.env.SSO_CLIENT_ID || 'client_recettes_app';
const SSO_CLIENT_SECRET = process.env.SSO_CLIENT_SECRET || 'sec_recettes_platform_secret_2026';
const SSO_REDIRECT_URI = process.env.SSO_REDIRECT_URI || `${APP_URL}/auth/callback`;
const SSO_SCOPES = process.env.SSO_SCOPES || 'openid profile email';

const SSO_AUTH_ENDPOINT = `${SSO_BASE_URL}/oauth/authorize`;
const SSO_TOKEN_ENDPOINT = `${SSO_BASE_URL}/oauth/token`;
const SSO_USERINFO_ENDPOINT = `${SSO_BASE_URL}/oauth/userinfo`;
const SSO_LOGOUT_ENDPOINT = `${SSO_BASE_URL}/oauth/logout`;

const SECRET_SIGN_KEY = process.env.SESSION_SECRET || 'recettes-oussamma-super-secret-key-2026-prod';

// =============================================================================
// MIDDLEWARES DE BASE & PROXY COOLIFY
// =============================================================================
app.set('trust proxy', true);

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Sessions chiffrées par cookie HttpOnly
app.use(session({
  name: 'recettes_session',
  keys: [SECRET_SIGN_KEY],
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
}));

// =============================================================================
// HELPER PKCE & ÉTAT OIDC
// =============================================================================
function generateOidcStateAndPKCE() {
  const nonce = crypto.randomBytes(16).toString('hex');
  const signature = crypto.createHmac('sha256', SECRET_SIGN_KEY).update(`state:${nonce}`).digest('hex');
  const state = `${nonce}.${signature}`;
  const code_verifier = crypto.createHmac('sha256', SECRET_SIGN_KEY).update(`pkce:${nonce}`).digest('base64url').substring(0, 64);
  const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64url');
  return { state, code_verifier, code_challenge };
}

function verifyOidcState(stateParam, sessionState) {
  if (stateParam && typeof stateParam === 'string') {
    const [nonce, signature] = stateParam.split('.');
    if (nonce && signature) {
      const expectedSignature = crypto.createHmac('sha256', SECRET_SIGN_KEY).update(`state:${nonce}`).digest('hex');
      try {
        const sigBuf = Buffer.from(signature, 'hex');
        const expBuf = Buffer.from(expectedSignature, 'hex');
        if (sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf)) {
          const derivedVerifier = crypto.createHmac('sha256', SECRET_SIGN_KEY).update(`pkce:${nonce}`).digest('base64url').substring(0, 64);
          return { valid: true, derivedVerifier };
        }
      } catch (e) {}
    }
  }
  if (sessionState && stateParam === sessionState) {
    return { valid: true };
  }
  return null;
}

function getUserId(req) {
  return req.session?.user?.id || req.session?.user?.email || 'default_user';
}

// =============================================================================
// HEALTHCHECK
// =============================================================================
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), app: 'recettes.oussamma.tn', sso: SSO_BASE_URL });
});

// =============================================================================
// AUTHENTIFICATION SSO
// =============================================================================
app.get('/auth/login', (req, res) => {
  const { state, code_verifier, code_challenge } = generateOidcStateAndPKCE();
  req.session.pkce_code_verifier = code_verifier;
  req.session.oauth_state = state;

  const authUrl = new URL(SSO_AUTH_ENDPOINT);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', SSO_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', SSO_REDIRECT_URI);
  authUrl.searchParams.set('scope', SSO_SCOPES);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', code_challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  res.redirect(authUrl.toString());
});

app.get('/auth/callback', async (req, res) => {
  const { code, state, error, error_description } = req.query;

  if (error) {
    console.warn('Erreur SSO retournée:', error, error_description);
    return res.redirect(`/?auth_error=${encodeURIComponent(error_description || error)}`);
  }

  if (!code) {
    return res.redirect('/?auth_error=code_manquant');
  }

  const stateCheck = verifyOidcState(state, req.session?.oauth_state);
  const code_verifier = req.session?.pkce_code_verifier || stateCheck?.derivedVerifier || '';

  try {
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: SSO_CLIENT_ID,
      client_secret: SSO_CLIENT_SECRET,
      code: code.toString(),
      redirect_uri: SSO_REDIRECT_URI,
      code_verifier: code_verifier,
    });

    const tokenRes = await fetch(SSO_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: tokenParams,
    });

    if (!tokenRes.ok) {
      console.error('Échec échange token:', tokenRes.status, await tokenRes.text());
      return res.redirect('/?auth_error=echange_token_echoue');
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Récupérer les informations utilisateur
    const userRes = await fetch(SSO_USERINFO_ENDPOINT, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (userRes.ok) {
      const userInfo = await userRes.json();
      req.session.user = {
        id: userInfo.sub || userInfo.id,
        email: userInfo.email,
        name: userInfo.name || userInfo.preferred_username || userInfo.email.split('@')[0],
        avatar_url: userInfo.picture || userInfo.avatar_url,
        roles: userInfo.roles || []
      };
      req.session.accessToken = accessToken;
    }

    res.redirect('/?logged_in=1');
  } catch (err) {
    console.error('Erreur traitement callback SSO:', err);
    res.redirect('/?auth_error=erreur_interne');
  }
});

// Connexion d'appoint / Invité pour tests ou session directe
app.post('/api/auth/guest-login', (req, res) => {
  const { name } = req.body;
  req.session.user = {
    id: 'user_invité',
    name: name || 'Gourmet Invité',
    email: 'invite@oussamma.tn',
    isGuest: true
  };
  res.json({ success: true, user: req.session.user });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    authenticated: !!req.session?.user,
    user: req.session?.user || null,
    ssoBaseUrl: SSO_BASE_URL
  });
});

app.get('/auth/logout', (req, res) => {
  req.session = null;
  res.redirect(`${SSO_LOGOUT_ENDPOINT}?post_logout_redirect_uri=${encodeURIComponent(APP_URL)}`);
});

// =============================================================================
// API RECETTES
// =============================================================================
app.get('/api/recipes', (req, res) => {
  const { q, origin, category, maxTime } = req.query;
  let list = Storage.getRecipes();

  if (origin && origin !== 'all') {
    list = list.filter(r => r.origin.toLowerCase() === origin.toLowerCase());
  }
  if (category && category !== 'all') {
    list = list.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }
  if (maxTime) {
    list = list.filter(r => (r.prepTime + r.cookTime) <= Number(maxTime));
  }
  if (q) {
    const query = q.toLowerCase();
    list = list.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(query)) ||
      r.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  res.json(list);
});

app.get('/api/recipes/:id', (req, res) => {
  const recipe = Storage.getRecipeById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: 'Recette introuvable' });
  }
  res.json(recipe);
});

app.post('/api/recipes', (req, res) => {
  try {
    const saved = Storage.saveRecipe(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/recipes/:id', (req, res) => {
  Storage.deleteRecipe(req.params.id);
  res.json({ success: true });
});

// =============================================================================
// API IA LITELLM
// =============================================================================
app.post('/api/ai/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Requête requise' });

    const userId = getUserId(req);
    const prefs = Storage.getPreferences(userId);
    const allRecipes = Storage.getRecipes();

    const result = await AIService.searchAndRecommend(query, prefs, allRecipes);
    res.json(result);
  } catch (err) {
    console.error('Erreur API AI Search:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/generate-recipe', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt requis' });

    const userId = getUserId(req);
    const prefs = Storage.getPreferences(userId);

    const generated = await AIService.generateRecipe(prompt, prefs);
    // Sauvegarder automatiquement dans le catalogue
    Storage.saveRecipe(generated);

    res.json(generated);
  } catch (err) {
    console.error('Erreur API AI Generate Recipe:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/generate-plan', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { servings } = req.body;
    const prefs = Storage.getPreferences(userId);
    const allRecipes = Storage.getRecipes();

    const plan = await AIService.generateWeeklyPlan(prefs, allRecipes, servings || 4);
    Storage.saveMealPlan(userId, plan);

    res.json(plan);
  } catch (err) {
    console.error('Erreur API AI Generate Plan:', err);
    res.status(500).json({ error: err.message });
  }
});

// =============================================================================
// API PLANNING DE REPAS
// =============================================================================
app.get('/api/plan', (req, res) => {
  const userId = getUserId(req);
  const plan = Storage.getMealPlan(userId);
  res.json(plan);
});

app.post('/api/plan', (req, res) => {
  const userId = getUserId(req);
  const saved = Storage.saveMealPlan(userId, req.body);
  res.json(saved);
});

// Assigner ou enlever une recette d'un jour précis
app.post('/api/plan/set-meal', (req, res) => {
  const userId = getUserId(req);
  const { day, mealType, recipeId, servings } = req.body; // mealType: 'midi' | 'soir'

  const plan = Storage.getMealPlan(userId);
  if (!plan.days[day]) plan.days[day] = { midi: null, soir: null };

  if (recipeId) {
    plan.days[day][mealType] = {
      recipeId,
      servings: servings || plan.defaultServings || 4
    };
  } else {
    plan.days[day][mealType] = null;
  }

  const saved = Storage.saveMealPlan(userId, plan);
  res.json(saved);
});

// =============================================================================
// API PANTRY (PLACARD & STOCKS EXISTANTS)
// =============================================================================
app.get('/api/pantry', (req, res) => {
  const userId = getUserId(req);
  const items = Storage.getPantry(userId);
  res.json(items);
});

app.post('/api/pantry', (req, res) => {
  const userId = getUserId(req);
  const updated = Storage.updatePantryItem(userId, req.body);
  res.json(updated);
});

app.delete('/api/pantry/:id', (req, res) => {
  const userId = getUserId(req);
  const updated = Storage.removePantryItem(userId, req.params.id);
  res.json(updated);
});

// =============================================================================
// API LISTE DE COURSES INTELLIGENTE
// =============================================================================
app.get('/api/shopping-list', (req, res) => {
  const userId = getUserId(req);
  const list = calculateShoppingList(userId);
  res.json(list);
});

// =============================================================================
// API PRÉFÉRENCES & PROFIL IA
// =============================================================================
app.get('/api/preferences', (req, res) => {
  const userId = getUserId(req);
  const prefs = Storage.getPreferences(userId);
  res.json(prefs);
});

app.post('/api/preferences', (req, res) => {
  const userId = getUserId(req);
  const saved = Storage.savePreferences(userId, req.body);
  res.json(saved);
});

// =============================================================================
// API CHATBOT CULINAIRE LATÉRAL
// =============================================================================
app.get('/api/chat', (req, res) => {
  const userId = getUserId(req);
  const history = Storage.getChatHistory(userId);
  res.json(history);
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message requis' });

    const userId = getUserId(req);
    const history = Storage.getChatHistory(userId);
    const plan = Storage.getMealPlan(userId);
    const pantry = Storage.getPantry(userId);
    const prefs = Storage.getPreferences(userId);
    const allRecipes = Storage.getRecipes();

    // 1. Ajouter le message utilisateur
    const userMsg = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString()
    };
    history.push(userMsg);

    // 2. Contexte pour l'IA
    let plannedMealsCount = 0;
    if (plan && plan.days) {
      for (const d of Object.values(plan.days)) {
        if (d.midi) plannedMealsCount++;
        if (d.soir) plannedMealsCount++;
      }
    }

    const context = {
      recipeCount: allRecipes.length,
      plannedMealsCount,
      pantryCount: pantry.length,
      favoriteBrands: prefs.favoriteBrands || []
    };

    // 3. Appel IA
    const replyText = await AIService.chatChef(message, history, context);

    const aiMsg = {
      id: `msg_ai_${Date.now()}`,
      sender: 'ai',
      text: replyText,
      timestamp: new Date().toISOString()
    };
    history.push(aiMsg);

    // Sauvegarder l'historique
    Storage.saveChatHistory(userId, history);

    res.json({ reply: aiMsg, history });
  } catch (err) {
    console.error('Erreur API Chat:', err);
    res.status(500).json({ error: err.message });
  }
});

// =============================================================================
// STATIQUES & FRONTEND SINGLE-PAGE APP
// =============================================================================
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =============================================================================
// DÉMARRAGE DU SERVEUR
// =============================================================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🍳 Application Recettes & Courses en écoute sur :`);
  console.log(`   - Local  : http://localhost:${PORT}`);
  console.log(`   - Public : ${APP_URL}`);
  console.log(`   - SSO    : ${SSO_BASE_URL} (${SSO_CLIENT_ID})`);
  console.log(`=======================================================`);
});
