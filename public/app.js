const { createApp } = Vue;

const translations = {
  fr: {
    appTitle: "Cuisine & Recettes IA",
    appSubtitle: "Tunisienne • Marocaine • 100% Halal",
    navRecipes: "Recettes",
    navPlan: "Planificateur",
    navShopping: "Liste de Courses",
    navPantry: "Mon Placard",
    navPreferences: "Préférences",
    navFavorites: "Favoris",
    chatChefButton: "Chef Amina IA",
    ssoConnected: "SSO Connecté",
    ssoLogin: "Connexion SSO",
    logout: "Déconnexion",

    // Auth wall
    authWallTitle: "Bienvenue sur l'Application Recettes",
    authWallSubtitle: "Votre plateforme intelligente de cuisine maghrébine et halal",
    authWallNotice: "L'accès à cette application est réservé aux utilisateurs authentifiés de l'écosystème oussamma.tn.",
    authWallButton: "Se connecter avec notre SSO",
    authWallBadge: "Accès Sécurisé OIDC / SSO",
    authWallFeatures: [
      "Catalogue exclusif de recettes tunisiennes, marocaines et orientales",
      "Génération et personnalisation intelligente de menus par IA (LiteLLM)",
      "Liste de courses dynamique avec déduction du stock de votre placard",
      "Assistant culinaire personnel interactif 24/7"
    ],

    // Recipes tab
    bannerBadge: "Propulsé par LiteLLM & notre IA culinaire",
    bannerTitle: "Savourez l'authenticité des recettes tunisiennes & marocaines",
    bannerDesc: "Explorez le catalogue traditionnel, planifiez vos repas pour la semaine et générez automatiquement la liste exacte de vos courses avec déduction de vos réserves.",
    searchPlaceholder: "Ex: Tajine sucré salé, Ojja merguez, repas sans viande en 25 min...",
    btnSearchAI: "Recherche IA",
    btnCreateAI: "Créer par IA",
    allRecipes: "Toutes les recettes",
    tunisianRecipes: "Tunisiennes",
    moroccanRecipes: "Marocaines",
    halalRecipes: "Spécialités Halal",
    myFavorites: "Mes Favoris",
    allCategories: "Toutes les catégories",
    catCouscous: "Couscous & Traditionnels",
    catTajines: "Tajines & Mijotés",
    catExpress: "Plats Express & Poêlées",
    catSoups: "Soupes & Entrées",
    catStreetFood: "Street-Food & Grillades",
    halalBadge: "100% Halal",
    prepCookTime: "min",
    servingsText: "pers.",
    recommendedBrands: "Marques conseillées :",
    btnViewRecipe: "Recette",
    btnPlanRecipe: "Planifier",
    noRecipesFound: "Aucune recette trouvée",
    noRecipesDesc: "Aucune recette ne correspond à votre filtre. Demandez à notre chef IA de la concevoir pour vous !",
    btnCreateRecipeNow: "Créer cette recette par IA",
    aiAdviceTitle: "Conseil & Recommandation de Chef Amina :",
    btnClose: "Fermer",

    // Meal planner tab
    plannerTitle: "Planificateur de Menus Hebdomadaire",
    plannerSubtitle: "Composez vos déjeuners et dîners pour la semaine. Les ingrédients s'ajustent automatiquement pour vos courses.",
    btnGeneratePlanAI: "Générer mon menu de la semaine avec l'IA",
    btnLaunchFavoritesPlan: "Lancer mon menu de favoris ❤️",
    btnViewShoppingList: "Voir la Liste de Courses",
    couscousFriday: "Couscous",
    lunch: "Déjeuner",
    dinner: "Dîner",
    chooseRecipe: "Choisir recette",
    dayLundi: "Lundi",
    dayMardi: "Mardi",
    dayMercredi: "Mercredi",
    dayJeudi: "Jeudi",
    dayVendredi: "Vendredi",
    daySamedi: "Samedi",
    dayDimanche: "Dimanche",

    // Shopping tab
    shoppingTitle: "Liste de Courses Consolidée",
    shoppingSubtitle: "Les ingrédients de vos repas planifiés sont regroupés, avec déduction automatique de ce que vous avez déjà dans votre placard.",
    btnCopyList: "Copier (WhatsApp / SMS)",
    btnAdjustPantry: "Ajuster mon Placard",
    totalIngredientsNeeded: "Ingrédients nécessaires au total",
    alreadyInStock: "Déjà en stock dans votre placard (0€)",
    netToBuy: "Reste net à acheter au magasin",
    articlesCount: "articles",
    toBuyLabel: "À acheter :",
    inStockLabel: "En stock (0 à acheter)",
    stockVsNeed: "En stock :",
    needLabel: "Besoin :",
    emptyShoppingTitle: "Aucun ingrédient à acheter pour l'instant",
    emptyShoppingDesc: "Commencez par planifier quelques recettes ou lancez votre menu de favoris !",
    btnOpenPlanner: "Ouvrir le Planificateur",
    listCopiedAlert: "Liste de courses copiée dans le presse-papier ! Prête à envoyer sur WhatsApp.",

    // Pantry tab
    pantryTitle: "Mon Placard & Ingrédients en Stock",
    pantrySubtitle: "Déclarez ce que vous avez déjà chez vous. Ces quantités sont soustraites de vos courses pour éviter les doublons.",
    btnAddPantryItem: "Ajouter un ingrédient en stock",
    pantryReserve: "Quantité en réserve :",
    brandLabel: "Marque :",
    pantryItemName: "Nom de l'ingrédient :",
    pantryQuantity: "Quantité en stock :",
    pantryUnit: "Unité :",
    pantryCategory: "Catégorie / Rayon :",
    pantryBrandOpt: "Marque (facultatif) :",
    btnSave: "Enregistrer",
    btnCancel: "Annuler",
    btnConfirm: "Confirmer",

    // Preferences tab
    prefsTitle: "Vos Préférences Culinaires & Profil IA",
    prefsSubtitle: "Notre IA capture vos goûts, vos envies et vos marques de référence pour personnaliser les recettes et les courses.",
    favoriteCuisinesLabel: "Cuisines Favorites",
    spicinessLabel: "Niveau de Piquant Souhaité",
    spicinessMild: "1 (Très doux)",
    spicinessBalanced: "3 (Équilibré)",
    spicinessHot: "5 (Harissa du Cap Bon corsée)",
    favoriteBrandsLabel: "Marques Favorites de l'Écosystème",
    favoriteBrandsDesc: "Les marques privilégiées dans vos listes de courses.",
    addBrandPlaceholder: "Ajouter une marque (ex: Dari, Sicam...)",
    btnAdd: "Ajouter",
    notesLabel: "Notes et Envies Particulières",
    notesPlaceholder: "Ex: Famille de 4 personnes, agneau le vendredi, sauces bien relevées...",
    btnSavePrefs: "Enregistrer mes préférences",
    prefsSavedAlert: "Vos préférences ont été enregistrées avec succès.",

    // Recipe modal
    prepTimeLabel: "Prépa :",
    cookTimeLabel: "Cuisson :",
    spicinessRating: "Piquant :",
    portionsFor: "Pour :",
    ingredientsRequiredFor: "Ingrédients requis pour",
    personsLabel: "personnes :",
    instructionsTitle: "Étapes de Préparation :",
    grandmotherTip: "Astuce de grand-mère :",
    btnAddToPlan: "Ajouter au Planning",
    btnFavorite: "Favori",

    // Add to plan modal
    planRecipeTitle: "Planifier :",
    selectDayLabel: "Jour de la semaine :",
    selectMealLabel: "Moment :",
    selectServingsLabel: "Nombre de personnes :",
    atTable: "personnes à table",

    // AI Create modal
    aiCreateModalTitle: "Créer une Recette sur Mesure par l'IA",
    aiCreateModalDesc: "Décrivez votre envie, vos ingrédients disponibles ou le plat de vos rêves :",
    aiCreatePlaceholder: "Ex: Tajine de lotte aux citrons confits et safran, Tajine tunisien aux épinards...",
    btnGenerateRecipeSubmit: "Générer la Recette",

    // Chatbot
    chatAminaTitle: "Chef Amina IA",
    chatAminaStatus: "Conseils culinaires & Prise en main",
    chatThinking: "Chef Amina réfléchit...",
    chatInputPlaceholder: "Posez votre question culinaire...",
    quickPromptHelp: "Comment utiliser l'application ?",
    quickPromptCouscous: "Astuce pour réussir la vapeur du couscous ?",
    quickPromptDinner: "Idée de dîner rapide pour ce soir"
  },

  ar: {
    appTitle: "المطبخ والوصفات بالذكاء الاصطناعي",
    appSubtitle: "تونسية • مغربية • حلال 100%",
    navRecipes: "الوصفات",
    navPlan: "جدول الوجبات",
    navShopping: "قائمة المشتريات",
    navPantry: "مؤونة المطبخ",
    navPreferences: "التفضيلات",
    navFavorites: "المفضلة",
    chatChefButton: "الشيف أمينة (ذكاء اصطناعي)",
    ssoConnected: "متصل عبر SSO",
    ssoLogin: "تسجيل الدخول SSO",
    logout: "تسجيل الخروج",

    // Auth wall
    authWallTitle: "مرحباً بكم في تطبيق الوصفات وقائمة المشتريات",
    authWallSubtitle: "منصتكم الذكية للمأكولات المغاربية والشرقية الحلال",
    authWallNotice: "يتطلب استخدام هذا التطبيق تسجيل الدخول عبر حساب SSO الموحد لنظام oussamma.tn.",
    authWallButton: "تسجيل الدخول عبر SSO الخاص بنا",
    authWallBadge: "دخول آمن عبر OIDC / SSO",
    authWallFeatures: [
      "دليل شامل للوصفات التونسية، المغربية والشرقية الحلال",
      "توليد وتخصيص ذكي للوجبات والوصفات عبر الذكاء الاصطناعي (LiteLLM)",
      "قائمة مشتريات ديناميكية تطرح تلقائياً ما لديك مسبقاً في مخزنك",
      "مساعد ومستشار طهي تفاعلي متاح طوال الوقت"
    ],

    // Recipes tab
    bannerBadge: "مدعوم بنموذج LiteLLM والذكاء الاصطناعي",
    bannerTitle: "تذوق أصالة الطبخ التونسي والمغربي والشرقي الحلال",
    bannerDesc: "استكشف أشهى الأطباق، خطط لوجبات أسبوعك بدقة، واستخرج تلقائياً قائمة مشتريات متكاملة تطرح ما لديك مسبقاً في البيت.",
    searchPlaceholder: "مثال: طاجين حلو ومالح، عجة مرقاز، عشاء سريع بدون لحم في 25 دقيقة...",
    btnSearchAI: "بحث ذكي بالـ AI",
    btnCreateAI: "ابتكار طبق بالـ AI",
    allRecipes: "جميع الوصفات",
    tunisianRecipes: "أطباق تونسية",
    moroccanRecipes: "أطباق مغربية",
    halalRecipes: "أطباق حلال وشرقية",
    myFavorites: "أطباقي المفضلة",
    allCategories: "جميع الأصناف",
    catCouscous: "كسكسي وأطباق تقليدية",
    catTajines: "طواجن ومسبوكات",
    catExpress: "أطباق سريعة ومقالي",
    catSoups: "شوربات ومقبلات",
    catStreetFood: "مشاوي وسندويشات حلال",
    halalBadge: "حلال 100%",
    prepCookTime: "دقيقة",
    servingsText: "أشخاص",
    recommendedBrands: "العلامات التجارية الموصى بها:",
    btnViewRecipe: "تفاصيل الوصفة",
    btnPlanRecipe: "إضافة للجدول",
    noRecipesFound: "لم يتم العثور على وصفات",
    noRecipesDesc: "لا توجد وصفة مطابقة لطلبك. اطلب من الشيف الذكي ابتكارها لك حالاً!",
    btnCreateRecipeNow: "ابتكار الوصفة بالذكاء الاصطناعي",
    aiAdviceTitle: "نصيحة وتوصية الشيف أمينة:",
    btnClose: "إغلاق",

    // Meal planner tab
    plannerTitle: "جدول وجبات الأسبوع الذكي",
    plannerSubtitle: "حدد وجبات الغداء والعشاء لكل يوم، وسيقوم النظام بتعديل كميات التسوق بدقة حسب عدد الضيوف.",
    btnGeneratePlanAI: "توليد جدول الأسبوع الذكي بالذكاء الاصطناعي",
    btnLaunchFavoritesPlan: "إعداد جدول من أطباقي المفضلة ❤️",
    btnViewShoppingList: "عرض قائمة المشتريات",
    couscousFriday: "كسكسي الجمعة",
    lunch: "الغداء",
    dinner: "العشاء",
    chooseRecipe: "اختيار وجبة",
    dayLundi: "الإثنين",
    dayMardi: "الثلاثاء",
    dayMercredi: "الأربعاء",
    dayJeudi: "الخميس",
    dayVendredi: "الجمعة",
    daySamedi: "السبت",
    dayDimanche: "الأحد",

    // Shopping tab
    shoppingTitle: "قائمة المشتريات الذكية الموحدة",
    shoppingSubtitle: "تجمع المقادير لكافة وجبات الأسبوع، مع طرح تلقائي للكميات المتوفرة مسبقاً في مطبخك.",
    btnCopyList: "نسخ للواتساب أو الرسائل",
    btnAdjustPantry: "تعديل محتويات مخزني",
    totalIngredientsNeeded: "إجمالي المقادير المطلوبة للوجبات",
    alreadyInStock: "متوفر مسبقاً في مخزنك (0 د.ت)",
    netToBuy: "المتبقي للشراء من المتجر",
    articlesCount: "عناصر",
    toBuyLabel: "المطلوب شراؤه:",
    inStockLabel: "متوفر لديك (لا حاجة للشراء)",
    stockVsNeed: "في المخزن:",
    needLabel: "المطلوب:",
    emptyShoppingTitle: "لا توجد مقادير للشراء حالياً",
    emptyShoppingDesc: "ابدأ بتحديد وجبات في جدول الأسبوع أو اختر من وجباتك المفضلة!",
    btnOpenPlanner: "فتح جدول الوجبات",
    listCopiedAlert: "تم نسخ قائمة المشتريات إلى الحافظة! جاهزة للمشاركة عبر واتساب.",

    // Pantry tab
    pantryTitle: "مؤونة مطبخي والمخزون المتوفر",
    pantrySubtitle: "سجل ما لديك في البيت (زيت زيتون، هريسة، كسكسي، بهارات...). ستُطرح الكميات تلقائياً من المشتريات.",
    btnAddPantryItem: "إضافة مكون للمخزن",
    pantryReserve: "الكمية المتوفرة:",
    brandLabel: "العلامة التجارية:",
    pantryItemName: "اسم المكون:",
    pantryQuantity: "الكمية المتوفرة:",
    pantryUnit: "الوحدة:",
    pantryCategory: "القسم / الصنف:",
    pantryBrandOpt: "الماركة (اختياري):",
    btnSave: "حفظ",
    btnCancel: "إلغاء",
    btnConfirm: "تأكيد",

    // Preferences tab
    prefsTitle: "تفضيلات الذوق وملف الـ AI الشخصي",
    prefsSubtitle: "يتعرف نظام الذكاء الاصطناعي على أذواقك، درجة الحار المفضلة، والعلامات التجارية التي تثق بها.",
    favoriteCuisinesLabel: "المطابخ المفضلة",
    spicinessLabel: "درجة الحار والشطة المرغوبة",
    spicinessMild: "1 (بدون حار نهائياً)",
    spicinessBalanced: "3 (حار متوازن معتدل)",
    spicinessHot: "5 (حار تونسي بهريسة قوية)",
    favoriteBrandsLabel: "العلامات التجارية المعتمدة المفضلة",
    favoriteBrandsDesc: "العلامات التي سيتم اقتراحها أولاً في قوائم التسوق.",
    addBrandPlaceholder: "أضف علامة تجارية (مثل داري، سيكام، دياري...)",
    btnAdd: "إضافة",
    notesLabel: "ملاحظات ورغبات خاصة",
    notesPlaceholder: "مثال: عائلة من 4 أفراد، نفضل لحم الضأن يوم الجمعة، تقليل الملح...",
    btnSavePrefs: "حفظ التفضيلات",
    prefsSavedAlert: "تم حفظ تفضيلاتك بنجاح.",

    // Recipe modal
    prepTimeLabel: "التحضير:",
    cookTimeLabel: "الطهي:",
    spicinessRating: "الحار:",
    portionsFor: "لحساب:",
    ingredientsRequiredFor: "المقادير المطلوبة لـ",
    personsLabel: "أشخاص:",
    instructionsTitle: "طريقة الإعداد خطوة بخطوة:",
    grandmotherTip: "سر الطبخة ونصيحة الجدة:",
    btnAddToPlan: "إضافة لجدول الأسبوع",
    btnFavorite: "المفضلة",

    // Add to plan modal
    planRecipeTitle: "إدراج في الجدول:",
    selectDayLabel: "اليوم:",
    selectMealLabel: "الوجبة:",
    selectServingsLabel: "عدد الأفراد:",
    atTable: "أفراد على المائدة",

    // AI Create modal
    aiCreateModalTitle: "ابتكار طبق مخصص بالذكاء الاصطناعي",
    aiCreateModalDesc: "صف المكونات المتوفرة لديك في الثلاجة أو فكرة الطبق الذي ترغب به:",
    aiCreatePlaceholder: "مثال: طاجين سمك بالليمون المخلل والزعفران، طاجين تونسي بالسبانخ والجبن...",
    btnGenerateRecipeSubmit: "توليد الوصفة بالـ AI",

    // Chatbot
    chatAminaTitle: "الشيف أمينة (ذكاء اصطناعي)",
    chatAminaStatus: "مستشارة الطبخ ومرشدة التطبيق",
    chatThinking: "الشيف أمينة تفكر...",
    chatInputPlaceholder: "اسأل الشيف أمينة عن أي سر في الطهي...",
    quickPromptHelp: "كيف أستخدم التطبيق وجدول الوجبات؟",
    quickPromptCouscous: "ما سر نجاح تفوير الكسكسي بالطريقة الصحيحة؟",
    quickPromptDinner: "اقترحي عليّ عشاءً تونسياً سريعاً ولذيذاً الليلة"
  },

  en: {
    appTitle: "AI Recipe & Meal Master",
    appSubtitle: "Tunisian • Moroccan • 100% Halal",
    navRecipes: "Recipes",
    navPlan: "Meal Planner",
    navShopping: "Grocery List",
    navPantry: "My Pantry",
    navPreferences: "Preferences",
    navFavorites: "Favorites",
    chatChefButton: "Chef Amina AI",
    ssoConnected: "SSO Connected",
    ssoLogin: "SSO Sign In",
    logout: "Log Out",

    // Auth wall
    authWallTitle: "Welcome to the AI Recipe & Grocery App",
    authWallSubtitle: "Your smart platform for authentic North African & Halal cuisine",
    authWallNotice: "Access to this application requires logging in with your oussamma.tn SSO ecosystem account.",
    authWallButton: "Sign in with our SSO",
    authWallBadge: "Secure OIDC / SSO Gate",
    authWallFeatures: [
      "Authentic Tunisian, Moroccan, and Middle Eastern Halal recipes",
      "Smart AI meal planning and recipe generation powered by LiteLLM",
      "Consolidated grocery list with pantry inventory deductions",
      "24/7 Interactive AI culinary assistant (Chef Amina)"
    ],

    // Recipes tab
    bannerBadge: "Powered by LiteLLM & Culinary AI",
    bannerTitle: "Savor the Authentic Flavors of Tunisian & Moroccan Cuisine",
    bannerDesc: "Explore traditional dishes, plan your weekly meals, and automatically generate an accurate grocery list that deducts what you already have in your pantry.",
    searchPlaceholder: "E.g., Sweet and savory tagine, Ojja merguez, 25-minute vegetarian dinner...",
    btnSearchAI: "AI Search",
    btnCreateAI: "Create with AI",
    allRecipes: "All Recipes",
    tunisianRecipes: "Tunisian",
    moroccanRecipes: "Moroccan",
    halalRecipes: "Halal Specials",
    myFavorites: "My Favorites",
    allCategories: "All Categories",
    catCouscous: "Couscous & Traditional",
    catTajines: "Tagines & Stews",
    catExpress: "Quick & Skillet Meals",
    catSoups: "Soups & Starters",
    catStreetFood: "Street Food & Grills",
    halalBadge: "100% Halal",
    prepCookTime: "min",
    servingsText: "serv.",
    recommendedBrands: "Recommended brands:",
    btnViewRecipe: "View Recipe",
    btnPlanRecipe: "Plan Meal",
    noRecipesFound: "No recipes found",
    noRecipesDesc: "No recipe matched your filters. Ask our AI Chef to create a tailored one for you!",
    btnCreateRecipeNow: "Create Recipe with AI",
    aiAdviceTitle: "Chef Amina's Recommendation:",
    btnClose: "Close",

    // Meal planner tab
    plannerTitle: "Weekly Meal Planner",
    plannerSubtitle: "Organize lunch and dinner for each day. Shopping ingredient quantities adjust automatically to your guest count.",
    btnGeneratePlanAI: "Generate Weekly Plan with AI",
    btnLaunchFavoritesPlan: "Plan from My Favorites ❤️",
    btnViewShoppingList: "View Grocery List",
    couscousFriday: "Couscous",
    lunch: "Lunch",
    dinner: "Dinner",
    chooseRecipe: "Choose recipe",
    dayLundi: "Monday",
    dayMardi: "Tuesday",
    dayMercredi: "Wednesday",
    dayJeudi: "Thursday",
    dayVendredi: "Friday",
    daySamedi: "Saturday",
    dayDimanche: "Sunday",

    // Shopping tab
    shoppingTitle: "Smart Consolidated Grocery List",
    shoppingSubtitle: "Aggregates ingredients for all planned meals, automatically deducting what you already have in your pantry.",
    btnCopyList: "Copy (WhatsApp / SMS)",
    btnAdjustPantry: "Adjust Pantry",
    totalIngredientsNeeded: "Total ingredients needed",
    alreadyInStock: "Already in pantry stock ($0)",
    netToBuy: "Net to buy at the store",
    articlesCount: "items",
    toBuyLabel: "To Buy:",
    inStockLabel: "In Stock (0 to buy)",
    stockVsNeed: "In Stock:",
    needLabel: "Needed:",
    emptyShoppingTitle: "No groceries to buy right now",
    emptyShoppingDesc: "Start by planning some meals or launch a menu from your favorite recipes!",
    btnOpenPlanner: "Open Meal Planner",
    listCopiedAlert: "Grocery list copied to clipboard! Ready to share via WhatsApp or SMS.",

    // Pantry tab
    pantryTitle: "My Pantry & Existing Inventory",
    pantrySubtitle: "Keep track of items you already have at home (olive oil, harissa, couscous, spices...). These quantities are deducted from your shopping list.",
    btnAddPantryItem: "Add pantry item",
    pantryReserve: "In-stock quantity:",
    brandLabel: "Brand:",
    pantryItemName: "Ingredient name:",
    pantryQuantity: "Quantity in stock:",
    pantryUnit: "Unit:",
    pantryCategory: "Aisle / Category:",
    pantryBrandOpt: "Brand (optional):",
    btnSave: "Save",
    btnCancel: "Cancel",
    btnConfirm: "Confirm",

    // Preferences tab
    prefsTitle: "Taste Preferences & AI Profile",
    prefsSubtitle: "Our AI learns your taste profile, spice tolerance, and favorite brands to personalize recipes and groceries.",
    favoriteCuisinesLabel: "Favorite Cuisines",
    spicinessLabel: "Desired Heat / Spiciness Level",
    spicinessMild: "1 (Very Mild / No Heat)",
    spicinessBalanced: "3 (Balanced Traditional)",
    spicinessHot: "5 (Bold Cap Bon Harissa Heat)",
    favoriteBrandsLabel: "Favorite Trusted Brands",
    favoriteBrandsDesc: "Brands prioritized in your grocery lists.",
    addBrandPlaceholder: "Add brand (e.g. Dari, Sicam, Terra Delyssa...)",
    btnAdd: "Add",
    notesLabel: "Notes & Special Requests",
    notesPlaceholder: "E.g., 4-person family, lamb on Fridays, rich sauces, low sodium...",
    btnSavePrefs: "Save Preferences",
    prefsSavedAlert: "Your preferences were saved successfully.",

    // Recipe modal
    prepTimeLabel: "Prep:",
    cookTimeLabel: "Cook:",
    spicinessRating: "Spiciness:",
    portionsFor: "Servings:",
    ingredientsRequiredFor: "Ingredients required for",
    personsLabel: "servings:",
    instructionsTitle: "Step-by-step Instructions:",
    grandmotherTip: "Chef's Secret & Grandmother's Tip:",
    btnAddToPlan: "Add to Planner",
    btnFavorite: "Favorite",

    // Add to plan modal
    planRecipeTitle: "Plan Meal:",
    selectDayLabel: "Day of the week:",
    selectMealLabel: "Meal slot:",
    selectServingsLabel: "Number of guests:",
    atTable: "guests at the table",

    // AI Create modal
    aiCreateModalTitle: "Create Custom Recipe with AI",
    aiCreateModalDesc: "Describe what you crave, available fridge ingredients, or any culinary idea:",
    aiCreatePlaceholder: "E.g., Monkfish tagine with preserved lemons and saffron, Tunisian spinach & cheese tagine...",
    btnGenerateRecipeSubmit: "Generate Recipe",

    // Chatbot
    chatAminaTitle: "Chef Amina AI",
    chatAminaStatus: "Cooking advice & app guide",
    chatThinking: "Chef Amina is thinking...",
    chatInputPlaceholder: "Ask Chef Amina any culinary question...",
    quickPromptHelp: "How do I use this app and the meal planner?",
    quickPromptCouscous: "What is the secret to perfect steamed couscous?",
    quickPromptDinner: "Give me an idea for a quick dinner tonight"
  }
};

