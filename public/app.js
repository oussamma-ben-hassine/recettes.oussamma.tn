const { createApp } = Vue;

createApp({
  data() {
    return {
      activeTab: 'recipes',
      recipes: [],
      selectedOrigin: 'all',
      selectedCategory: 'all',
      searchQuery: '',
      isSearchingAI: false,
      aiSearchResult: null,

      // Authentification
      auth: {
        authenticated: false,
        user: null,
        ssoBaseUrl: ''
      },

      // Planning & Repas
      mealPlan: {
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
        }
      },
      isGeneratingPlan: false,

      // Liste de courses & Placard
      shoppingList: {
        totalPlannedMeals: 0,
        itemsCount: 0,
        itemsToBuyCount: 0,
        itemsInStockCount: 0,
        groupedByCategory: {},
        items: []
      },
      pantryItems: [],

      // Préférences
      preferences: {
        favoriteCuisines: ['Tunisienne', 'Marocaine', 'Halal'],
        favoriteBrands: ['Le Phare du Cap Bon', 'Dari', 'Sicam', 'Terra Delyssa'],
        spicinessPreference: 3,
        notes: ''
      },
      newBrandInput: '',

      // Chatbot Chef Amina IA
      isChatOpen: false,
      chatMessages: [],
      chatInput: '',
      isTypingChat: false,

      // Modals
      selectedRecipeModal: null,
      modalServings: 4,

      addToPlanModalRecipe: null,
      targetPlanDay: 'vendredi',
      targetPlanMealType: 'midi',
      targetPlanServings: 4,

      selectRecipeModalTarget: null, // { day, mealType }

      isCreateRecipeModalOpen: false,
      aiCreateRecipePrompt: '',
      isGeneratingCustomRecipe: false,

      isAddPantryModalOpen: false,
      pantryForm: {
        id: null,
        name: '',
        quantity: 500,
        unit: 'g',
        category: 'Épicerie & Féculents',
        brand: ''
      }
    };
  },

  computed: {
    filteredRecipes() {
      let list = this.recipes;

      if (this.selectedOrigin && this.selectedOrigin !== 'all') {
        list = list.filter(r => r.origin.toLowerCase() === this.selectedOrigin.toLowerCase());
      }

      if (this.selectedCategory && this.selectedCategory !== 'all') {
        list = list.filter(r => r.category.toLowerCase() === this.selectedCategory.toLowerCase());
      }

      if (this.searchQuery && !this.aiSearchResult) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter(r => 
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags?.some(t => t.toLowerCase().includes(q))
        );
      }

      return list;
    },

    plannedCount() {
      let count = 0;
      if (this.mealPlan && this.mealPlan.days) {
        for (const d of Object.values(this.mealPlan.days)) {
          if (d.midi) count++;
          if (d.soir) count++;
        }
      }
      return count;
    }
  },

  async mounted() {
    await this.fetchAuth();
    await this.fetchRecipes();
    await this.fetchPlan();
    await this.fetchPantry();
    await this.fetchPreferences();
    await this.fetchShoppingList();
    await this.fetchChat();
  },

  methods: {
    // --- API CLIENT ---
    async fetchAuth() {
      try {
        const res = await fetch('/api/auth/me');
        this.auth = await res.json();
      } catch (e) {
        console.warn('Erreur auth:', e);
      }
    },

    async fetchRecipes() {
      try {
        const res = await fetch('/api/recipes');
        this.recipes = await res.json();
      } catch (e) {
        console.error('Erreur chargement recettes:', e);
      }
    },

    async fetchPlan() {
      try {
        const res = await fetch('/api/plan');
        this.mealPlan = await res.json();
      } catch (e) {
        console.error('Erreur chargement planning:', e);
      }
    },

    async fetchPantry() {
      try {
        const res = await fetch('/api/pantry');
        this.pantryItems = await res.json();
      } catch (e) {
        console.error('Erreur chargement placard:', e);
      }
    },

    async fetchShoppingList() {
      try {
        const res = await fetch('/api/shopping-list');
        this.shoppingList = await res.json();
      } catch (e) {
        console.error('Erreur chargement courses:', e);
      }
    },

    async fetchPreferences() {
      try {
        const res = await fetch('/api/preferences');
        this.preferences = await res.json();
      } catch (e) {
        console.error('Erreur chargement préférences:', e);
      }
    },

    async fetchChat() {
      try {
        const res = await fetch('/api/chat');
        this.chatMessages = await res.json();
      } catch (e) {
        console.error('Erreur chargement chat:', e);
      }
    },

    // --- RECHERCHE IA ---
    async performAISearch() {
      if (!this.searchQuery.trim()) {
        this.aiSearchResult = null;
        return;
      }
      this.isSearchingAI = true;
      try {
        const res = await fetch('/api/ai/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: this.searchQuery })
        });
        const data = await res.json();
        this.aiSearchResult = data;
      } catch (err) {
        console.error('Erreur recherche IA:', err);
      } finally {
        this.isSearchingAI = false;
      }
    },

    // --- DÉTAILS RECETTE & MODAL ---
    viewRecipeDetails(recipe) {
      this.selectedRecipeModal = recipe;
      this.modalServings = recipe.defaultServings || 4;
    },

    openRecipeById(recipeId) {
      const r = this.recipes.find(x => x.id === recipeId);
      if (r) this.viewRecipeDetails(r);
    },

    adjustRecipeServings(delta) {
      const next = this.modalServings + delta;
      if (next >= 1 && next <= 30) {
        this.modalServings = next;
      }
    },

    getDistinctBrands(recipe) {
      if (!recipe.ingredients) return [];
      const brands = recipe.ingredients
        .map(i => i.recommendedBrand)
        .filter(b => b && b.trim() !== '');
      return [...new Set(brands)];
    },

    getRecipeTitle(recipeId) {
      const r = this.recipes.find(x => x.id === recipeId);
      return r ? r.title : 'Recette';
    },

    getRecipeOrigin(recipeId) {
      const r = this.recipes.find(x => x.id === recipeId);
      return r ? r.origin : '';
    },

    // --- PLANIFICATEUR ---
    openAddToPlanModal(recipe) {
      this.addToPlanModalRecipe = recipe;
      this.targetPlanDay = 'vendredi';
      this.targetPlanMealType = 'midi';
      this.targetPlanServings = 4;
    },

    async confirmAddToPlan() {
      if (!this.addToPlanModalRecipe) return;

      try {
        await fetch('/api/plan/set-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            day: this.targetPlanDay,
            mealType: this.targetPlanMealType,
            recipeId: this.addToPlanModalRecipe.id,
            servings: this.targetPlanServings
          })
        });

        await this.fetchPlan();
        await this.fetchShoppingList();
        this.addToPlanModalRecipe = null;
        this.activeTab = 'plan';
      } catch (e) {
        console.error('Erreur ajout plan:', e);
      }
    },

    openSelectRecipeModal(day, mealType) {
      this.selectRecipeModalTarget = { day, mealType };
    },

    async assignRecipeToPlanSlot(recipeId) {
      if (!this.selectRecipeModalTarget) return;
      const { day, mealType } = this.selectRecipeModalTarget;

      try {
        await fetch('/api/plan/set-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            day,
            mealType,
            recipeId,
            servings: this.mealPlan.defaultServings || 4
          })
        });

        await this.fetchPlan();
        await this.fetchShoppingList();
        this.selectRecipeModalTarget = null;
      } catch (e) {
        console.error('Erreur assignation:', e);
      }
    },

    async removeMeal(day, mealType) {
      try {
        await fetch('/api/plan/set-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            day,
            mealType,
            recipeId: null
          })
        });

        await this.fetchPlan();
        await this.fetchShoppingList();
      } catch (e) {
        console.error('Erreur suppression:', e);
      }
    },

    async generatePlanWithAI() {
      this.isGeneratingPlan = true;
      try {
        const res = await fetch('/api/ai/generate-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ servings: this.mealPlan.defaultServings || 4 })
        });
        const plan = await res.json();
        this.mealPlan = plan;
        await this.fetchShoppingList();
      } catch (e) {
        console.error('Erreur génération plan IA:', e);
        alert('Impossible de générer le planning pour le moment. Veuillez réessayer.');
      } finally {
        this.isGeneratingPlan = false;
      }
    },

    // --- LISTE DE COURSES & EXPORT ---
    copyShoppingListToClipboard() {
      if (!this.shoppingList.items || this.shoppingList.items.length === 0) {
        alert('Votre liste de courses est vide.');
        return;
      }

      let text = `🛒 LISTE DE COURSES (Recettes & Délices du Maghreb)\n`;
      text += `📅 Repas planifiés : ${this.shoppingList.totalPlannedMeals} repas\n`;
      text += `-------------------------------------------\n\n`;

      for (const [cat, items] of Object.entries(this.shoppingList.groupedByCategory)) {
        const toBuyItems = items.filter(i => i.toBuyQuantity > 0);
        if (toBuyItems.length > 0) {
          text += `📍 [${cat.toUpperCase()}]\n`;
          for (const item of toBuyItems) {
            text += `  • ${item.name} : ${item.toBuyQuantity} ${item.unit}`;
            if (item.recommendedBrand) {
              text += ` (Marque conseillée : ${item.recommendedBrand})`;
            }
            text += `\n`;
          }
          text += `\n`;
        }
      }

      const inStockItems = this.shoppingList.items.filter(i => i.status === 'in_stock');
      if (inStockItems.length > 0) {
        text += `✅ [DÉJÀ EN STOCK DANS VOTRE PLACARD - 0€]\n`;
        for (const item of inStockItems) {
          text += `  ✓ ${item.name} (${item.inStockQuantity} ${item.unit} en réserve)\n`;
        }
      }

      text += `\n✨ Généré avec amour par recettes.oussamma.tn`;

      navigator.clipboard.writeText(text).then(() => {
        alert('Liste de courses copiée dans le presse-papier ! Vous pouvez la coller dans WhatsApp ou SMS.');
      }).catch(err => {
        console.error('Erreur copie:', err);
      });
    },

    // --- MON PLACARD (PANTRY) ---
    openAddPantryModal() {
      this.pantryForm = {
        id: null,
        name: '',
        quantity: 500,
        unit: 'g',
        category: 'Épicerie & Féculents',
        brand: ''
      };
      this.isAddPantryModalOpen = true;
    },

    editPantryItem(item) {
      this.pantryForm = { ...item };
      this.isAddPantryModalOpen = true;
    },

    async savePantryItemForm() {
      if (!this.pantryForm.name.trim()) return;

      try {
        await fetch('/api/pantry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.pantryForm)
        });

        await this.fetchPantry();
        await this.fetchShoppingList();
        this.isAddPantryModalOpen = false;
      } catch (e) {
        console.error('Erreur sauvegarde placard:', e);
      }
    },

    async deletePantryItem(id) {
      try {
        await fetch(`/api/pantry/${id}`, { method: 'DELETE' });
        await this.fetchPantry();
        await this.fetchShoppingList();
      } catch (e) {
        console.error('Erreur suppression placard:', e);
      }
    },

    // --- PRÉFÉRENCES ---
    togglePreferenceCuisine(c) {
      if (!this.preferences.favoriteCuisines) this.preferences.favoriteCuisines = [];
      const idx = this.preferences.favoriteCuisines.indexOf(c);
      if (idx >= 0) {
        this.preferences.favoriteCuisines.splice(idx, 1);
      } else {
        this.preferences.favoriteCuisines.push(c);
      }
    },

    getSpicinessLabel(val) {
      const labels = {
        1: 'Très doux (sans piquant)',
        2: 'Légèrement relevé',
        3: 'Équilibré traditionnel',
        4: 'Bien piquant',
        5: 'Harissa pur Cap Bon forte'
      };
      return labels[val] || '';
    },

    addFavoriteBrand() {
      const b = this.newBrandInput.trim();
      if (b && !this.preferences.favoriteBrands.includes(b)) {
        this.preferences.favoriteBrands.push(b);
        this.newBrandInput = '';
      }
    },

    removeFavoriteBrand(b) {
      this.preferences.favoriteBrands = this.preferences.favoriteBrands.filter(x => x !== b);
    },

    async saveUserPreferences() {
      try {
        await fetch('/api/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.preferences)
        });
        await this.fetchShoppingList();
        alert('Vos préférences ont été enregistrées avec succès.');
      } catch (e) {
        console.error('Erreur préférences:', e);
      }
    },

    // --- CRÉATION DE RECETTE SUR MESURE PAR IA ---
    openCreateRecipeModal() {
      this.aiCreateRecipePrompt = '';
      this.isCreateRecipeModalOpen = true;
    },

    async submitGenerateRecipeAI() {
      if (!this.aiCreateRecipePrompt.trim()) return;
      this.isGeneratingCustomRecipe = true;

      try {
        const res = await fetch('/api/ai/generate-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: this.aiCreateRecipePrompt })
        });

        const newRecipe = await res.json();
        await this.fetchRecipes();
        this.isCreateRecipeModalOpen = false;
        this.viewRecipeDetails(newRecipe);
      } catch (e) {
        console.error('Erreur création recette IA:', e);
        alert('Une erreur est survenue lors de la création de la recette. Veuillez réessayer.');
      } finally {
        this.isGeneratingCustomRecipe = false;
      }
    },

    // --- CHATBOT CHEF AMINA IA ---
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) {
        this.$nextTick(() => this.scrollChatToBottom());
      }
    },

    sendQuickPrompt(prompt) {
      this.chatInput = prompt;
      this.sendChatMessage();
    },

    async sendChatMessage() {
      const text = this.chatInput.trim();
      if (!text || this.isTypingChat) return;

      // Message utilisateur local immédiat
      this.chatMessages.push({
        id: `local_${Date.now()}`,
        sender: 'user',
        text: text,
        timestamp: new Date().toISOString()
      });
      this.chatInput = '';
      this.isTypingChat = true;
      this.$nextTick(() => this.scrollChatToBottom());

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        this.chatMessages = data.history;
      } catch (e) {
        console.error('Erreur envoi chat:', e);
        this.chatMessages.push({
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: "Oups ! Une petite interruption réseau avec la passerelle IA. N'hésitez pas à reformuler votre question.",
          timestamp: new Date().toISOString()
        });
      } finally {
        this.isTypingChat = false;
        this.$nextTick(() => this.scrollChatToBottom());
      }
    },

    scrollChatToBottom() {
      const container = this.$refs.chatContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }
}).mount('#app');
