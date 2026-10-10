import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialRecipes } from './recipes-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const RECIPES_FILE = path.join(DATA_DIR, 'recipes.json');
const PLANS_FILE = path.join(DATA_DIR, 'meal_plans.json');
const PANTRY_FILE = path.join(DATA_DIR, 'pantry.json');
const PREFERENCES_FILE = path.join(DATA_DIR, 'preferences.json');
const CHAT_FILE = path.join(DATA_DIR, 'chats.json');

function readJsonFile(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Erreur lecture ${filePath}:`, err.message);
  }
  return defaultValue;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Erreur écriture ${filePath}:`, err.message);
    return false;
  }
}

// 1. Initialiser le catalogue de recettes
if (!fs.existsSync(RECIPES_FILE)) {
  writeJsonFile(RECIPES_FILE, initialRecipes);
}

export const Storage = {
  // --- RECETTES ---
  getRecipes() {
    return readJsonFile(RECIPES_FILE, initialRecipes);
  },

  getRecipeById(id) {
    const list = this.getRecipes();
    return list.find(r => r.id === id);
  },

  saveRecipe(recipe) {
    const list = this.getRecipes();
    const idx = list.findIndex(r => r.id === recipe.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...recipe, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({
        ...recipe,
        id: recipe.id || `rec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString()
      });
    }
    writeJsonFile(RECIPES_FILE, list);
    return recipe;
  },

  deleteRecipe(id) {
    const list = this.getRecipes();
    const filtered = list.filter(r => r.id !== id);
    writeJsonFile(RECIPES_FILE, filtered);
    return true;
  },

  // --- PLANNING DE REPAS ---
  getMealPlan(userId = 'default') {
    const all = readJsonFile(PLANS_FILE, {});
    return all[userId] || {
      period: 'semaine',
      defaultServings: 4,
      days: {
        lundi: { midi: null, soir: null },
        mardi: { midi: null, soir: null },
        mercredi: { midi: null, soir: null },
        jeudi: { midi: null, soir: null },
        vendredi: { midi: null, soir: null },
        samedi: { midi: null, soir: null },
        dimanche: { midi: null, soir: null }
      },
      updatedAt: new Date().toISOString()
    };
  },

  saveMealPlan(userId = 'default', plan) {
    const all = readJsonFile(PLANS_FILE, {});
    all[userId] = { ...plan, updatedAt: new Date().toISOString() };
    writeJsonFile(PLANS_FILE, all);
    return all[userId];
  },

  // --- PANTRY / STOCK PLACARD ---
  getPantry(userId = 'default') {
    const all = readJsonFile(PANTRY_FILE, {});
    if (!all[userId]) {
      // Stock initial de base fréquent dans une cuisine maghrébine
      all[userId] = [
        { id: 'p_1', name: "Huile d'olive extra vierge", quantity: 500, unit: "ml", category: "Huiles & Condiments", brand: "Terra Delyssa" },
        { id: 'p_2', name: "Harissa artisanale", quantity: 100, unit: "g", category: "Épices & Condiments", brand: "Le Phare du Cap Bon" },
        { id: 'p_3', name: "Concentré de tomate", quantity: 150, unit: "g", category: "Épicerie", brand: "Sicam" },
        { id: 'p_4', name: "Semoule de couscous moyen", quantity: 500, unit: "g", category: "Épicerie & Féculents", brand: "Dari" },
        { id: 'p_5', name: "Cumin en poudre de Nabeul", quantity: 40, unit: "g", category: "Épices & Condiments", brand: "Épices Nabeul" }
      ];
      writeJsonFile(PANTRY_FILE, all);
    }
    return all[userId];
  },

  savePantry(userId = 'default', items) {
    const all = readJsonFile(PANTRY_FILE, {});
    all[userId] = items;
    writeJsonFile(PANTRY_FILE, all);
    return items;
  },

  updatePantryItem(userId = 'default', item) {
    const items = this.getPantry(userId);
    const idx = items.findIndex(i => i.id === item.id || i.name.toLowerCase().trim() === item.name.toLowerCase().trim());
    if (idx >= 0) {
      items[idx] = { ...items[idx], ...item };
    } else {
      items.push({
        ...item,
        id: item.id || `p_${Date.now()}`
      });
    }
    this.savePantry(userId, items);
    return items;
  },

  removePantryItem(userId = 'default', itemId) {
    const items = this.getPantry(userId);
    const filtered = items.filter(i => i.id !== itemId);
    this.savePantry(userId, filtered);
    return filtered;
  },

  // --- PRÉFÉRENCES & PROFIL IA ---
  getPreferences(userId = 'default') {
    const all = readJsonFile(PREFERENCES_FILE, {});
    return all[userId] || {
      favoriteCuisines: ["Tunisienne", "Marocaine", "Halal"],
      favoriteBrands: ["Le Phare du Cap Bon", "Dari", "Sicam", "Terra Delyssa", "Sidi Daoud", "Randa"],
      spicinessPreference: 3, // 1: doux, 5: très piquant
      dietaryTags: ["Halal"],
      allergies: [],
      notes: "Aime les plats traditionnels généreux du vendredi, apprécie les sauces bien parfumées et les légumes frais.",
      aiNotes: "Privilégie l'agneau et la volaille fermière, fidèle aux marques d'épices tunisiennes et semoule Dari.",
      updatedAt: new Date().toISOString()
    };
  },

  savePreferences(userId = 'default', prefs) {
    const all = readJsonFile(PREFERENCES_FILE, {});
    all[userId] = { ...prefs, updatedAt: new Date().toISOString() };
    writeJsonFile(PREFERENCES_FILE, all);
    return all[userId];
  },

  // --- HISTORIQUE CHAT ---
  getChatHistory(userId = 'default') {
    const all = readJsonFile(CHAT_FILE, {});
    return all[userId] || [
      {
        id: 'msg_intro',
        sender: 'ai',
        text: "Salem alaykoum ! Je suis votre chef assistant culinaire IA. Je peux vous aider à choisir vos recettes tunisiennes et marocaines, planifier vos repas de la semaine, ajuster votre liste de courses selon ce que vous avez déjà dans vos placards, ou répondre à toutes vos questions de cuisine. Que souhaitez-vous préparer aujourd'hui ?",
        timestamp: new Date().toISOString()
      }
    ];
  },

  saveChatHistory(userId = 'default', messages) {
    const all = readJsonFile(CHAT_FILE, {});
    all[userId] = messages;
    writeJsonFile(CHAT_FILE, all);
    return messages;
  }
};