createApp({
  data() {
    return {
      currentLang: localStorage.getItem('app_lang') || 'fr',
      activeTab: 'recipes',
      recipes: [],
      favoriteIds: [],
      showOnlyFavorites: false,
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
      authChecked: false,

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

      selectRecipeModalTarget: null,

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
    t() {
      return translations[this.currentLang] || translations.fr;
    },

    isRTL() {
      return this.currentLang === 'ar';
    },

    filteredRecipes() {
      let list = this.recipes;

      // Filtre favoris
      if (this.showOnlyFavorites) {
        list = list.filter(r => this.favoriteIds.includes(r.id));
      }

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

  watch: {
    currentLang(newLang) {
      localStorage.setItem('app_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  },

  async mounted() {
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';

    await this.fetchAuth();
    this.authChecked = true;

    // Si authentifié via SSO, charger les données de l'application
    if (this.auth.authenticated) {
      await this.fetchRecipes();
      await this.fetchFavorites();
      await this.fetchPlan();
      await this.fetchPantry();
      await this.fetchPreferences();
      await this.fetchShoppingList();
      await this.fetchChat();
    }
  },

  methods: {
    // --- LANGUES ---
    setLanguage(lang) {
      this.currentLang = lang;
    },

    // --- AUTHENTIFICATION ---
    async fetchAuth() {
      try {
        const res = await fetch('/api/auth/me');
        this.auth = await res.json();
      } catch (e) {
        console.warn('Erreur auth:', e);
      }
    },

    loginSSO() {
      window.location.href = '/auth/login';
    },

    // --- FAVORIS (PLATS PRÉFÉRÉS) ---
    async fetchFavorites() {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
          this.favoriteIds = await res.json();
        }
      } catch (e) {
        console.error('Erreur chargement favoris:', e);
      }
    },

    async toggleFavorite(recipeId) {
      try {
        const res = await fetch('/api/favorites/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipeId })
        });
        if (res.ok) {
          this.favoriteIds = await res.json();
        }
      } catch (e) {
        console.error('Erreur bascule favori:', e);
      }
    },

    isFavorite(recipeId) {
      return this.favoriteIds.includes(recipeId);
    },

    async launchFavoritesMealPlan() {
      if (this.favoriteIds.length === 0) {
        alert(this.currentLang === 'ar' 
          ? 'يرجى تحديد أطباقك المفضلة أولاً بالضغط على أيقونة القلب ❤️' 
          : (this.currentLang === 'en' ? 'Please select your favorite recipes first using the heart icon ❤️' : 'Veuillez d\'abord ajouter des recettes à vos favoris en cliquant sur l\'icône cœur ❤️'));
        return;
      }

      try {
        const res = await fetch('/api/favorites/plan-week', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          this.mealPlan = data.plan;
          await this.fetchShoppingList();
          this.activeTab = 'plan';
          alert(this.currentLang === 'ar' 
            ? 'تم إعداد جدول الأسبوع بنجاح اعتماداً على أطباقك المفضلة!' 
            : (this.currentLang === 'en' ? 'Your weekly meal plan has been created from your favorite dishes!' : 'Votre planning de la semaine a été généré avec succès à partir de vos plats préférés !'));
        }
      } catch (e) {
        console.error('Erreur génération plan favoris:', e);
      }
    },

    // --- DONNÉES RECETTES ---
    async fetchRecipes() {
      try {
        const res = await fetch('/api/recipes');
        if (res.ok) {
          this.recipes = await res.json();
        }
      } catch (e) {
        console.error('Erreur chargement recettes:', e);
      }
    },

    async fetchPlan() {
      try {
        const res = await fetch('/api/plan');
        if (res.ok) {
          this.mealPlan = await res.json();
        }
      } catch (e) {
        console.error('Erreur chargement planning:', e);
      }
    },

    async fetchPantry() {
      try {
        const res = await fetch('/api/pantry');
        if (res.ok) {
          this.pantryItems = await res.json();
        }
      } catch (e) {
        console.error('Erreur chargement placard:', e);
      }
    },

    async fetchShoppingList() {
      try {
        const res = await fetch('/api/shopping-list');
        if (res.ok) {
          this.shoppingList = await res.json();
        }
      } catch (e) {
        console.error('Erreur chargement courses:', e);
      }
    },

    async fetchPreferences() {
      try {
        const res = await fetch('/api/preferences');
        if (res.ok) {
          this.preferences = await res.json();
        }
      } catch (e) {
        console.error('Erreur chargement préférences:', e);
      }
    },

    async fetchChat() {
      try {
        const res = await fetch('/api/chat');
        if (res.ok) {
          this.chatMessages = await res.json();
        }
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
        alert(this.currentLang === 'ar' ? 'تعذر توليد الجدول حالياً، يرجى المحاولة لاحقاً.' : 'Impossible de générer le planning pour le moment. Veuillez réessayer.');
      } finally {
        this.isGeneratingPlan = false;
      }
    },

    // --- LISTE DE COURSES & EXPORT ---
    copyShoppingListToClipboard() {
      if (!this.shoppingList.items || this.shoppingList.items.length === 0) {
        alert(this.t.emptyShoppingTitle);
        return;
      }

      let text = `🛒 ${this.t.shoppingTitle}\n`;
      text += `📅 ${this.shoppingList.totalPlannedMeals} meals planned\n`;
      text += `-------------------------------------------\n\n`;

      for (const [cat, items] of Object.entries(this.shoppingList.groupedByCategory)) {
        const toBuyItems = items.filter(i => i.toBuyQuantity > 0);
        if (toBuyItems.length > 0) {
          text += `📍 [${cat.toUpperCase()}]\n`;
          for (const item of toBuyItems) {
            text += `  • ${item.name} : ${item.toBuyQuantity} ${item.unit}`;
            if (item.recommendedBrand) {
              text += ` (${item.recommendedBrand})`;
            }
            text += `\n`;
          }
          text += `\n`;
        }
      }

      const inStockItems = this.shoppingList.items.filter(i => i.status === 'in_stock');
      if (inStockItems.length > 0) {
        text += `✅ [${this.t.alreadyInStock}]\n`;
        for (const item of inStockItems) {
          text += `  ✓ ${item.name} (${item.inStockQuantity} ${item.unit})\n`;
        }
      }

      text += `\n✨ recettes.oussamma.tn`;

      navigator.clipboard.writeText(text).then(() => {
        alert(this.t.listCopiedAlert);
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
      if (this.currentLang === 'ar') {
        const labels = {
          1: 'بدون حار نهائياً',
          2: 'خفيف اللسعة',
          3: 'حار معتدل تقليدي',
          4: 'حار جداً',
          5: 'هريسة تونسية أصيلة حارة'
        };
        return labels[val] || '';
      } else if (this.currentLang === 'en') {
        const labels = {
          1: 'Mild (no heat)',
          2: 'Slightly spicy',
          3: 'Balanced traditional heat',
          4: 'Very spicy',
          5: 'Bold Cap Bon harissa heat'
        };
        return labels[val] || '';
      } else {
        const labels = {
          1: 'Très doux (sans piquant)',
          2: 'Légèrement relevé',
          3: 'Équilibré traditionnel',
          4: 'Bien piquant',
          5: 'Harissa pur Cap Bon forte'
        };
        return labels[val] || '';
      }
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
        alert(this.t.prefsSavedAlert);
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
        alert(this.currentLang === 'ar' ? 'حدث خطأ أثناء ابتكار الوصفة، يرجى المحاولة ثانية.' : 'Une erreur est survenue lors de la création de la recette.');
      } finally {
        this.isGeneratingCustomRecipe = false;
      }
    },

    // --- CHATBOT CHEF AMINA IA MULTILINGUE ---
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
          body: JSON.stringify({ message: text, lang: this.currentLang })
        });
        const data = await res.json();
        this.chatMessages = data.history;
      } catch (e) {
        console.error('Erreur envoi chat:', e);
        this.chatMessages.push({
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: this.currentLang === 'ar' ? 'عذراً، حدث انقطاع مؤقت في الاتصال ببوابة الذكاء الاصطناعي. يرجى إعادة المحاولة.' : (this.currentLang === 'en' ? 'Oops! A temporary glitch occurred while reaching the AI gateway. Please try again.' : "Oups ! Une petite interruption avec la passerelle IA. N'hésitez pas à reformuler."),
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
