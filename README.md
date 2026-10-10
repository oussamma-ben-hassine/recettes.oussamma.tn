# 🍳 Délices d'Orient & Maghreb (recettes.oussamma.tn)

Application culinaire intelligente intégrée à l'écosystème **oussamma.tn**, dédiée aux **recettes traditionnelles tunisiennes, marocaines et halal**, avec :
- **Authentification SSO OIDC** intégrée (`sso-a.oussamma.tn`)
- **Intelligence Artificielle LiteLLM** (`ai.oussamma.tn`) pour la recherche intelligente en langage naturel, la génération de nouvelles recettes sur mesure et la capture des préférences
- **Planificateur de Repas de la Semaine** (midi et soir, avec nombre de personnes personnalisable)
- **Calculateur de Liste de Courses Consolidée** avec déduction automatique des quantités en stock dans votre placard et recommandations des marques phares (Le Phare du Cap Bon, Dari, Sicam, Terra Delyssa, Sidi Daoud...)
- **Assistant Chatbot Latéral Chef Amina IA** pour vous guider dans l'utilisation de l'application et vous prodiguer des conseils et astuces en direct

---

## 🌟 Fonctionnalités Principales

### 1. 📖 Catalogue de Recettes Authentiques
- **Cuisine Tunisienne** : Couscous à l'agneau & légumes fondants, Kafteji traditionnel au couteau, Ojja merguez & œufs pochés, Lablabi complet au cumin, Tajine tunisien au poulet, Briks croustillantes à l'œuf et thon de Mahdia, Chorba frik...
- **Cuisine Marocaine** : Tajine de poulet aux citrons confits et olives violettes, Couscous royal aux 7 légumes et bœuf, Harira authentique veloutée, Tajine de veau aux pruneaux et amandes, Zaalouk fumé...
- **Cuisine Halal & Levant** : Chawarma maison au poulet mariné et crème Toum, Maklouba palestinienne renversée aux aubergines, Kabsa parfumée...
- Chaque recette propose le minutage, la difficulté, le niveau de piquant (1-5), les marques conseillées pour chaque ingrédient et le recalcul dynamique des ingrédients selon le nombre de personnes souhaité.

### 2. 🤖 Moteur IA LiteLLM Intégré
- Connecté à la passerelle universelle LiteLLM `https://ai.oussamma.tn/v1`.
- **Recherche en langage naturel** : "Un plat tunisien rapide avec des œufs pour ce soir", "Un tajine marocain doux pour les enfants".
- **Création de recettes par IA** : Tapez vos ingrédients ou une idée de plat, l'IA conçoit une recette complète et l'ajoute immédiatement à votre catalogue.
- **Menu hebdomadaire en 1 clic** : L'IA compose un planning équilibré et varié pour toute la semaine selon vos préférences (couscous le vendredi, alternance viande/poisson/légumes).

### 3. 🗓️ Planificateur de Menus (Semaine & Périodes)
- Organisation jour par jour (Lundi à Dimanche) pour le midi et le soir.
- Ajustement du nombre de convives par repas (ex: 2 le midi, 6 le vendredi soir).
- Ajout direct depuis n'importe quelle fiche recette ou depuis le planificateur.

### 4. 🛒 Liste de Courses Intelligente & Gestion du Placard
- **Consolidation automatique** : Somme exacte de tous les ingrédients des recettes planifiées.
- **Déduction du placard** : Ce que vous avez déjà en stock est automatiquement déduit pour calculer le reste net à acheter.
- **Marques recommandées** : Affichage clair des marques de référence selon votre profil.
- **Organisation par rayon** : Boucherie Halal, Épicerie & Féculents, Primeur, Épices & Condiments...
- **Bouton Copier** : Export immédiat au format texte clair prêt pour WhatsApp ou SMS.

### 5. 💬 Assistante Chatbot Latérale "Chef Amina IA"
- Disponible à tout instant sur le volet droit de l'écran.
- Répond aux questions sur comment utiliser l'application.
- Partage des astuces de cuisson (cuisson vapeur de la semoule, émulsion de la sauce daghmira, etc.).

---

## 🚀 Déploiement

### Déploiement Coolify
1. Sur le tableau de bord **Coolify** (`https://coolify.oussamma.tn`) :
2. Projet : `recettes.oussamma.tn`
3. Domaine FQDN : `https://recettes.oussamma.tn`
4. Port exposé : `3000`
5. Dépôt Git : `https://github.com/oussamma-ben-hassine/recettes.oussamma.tn`

### Lancement Local
```bash
npm install
npm start
```
L'application démarre sur `http://localhost:3000`.
