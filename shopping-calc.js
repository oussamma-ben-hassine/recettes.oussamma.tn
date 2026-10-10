import { Storage } from './storage.js';

export function calculateShoppingList(userId = 'default') {
  const plan = Storage.getMealPlan(userId);
  const pantry = Storage.getPantry(userId);
  const preferences = Storage.getPreferences(userId);
  const allRecipes = Storage.getRecipes();

  // 1. Récupérer tous les repas programmés dans le planning
  const plannedMeals = []; // { recipe, servings, day, mealType }

  if (plan && plan.days) {
    for (const [day, meals] of Object.entries(plan.days)) {
      if (meals.midi) {
        const r = allRecipes.find(x => x.id === (typeof meals.midi === 'string' ? meals.midi : meals.midi.recipeId));
        if (r) {
          const servings = (typeof meals.midi === 'object' && meals.midi.servings) ? meals.midi.servings : (plan.defaultServings || 4);
          plannedMeals.push({ recipe: r, servings, day, mealType: 'midi' });
        }
      }
      if (meals.soir) {
        const r = allRecipes.find(x => x.id === (typeof meals.soir === 'string' ? meals.soir : meals.soir.recipeId));
        if (r) {
          const servings = (typeof meals.soir === 'object' && meals.soir.servings) ? meals.soir.servings : (plan.defaultServings || 4);
          plannedMeals.push({ recipe: r, servings, day, mealType: 'soir' });
        }
      }
    }
  }

  // 2. Agréger les ingrédients requis
  const aggregated = {}; // key: normalized name -> { name, requiredQuantity, unit, category, recommendedBrand, recipes: [] }

  for (const meal of plannedMeals) {
    const { recipe, servings } = meal;
    if (!recipe.ingredients) continue;

    for (const ing of recipe.ingredients) {
      const normKey = ing.name.toLowerCase().trim();
      const qty = (Number(ing.quantityPerServing) || 0) * Number(servings);
      const unit = ing.unit || 'pièce';

      if (!aggregated[normKey]) {
        aggregated[normKey] = {
          name: ing.name,
          requiredQuantity: qty,
          unit: unit,
          category: ing.category || 'Épicerie',
          recommendedBrand: ing.recommendedBrand || (preferences.favoriteBrands?.[0] || 'Qualité Supérieure'),
          recipes: [recipe.title]
        };
      } else {
        // Même unité ou conversion simple
        if (aggregated[normKey].unit === unit) {
          aggregated[normKey].requiredQuantity += qty;
        } else {
          // Unités différentes -> garder trace séparée ou ajuster
          aggregated[normKey].requiredQuantity += qty;
        }
        if (!aggregated[normKey].recipes.includes(recipe.title)) {
          aggregated[normKey].recipes.push(recipe.title);
        }
      }
    }
  }

  // 3. Rapprocher avec le stock (Pantry)
  const items = [];

  for (const [key, agg] of Object.entries(aggregated)) {
    // Trouver dans le placard
    const stockItem = pantry.find(p => p.name.toLowerCase().trim() === key || key.includes(p.name.toLowerCase().trim()) || p.name.toLowerCase().trim().includes(key));
    const inStockQuantity = stockItem ? Number(stockItem.quantity) || 0 : 0;

    let toBuyQuantity = 0;
    let status = 'need_to_buy'; // 'in_stock', 'partial', 'need_to_buy'

    if (inStockQuantity >= agg.requiredQuantity) {
      toBuyQuantity = 0;
      status = 'in_stock';
    } else if (inStockQuantity > 0) {
      toBuyQuantity = Math.max(0, agg.requiredQuantity - inStockQuantity);
      status = 'partial';
    } else {
      toBuyQuantity = agg.requiredQuantity;
      status = 'need_to_buy';
    }

    // Arrondir proprement les quantités
    const roundedRequired = Math.round(agg.requiredQuantity * 10) / 10;
    const roundedToBuy = Math.round(toBuyQuantity * 10) / 10;
    const roundedInStock = Math.round(inStockQuantity * 10) / 10;

    // Préférer la marque du profil si pertinente
    let finalBrand = agg.recommendedBrand;
    if (preferences.favoriteBrands && preferences.favoriteBrands.length > 0) {
      const matchBrand = preferences.favoriteBrands.find(b => 
        (agg.name.toLowerCase().includes('harissa') && b.toLowerCase().includes('cap bon')) ||
        (agg.name.toLowerCase().includes('couscous') && (b.toLowerCase().includes('dari') || b.toLowerCase().includes('diari'))) ||
        (agg.name.toLowerCase().includes('tomate') && b.toLowerCase().includes('sicam')) ||
        (agg.name.toLowerCase().includes('huile') && b.toLowerCase().includes('delyssa')) ||
        (agg.name.toLowerCase().includes('thon') && b.toLowerCase().includes('sidi daoud'))
      );
      if (matchBrand) {
        finalBrand = matchBrand;
      }
    }

    items.push({
      name: agg.name,
      requiredQuantity: roundedRequired,
      inStockQuantity: roundedInStock,
      toBuyQuantity: roundedToBuy,
      unit: agg.unit,
      category: agg.category,
      recommendedBrand: finalBrand,
      recipes: agg.recipes,
      status: status,
      checked: status === 'in_stock' // déjà coché si en stock
    });
  }

  // 4. Grouper par rayon (Catégorie)
  const groupedByCategory = {};
  for (const item of items) {
    const cat = item.category || 'Autres';
    if (!groupedByCategory[cat]) {
      groupedByCategory[cat] = [];
    }
    groupedByCategory[cat].push(item);
  }

  return {
    totalPlannedMeals: plannedMeals.length,
    plannedMeals: plannedMeals.map(m => ({ title: m.recipe.title, servings: m.servings, day: m.day, mealType: m.mealType })),
    itemsCount: items.length,
    itemsToBuyCount: items.filter(i => i.toBuyQuantity > 0).length,
    itemsInStockCount: items.filter(i => i.status === 'in_stock').length,
    groupedByCategory,
    items
  };
}
