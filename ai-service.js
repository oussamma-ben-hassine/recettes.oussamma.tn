import dotenv from 'dotenv';
dotenv.config();

const LITELLM_BASE_URL = (process.env.LITELLM_BASE_URL || 'https://ai.oussamma.tn/v1').replace(/\/+$/, '');
const LITELLM_API_KEY = process.env.LITELLM_API_KEY || 'sk-oussamma-master-gateway-2026';
const DEFAULT_MODEL = process.env.LITELLM_DEFAULT_MODEL || 'gemini/gemini-3.1-flash-lite-preview';

async function callLiteLLM(messages, options = {}) {
  const model = options.model || DEFAULT_MODEL;
  const temperature = options.temperature ?? 0.7;
  const jsonMode = options.jsonMode || false;

  const bodyPayload = {
    model: model,
    messages: messages,
    drop_params: true,
  };

  if (jsonMode) {
    bodyPayload.response_format = { type: 'json_object' };
  }

  const response = await fetch(`${LITELLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LITELLM_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(bodyPayload),
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erreur LiteLLM [${response.status}]:`, errorText);
    throw new Error(`Erreur IA (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  return content;
}

export const AIService = {
  // 1. Recherche Intelligente & Recommandation
  async searchAndRecommend(query, preferences, allRecipes) {
    const recipeSummary = allRecipes.map(r => ({
      id: r.id,
      title: r.title,
      origin: r.origin,
      category: r.category,
      time: r.prepTime + r.cookTime,
      spiciness: r.spiciness,
      tags: r.tags
    }));

    const systemPrompt = `Tu es le chef sommelier et expert culinaire spécialisé dans les cuisines tunisienne, marocaine et halal.
Voici le catalogue des recettes existantes :
${JSON.stringify(recipeSummary, null, 2)}

Préférences de l'utilisateur :
- Cuisines favorites : ${preferences.favoriteCuisines?.join(', ') || 'Toutes'}
- Tolérance au piment (1 à 5) : ${preferences.spicinessPreference || 3}
- Marques favorites : ${preferences.favoriteBrands?.join(', ') || 'Dari, Sicam, Cap Bon'}
- Notes : ${preferences.notes || ''}

L'utilisateur demande : "${query}"

Réponds OBLIGATOIREMENT sous format JSON strict avec la structure suivante :
{
  "recommendations": [
    {
      "recipeId": "rec_id_existant",
      "matchScore": 95,
      "reason": "Explication chaleureuse de pourquoi cette recette correspond parfaitement"
    }
  ],
  "advice": "Un conseil de chef ou suggestion d'accompagnement",
  "suggestNewRecipeIdea": null ou "Titre d'une recette sur mesure si aucune ne correspond à 100%"
}`;

    try {
      const raw = await callLiteLLM([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ], { jsonMode: true });

      const parsed = JSON.parse(raw);
      return parsed;
    } catch (err) {
      console.warn('Fallback recherche sémantique classique suite à erreur IA:', err.message);
      // Fallback recherche textuelle
      const q = query.toLowerCase();
      const matches = allRecipes.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.origin.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
      return {
        recommendations: matches.map(m => ({
          recipeId: m.id,
          matchScore: 80,
          reason: `Recette correspondant aux mots-clés "${query}".`
        })),
        advice: "Découvrez cette sélection authentique.",
        suggestNewRecipeIdea: null
      };
    }
  },

  // 2. Création de nouvelle recette par IA
  async generateRecipe(prompt, preferences) {
    const systemPrompt = `Tu es un grand maître cuisinier de renommée pour la gastronomie tunisienne, marocaine et cuisine halal maghrébine et orientale.
Tu dois concevoir une recette authentique, savoureuse, généreuse et précise.

Marques recommandées de l'écosystème à valoriser selon le contexte :
- Couscous & Semoules : "Dari" ou "Diari"
- Concentré de tomate : "Sicam"
- Harissa : "Le Phare du Cap Bon"
- Huile d'olive : "Terra Delyssa" ou "Chemlali"
- Thon : "Sidi Daoud"
- Pâtes : "Randa"
- Boucherie : "Boucherie Halal Certifiée"

Préférences utilisateur :
- Niveau de piment souhaité (1-5) : ${preferences.spicinessPreference || 3}
- Marques favorites : ${preferences.favoriteBrands?.join(', ') || 'Cap Bon, Dari, Sicam'}

Génère la recette en JSON STRICT avec la structure exacte suivante :
{
  "title": "Nom complet de la recette",
  "origin": "Tunisienne" ou "Marocaine" ou "Moyen-Orient / Halal",
  "category": "Couscous & Plats Traditionnels" ou "Tajines & Mijotés" ou "Plats Express & Poêlées" ou "Soupes & Entrées" ou "Street-Food & Grillades Halal",
  "difficulty": "Facile" ou "Moyen" ou "Difficile",
  "prepTime": 20,
  "cookTime": 45,
  "defaultServings": 4,
  "spiciness": 3,
  "emoji": "🍲",
  "image": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
  "description": "Description alléchante de la recette...",
  "ingredients": [
    {
      "name": "Nom de l'ingrédient",
      "quantityPerServing": 100,
      "unit": "g" ou "ml" ou "pièce" ou "c. à soupe",
      "category": "Boucherie Halal" ou "Épicerie & Féculents" ou "Primeur (Légumes & Fruits)" ou "Épices & Condiments" ou "Frais & Crèmerie" ou "Huiles & Condiments",
      "recommendedBrand": "Nom de la marque conseillée",
      "notes": "Précision facultative"
    }
  ],
  "instructions": [
    "Étape 1 détaillée...",
    "Étape 2 détaillée..."
  ],
  "tips": "Astuce secrète de grand-mère pour sublimer le plat",
  "tags": ["Tunisien", "Halal", "Épicé", "Familial"],
  "nutritionPerServing": {
    "calories": 520,
    "protein": 30,
    "carbs": 55,
    "fat": 18
  }
}`;

    const raw = await callLiteLLM([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Crée cette recette : ${prompt}` }
    ], { jsonMode: true });

    const recipe = JSON.parse(raw);
    recipe.id = `rec_ai_${Date.now()}`;
    recipe.createdAt = new Date().toISOString();
    return recipe;
  },

  // 3. Génération Automatique de Planning de Repas
  async generateWeeklyPlan(preferences, allRecipes, servings = 4) {
    const recipeSummary = allRecipes.map(r => ({
      id: r.id,
      title: r.title,
      origin: r.origin,
      category: r.category,
      time: r.prepTime + r.cookTime,
      tags: r.tags
    }));

    const systemPrompt = `Tu es un nutritionniste et planificateur de repas pour la gastronomie tunisienne, marocaine et halal.
Voici la liste des recettes disponibles avec leurs IDs :
${JSON.stringify(recipeSummary, null, 2)}

Préférences utilisateur :
${JSON.stringify(preferences, null, 2)}

Crée un planning hebdomadaire harmonieux et varié (Lundi à Dimanche, midi et soir) pour ${servings} personnes.
Règles :
- Vendredi midi : Couscous traditionnel (tunisien ou marocain).
- Équilibre entre viandes rouges, volailles, poissons et repas plus légers ou soupes le soir.
- Utilise exclusivement les IDs de recettes listées ci-dessus.

Réponds en JSON STRICT avec la structure :
{
  "period": "semaine",
  "defaultServings": ${servings},
  "explanation": "Pourquoi ce menu de la semaine est parfaitement équilibré pour vous",
  "days": {
    "lundi": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } },
    "mardi": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } },
    "mercredi": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } },
    "jeudi": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } },
    "vendredi": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } },
    "samedi": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } },
    "dimanche": { "midi": { "recipeId": "rec_id", "servings": ${servings} }, "soir": { "recipeId": "rec_id", "servings": ${servings} } }
  }
}`;

    const raw = await callLiteLLM([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: "Génère mon menu de la semaine idéal !" }
    ], { jsonMode: true });

    return JSON.parse(raw);
  },

  // 4. Assistant Chatbot Culinaire Latéral
  async chatChef(userMessage, history = [], context = {}, lang = 'fr') {
    let langInstruction = "Réponds toujours en français chaleureux.";
    if (lang === 'ar') {
      langInstruction = "أجب دائماً باللغة العربية الفصحى أو بلهجة مغاربية محببة وسلسة، بأسلوب دافئ وودود وواضح (مع عبارات ترحيبية مثل أهلاً وسهلاً، بالصحة والراحة، شهية طيبة).";
    } else if (lang === 'en') {
      langInstruction = "Always respond in warm, friendly and helpful English (you may include charming cultural touches like 'bessaha' or 'bon appétit').";
    }

    const systemPrompt = `Tu es "Chef Amina", l'assistante culinaire IA chaleureuse, passionnée et bienveillante de l'application Recettes Halal (Tunisie, Maroc & Levant).
Tu parles avec enthousiasme, un ton convivial, généreux et complice.

Tu connais parfaitement :
- Toutes les subtilités des cuisines tunisiennes (tabel, harissa du Cap Bon, kafteji, ojja, lablabi, couscous au poisson/agneau, briks, chorba frik...)
- Toutes les subtilités des cuisines marocaines (tajines aux citrons confits, couscous 7 légumes, harira, pastilla, zaalouk, daghmira, smen...)
- Les règles halal et le respect des ingrédients de qualité
- Les marques réputées : Dari, Le Phare du Cap Bon, Sicam, Terra Delyssa, Sidi Daoud, Randa
- Comment utiliser l'application :
  * Onglet "Recettes" : voir, filtrer ou créer des recettes avec l'IA
  * Onglet "Planificateur" : glisser ou choisir des recettes pour chaque repas de la semaine et ajuster le nombre de personnes
  * Onglet "Courses & Placard" : la liste de courses calcule automatiquement les ingrédients totaux nécessaires et déduit ce que vous avez déjà dans votre placard ! Vous pouvez saisir vos stocks restants.
  * Onglet "Préférences" : définir votre niveau de piquant et marques favorites
  * Favoris : cliquer sur le cœur pour marquer vos plats préférés et composer un menu de coups de cœur

Contexte actuel de l'utilisateur :
- Recettes disponibles au total : ${context.recipeCount || 8}
- Repas planifiés cette semaine : ${context.plannedMealsCount || 0}
- Éléments dans le placard : ${context.pantryCount || 0}
- Marques favorites : ${context.favoriteBrands?.join(', ') || 'Dari, Cap Bon, Sicam'}
- Langue demandée : ${lang}

Si l'utilisateur te demande une recette, une aide ou un conseil, réponds avec précision, clarté et bienveillance.
${langInstruction}`;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-8).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      })),
      { role: 'user', content: userMessage }
    ];

    const reply = await callLiteLLM(formattedMessages, { temperature: 0.7 });
    return reply;
  },

  // 5. Recherche Web & Extraction de Recette (Gratuit & Universel)
  async importFromWeb(queryOrUrl, preferences = {}) {
    const trimmed = (queryOrUrl || '').trim();
    const isUrl = /^https?:\/\//i.test(trimmed);

    if (isUrl) {
      // Extraction directe depuis l'URL fournie (Marmiton, 750g, blogs, etc.)
      const pageData = await fetchWebPageContent(trimmed);

      const systemPrompt = `Tu es un grand chef cuisinier expert en gastronomie tunisienne, marocaine et cuisine orientale halal.
Tu viens de recevoir le texte extrait d'une page web de recette (URL: ${trimmed}).
Titre extrait de la page : "${pageData.title || ''}".
Image extraite : "${pageData.image || ''}".

Analyse fidèlement la recette décrite dans ce texte et structure-la dans le format JSON strict de notre catalogue.
Règles impératives :
1. Si les ingrédients sont indiqués pour un nombre de personnes (ex: 4 ou 6), calcule précisément les quantités par personne (quantityPerServing).
2. Catégorise chaque ingrédient ("Boucherie Halal", "Épicerie & Féculents", "Primeur (Légumes & Fruits)", "Épices & Condiments", "Frais & Crèmerie", "Huiles & Condiments").
3. Si la recette utilise de la semoule, harissa, tomate concentrée, huile d'olive, propose les marques recommandées correspondantes de notre écosystème : "Dari", "Le Phare du Cap Bon", "Sicam", "Terra Delyssa", "Sidi Daoud", "Randa".
4. Si une image valide a été extraite ("${pageData.image || ''}"), utilise-la dans le champ "image", sinon utilise une belle URL photo Unsplash adaptée.
5. Détermine l'origine : "Tunisienne", "Marocaine" ou "Halal".

Réponds EN JSON STRICT avec la structure exacte suivante :
{
  "title": "Nom précis de la recette",
  "origin": "Tunisienne" ou "Marocaine" ou "Halal",
  "category": "Couscous & Plats Traditionnels" ou "Tajines & Mijotés" ou "Plats Express & Poêlées" ou "Soupes & Entrées" ou "Street-Food & Grillades Halal",
  "difficulty": "Facile" ou "Moyen" ou "Difficile",
  "prepTime": 20,
  "cookTime": 45,
  "defaultServings": 4,
  "spiciness": 3,
  "emoji": "🍲",
  "image": "URL de l'image",
  "description": "Courte description fidèle au plat et à la tradition culinaire",
  "sourceUrl": "${trimmed}",
  "source": "Web Import",
  "ingredients": [
    {
      "name": "Nom de l'ingrédient",
      "quantityPerServing": 100,
      "unit": "g" ou "ml" ou "pièce" ou "c. à soupe",
      "category": "Catégorie",
      "recommendedBrand": "Marque recommandée ou vide",
      "notes": "Précision facultative"
    }
  ],
  "instructions": [
    "Étape 1...",
    "Étape 2..."
  ],
  "tips": "Astuce secrète de chef pour réussir la recette",
  "tags": ["Import Web", "Traditionnel", "Halal"],
  "nutritionPerServing": {
    "calories": 520,
    "protein": 30,
    "carbs": 60,
    "fat": 16
  }
}`;

      const raw = await callLiteLLM([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Voici le texte extrait de la page web à analyser :\n\n${pageData.cleanText}` }
      ], { jsonMode: true });

      const recipe = JSON.parse(raw);
      recipe.id = `rec_web_${Date.now()}`;
      if (pageData.image && (!recipe.image || recipe.image.includes('unsplash.com/photo-1541518763669'))) {
        recipe.image = pageData.image;
      }
      recipe.sourceUrl = trimmed;
      recipe.source = 'Web Import';
      recipe.createdAt = new Date().toISOString();
      return recipe;
    } else {
      // Recherche Web par mots-clés ou nom de plat
      const systemPrompt = `Tu es un chef cuisinier de renom connecté aux connaissances culinaires mondiales et du web pour la cuisine maghrébine (Tunisie, Maroc, Algérie) et halal.
L'utilisateur souhaite rechercher et importer la recette la plus authentique et réputée sur le web pour : "${trimmed}".
Tu dois synthétiser et formater la version la plus fidèle, savoureuse et plébiscitée de ce plat traditionnel.

Marques recommandées de l'écosystème :
- Semoule / Couscous : "Dari" ou "Diari"
- Concentré de tomate : "Sicam"
- Harissa : "Le Phare du Cap Bon"
- Huile d'olive : "Terra Delyssa"
- Thon : "Sidi Daoud"

Réponds EN JSON STRICT avec la structure exacte suivante :
{
  "title": "Nom authentique du plat",
  "origin": "Tunisienne" ou "Marocaine" ou "Halal",
  "category": "Couscous & Plats Traditionnels" ou "Tajines & Mijotés" ou "Plats Express & Poêlées" ou "Soupes & Entrées" ou "Street-Food & Grillades Halal",
  "difficulty": "Facile" ou "Moyen" ou "Difficile",
  "prepTime": 25,
  "cookTime": 50,
  "defaultServings": 4,
  "spiciness": 3,
  "emoji": "🍲",
  "image": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
  "description": "Description alléchante de la recette traditionnelle du plat...",
  "source": "Recherche Web IA",
  "ingredients": [
    {
      "name": "Nom de l'ingrédient",
      "quantityPerServing": 100,
      "unit": "g" ou "ml" ou "pièce" ou "c. à soupe",
      "category": "Boucherie Halal" ou "Épicerie & Féculents" ou "Primeur (Légumes & Fruits)" ou "Épices & Condiments" ou "Frais & Crèmerie" ou "Huiles & Condiments",
      "recommendedBrand": "Marque recommandée",
      "notes": "Précision"
    }
  ],
  "instructions": [
    "Étape 1...",
    "Étape 2..."
  ],
  "tips": "Astuce traditionnelle pour réussir le plat",
  "tags": ["Recherche Web", "Authentique", "Halal"],
  "nutritionPerServing": {
    "calories": 550,
    "protein": 32,
    "carbs": 65,
    "fat": 18
  }
}`;

      const raw = await callLiteLLM([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Recherche et génère la recette du web pour : ${trimmed}` }
      ], { jsonMode: true });

      const recipe = JSON.parse(raw);
      recipe.id = `rec_web_${Date.now()}`;
      recipe.source = 'Recherche Web IA';
      recipe.createdAt = new Date().toISOString();
      return recipe;
    }
  }
};

async function fetchWebPageContent(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,ar;q=0.8,en;q=0.7'
      },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow'
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status} lors de l'accès à la page`);
    }

    const html = await res.text();

    // Extraire og:image ou twitter:image si disponible
    let image = null;
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
                    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (ogMatch && ogMatch[1]) {
      image = ogMatch[1].trim();
    }

    // Extraire la balise <title>
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Nettoyer le HTML pour ne garder que le contenu textuel
    let cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();

    cleanText = cleanText.substring(0, 12000);

    return { title, image, cleanText };
  } catch (err) {
    console.error('Erreur fetchWebPageContent:', err.message);
    throw new Error(`Impossible de récupérer le contenu de la page web : ${err.message}`);
  }
}

