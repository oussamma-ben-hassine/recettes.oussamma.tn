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
    chatChefButton: "Chef Oussama IA",
    ssoConnected: "SSO Connecté",
    ssoLogin: "Connexion SSO",
    logout: "Déconnexion",
    btnInstallApp: "📲 Installer l'application",

    // Auth wall
    authWallTitle: "Bienvenue sur Recettes & Épicerie",
    authWallSubtitle: "Votre chef IA personnel Oussama & toutes les cuisines du monde",
    authWallNotice: "L'accès à cette application est réservé aux utilisateurs authentifiés de l'écosystème oussamma.tn.",
    authWallButton: "Se connecter avec notre SSO",
    authWallBadge: "Accès Sécurisé OIDC / SSO",
    authWallFeatures: [
      "Recettes authentiques du monde entier (Tunisie, Maroc, Italie, Asie, Levant...)",
      "Chef Oussama IA : conseils personnalisés, astuces et menus 24/7",
      "Génération et personnalisation intelligente de repas par IA (LiteLLM)",
      "Liste de courses dynamique avec déduction du stock de votre placard"
    ],

    // Recipes tab
    bannerBadge: "Propulsé par LiteLLM & Chef Oussama IA",
    bannerTitle: "Explorez les délices culinaires du monde entier",
    bannerDesc: "Explorez les recettes traditionnelles et du monde, planifiez vos repas pour la semaine et générez automatiquement la liste exacte de vos courses avec déduction de vos réserves.",
    searchPlaceholder: "Rechercher une recette, ingrédient, pays...",
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
    noRecipesDesc: "Aucune recette ne correspond à votre filtre. Demandez à Chef Oussama de la concevoir pour vous !",
    btnCreateRecipeNow: "Créer cette recette par IA",
    aiAdviceTitle: "Conseil & Recommandation de Chef Oussama :",
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

    // Web Import modal (Gratuit)
    btnImportWeb: "🌐 Importer du Web",
    webImportModalTitle: "Importer une Recette depuis le Web",
    webImportModalDesc: "Collez un lien (URL) de recette (Marmiton, 750g, blog culinaire...) OU tapez le nom d'un plat traditionnel. Notre IA extrait la recette, calibre les ingrédients et l'ajoute directement à votre catalogue. 100% gratuit !",
    webImportPlaceholder: "Ex: https://www.marmiton.org/... OU Couscous au mérou sfaxien",
    webImportSubmit: "Lancer la recherche & Importer",
    webImportSuccessMsg: "Recette importée avec succès du Web !",
    webImportErrorNotice: "Impossible d'importer la recette. Vérifiez le lien ou le nom saisi.",
    sourceWebBadge: "🌐 Source Web",
    btnViewImportedRecipe: "Voir la recette importée",

    // Chatbot
    chatAminaTitle: "Chef Oussama IA",
    chatAminaStatus: "Conseils culinaires mondiaux & Astuces",
    chatThinking: "Chef Oussama réfléchit...",
    chatInputPlaceholder: "Posez votre question culinaire à Chef Oussama...",
    quickPromptHelp: "Comment utiliser l'application ?",
    quickPromptCouscous: "Astuce pour réussir la vapeur du couscous ?",
    quickPromptDinner: "Idée de dîner rapide pour ce soir",
    quickPromptPantry: "Que cuisiner ce soir avec les ingrédients de mon placard ?",

    // Anti-Gaspi Placard
    chipPantryReady: "Mon Placard",
    pantryBannerTitle: "Que cuisiner avec mon placard ?",
    pantryBannerSub: "recettes immédiatement faisables avec vos ingrédients en stock",
    btnViewPantryRecipes: "Voir les recettes faisables",
    btnGeneratePantryRecipe: "Créer une recette avec mon stock par IA",
    inStock100: "100% en stock",
    missingCountText: "manquant",
    missingPluralText: "manquants",
    pantryEmptyNotice: "Votre placard est vide pour l'instant ! Ajoutez d'abord quelques ingrédients dans l'onglet Placard & Courses.",

    // Centre de Gestion & Réinitialisation (Chef Oussama)
    manageSectionTitle: "Centre de Contrôle & Réinitialisation",
    manageSectionSubtitle: "Commandes administrateur Chef Oussama pour vider, réinitialiser ou restaurer vos données",
    btnResetPlan: "Vider le Planning de Repas",
    btnResetPlanDesc: "Efface tous les repas planifiés de la semaine (midi & soir)",
    btnClearPantry: "Vider le Placard",
    btnClearPantryDesc: "Supprime tous les ingrédients actuellement en stock chez vous",
    btnRestorePantry: "Restaurer le Placard par défaut",
    btnRestorePantryDesc: "Restaure les ingrédients de base (huile d'olive, harissa, semoule...)",
    btnResetChat: "Effacer la discussion avec Chef Oussama",
    btnResetChatDesc: "Réinitialise l'historique et recommence une conversation propre",
    btnClearFavorites: "Vider les Favoris",
    btnClearFavoritesDesc: "Supprime toutes vos recettes favorites enregistrées",
    btnResetRecipes: "Réinitialiser le Catalogue de Recettes",
    btnResetRecipesDesc: "Restaure les recettes d'origine et supprime les recettes importées/IA",
    btnHardResetAll: "⚠️ Tout Réinitialiser (Remise à Zéro Complète)",
    btnHardResetAllDesc: "Efface planning, placard, chat, favoris et réinitialise tout le catalogue",
    confirmResetPlan: "Êtes-vous sûr de vouloir vider tout le planning de la semaine ?",
    confirmClearPantry: "Êtes-vous sûr de vouloir vider tous les ingrédients de votre placard ?",
    confirmRestorePantry: "Voulez-vous restaurer les ingrédients de base par défaut du placard ?",
    confirmResetChat: "Voulez-vous effacer tout l'historique de discussion avec Chef Oussama ?",
    confirmClearFavorites: "Voulez-vous retirer toutes vos recettes favorites ?",
    confirmResetRecipes: "Attention : toutes les recettes créées par IA ou importées du web seront supprimées. Confirmer la réinitialisation ?",
    confirmHardResetAll: "🚨 ATTENTION DANGER : Cette action va effacer votre planning, réinitialiser votre placard, vider la discussion, effacer vos favoris et restaurer les recettes d'origine. Êtes-vous ABSOLUMENT certain ?",
    confirmDeleteRecipe: "Voulez-vous supprimer cette recette du catalogue ?",
    btnDeleteRecipe: "Supprimer la Recette",
    btnClearShoppingChecks: "Décocher tout",
    btnQuickClearPlan: "Vider",
    btnQuickClearPantry: "Vider",
    btnQuickClearChat: "Effacer",
    resetSuccess: "Opération effectuée avec succès !"
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
    chatChefButton: "الشيف أسامة (ذكاء اصطناعي)",
    ssoConnected: "متصل عبر SSO",
    ssoLogin: "تسجيل الدخول SSO",
    logout: "تسجيل الخروج",
    btnInstallApp: "📲 تثبيت التطبيق",

    // Auth wall
    authWallTitle: "مرحباً بكم في تطبيق الوصفات وقائمة المشتريات",
    authWallSubtitle: "شيفكم الذكي أسامة وكافة أطباق ومطابخ العالم الحلال",
    authWallNotice: "يتطلب استخدام هذا التطبيق تسجيل الدخول عبر حساب SSO الموحد لنظام oussamma.tn.",
    authWallButton: "تسجيل الدخول عبر SSO الخاص بنا",
    authWallBadge: "دخول آمن عبر OIDC / SSO",
    authWallFeatures: [
      "دليل شامل لوصفات تونس، المغرب، إيطاليا، المشرق، آسيا ومطابخ العالم الحلال",
      "الشيف أسامة: استشارات ذكية، نصائح وأطباق مبتكرة 24/7",
      "توليد وتخصيص ذكي للوجبات والوصفات عبر الذكاء الاصطناعي (LiteLLM)",
      "قائمة مشتريات ديناميكية تطرح تلقائياً ما لديك مسبقاً في مخزنك"
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
    aiAdviceTitle: "نصيحة وتوصية الشيف أسامة:",
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

    // Web Import modal (Gratuit)
    btnImportWeb: "🌐 استيراد من الويب",
    webImportModalTitle: "استيراد وصفة من الإنترنت مجاناً",
    webImportModalDesc: "ألصق رابط صفحة وصفة (Marmiton أو أي مدونة طبخ) أو اكتب اسم أي طبق تقليدي. سيقوم الذكاء الاصطناعي باستخراج المقادير وتنسيقها وإضافتها فوراً لكتاب وصفاتك مجاناً!",
    webImportPlaceholder: "مثال: https://... أو كسكسي بالمناني الصفاقسي",
    webImportSubmit: "بحث واستيراد الوصفة",
    webImportSuccessMsg: "تم استيراد الوصفة وإضافتها بنجاح!",
    webImportErrorNotice: "تعذر استيراد الوصفة، يرجى التحقق من الرابط أو اسم الطبق.",
    sourceWebBadge: "🌐 مصدر من الويب",
    btnViewImportedRecipe: "عرض الوصفة المستوردة",

    // Chatbot
    chatAminaTitle: "الشيف أسامة (ذكاء اصطناعي)",
    chatAminaStatus: "خبير الطبخ العالمي ومرشد التطبيق",
    chatThinking: "الشيف أسامة يفكر...",
    chatInputPlaceholder: "اسأل الشيف أسامة عن أي وصفة أو نصيحة...",
    quickPromptHelp: "كيف أستخدم التطبيق وجدول الوجبات؟",
    quickPromptCouscous: "ما سر نجاح تفوير الكسكسي بالطريقة الصحيحة؟",
    quickPromptDinner: "اقترح عليّ عشاءً سريعاً ولذيذاً الليلة",
    quickPromptPantry: "ماذا أطبخ الليلة بما يتوفر لدي في المطبخ؟",

    // Anti-Gaspi Placard
    chipPantryReady: "مؤونة مطبخي",
    pantryBannerTitle: "ماذا أطبخ من مؤونة مطبخي؟",
    pantryBannerSub: "وصفات يمكن إعدادها فوراً بما لديك من مكونات",
    btnViewPantryRecipes: "عرض الوجبات الممكنة",
    btnGeneratePantryRecipe: "ابتكار طبق من المخزون بالـ AI",
    inStock100: "جاهز 100% في المخزن",
    missingCountText: "ناقص",
    missingPluralText: "نواقص",
    pantryEmptyNotice: "مخزنك فارغ حالياً! أضف بعض المكونات أولاً في قسم مؤونة المطبخ.",

    // Centre de Gestion & Réinitialisation (Chef Oussama)
    manageSectionTitle: "مركز التحكم والإدارة وإعادة الضبط",
    manageSectionSubtitle: "أوامر الشيف أسامة لإفراغ، مسح، أو إعادة ضبط بيانات التطبيق",
    btnResetPlan: "تفريغ جدول وجبات الأسبوع",
    btnResetPlanDesc: "حذف جميع الوجبات المحددة لجميع أيام الأسبوع (غداء وعشاء)",
    btnClearPantry: "تفريغ مؤونة المطبخ",
    btnClearPantryDesc: "حذف كافة المكونات المتوفرة حالياً في المخزن",
    btnRestorePantry: "استعادة المخزن الافتراضي",
    btnRestorePantryDesc: "استعادة المكونات الأساسية (زيت زيتون، هريسة، كسكسي، بهارات...)",
    btnResetChat: "مسح محادثة الشيف أسامة",
    btnResetChatDesc: "إعادة تعيين سجل المحادثة وبدء حوار جديد مع المساعد الذكي",
    btnClearFavorites: "مسح قائمة المفضلة",
    btnClearFavoritesDesc: "إزالة كافة الأطباق المحفوظة في قائمة المفضلة",
    btnResetRecipes: "إعادة ضبط كتالوج الوصفات",
    btnResetRecipesDesc: "استعادة قائمة الوصفات الأصلية وحذف الأطباق المبتكرة أو المستوردة",
    btnHardResetAll: "⚠️ إعادة ضبط شاملة (تصفير كل شيء)",
    btnHardResetAllDesc: "تصفير الجدول والمخزن والمحادثة والمفضلة والوصفات إلى الحالة الأولية",
    confirmResetPlan: "هل أنت متأكد من تفريغ جدول وجبات الأسبوع بالكامل؟",
    confirmClearPantry: "هل أنت متأكد من مسح جميع مكونات المخزن؟",
    confirmRestorePantry: "هل تريد استعادة مكونات المخزن الافتراضية الأساسية؟",
    confirmResetChat: "هل تريد مسح سجل المحادثة بالكامل مع الشيف أسامة؟",
    confirmClearFavorites: "هل تريد إزالة جميع الأطباق من المفضلة؟",
    confirmResetRecipes: "تنبيه: سيتم حذف جميع الوصفات المبتكرة بالـ AI أو المستوردة. هل تؤكد ذلك؟",
    confirmHardResetAll: "🚨 تحذير هام: سيقوم هذا الإجراء بتفريغ الجدول وإعادة ضبط المخزن ومسح المحادثة وتصفير المفضلة واستعادة الوصفات الأصلية. هل أنت متأكد تماماً؟",
    confirmDeleteRecipe: "هل تريد بالتأكيد حذف هذه الوصفة من الكتالوج؟",
    btnDeleteRecipe: "حذف الوصفة",
    btnClearShoppingChecks: "إلغاء التحديد",
    btnQuickClearPlan: "تفريغ",
    btnQuickClearPantry: "تفريغ",
    btnQuickClearChat: "مسح",
    resetSuccess: "تمت العملية بنجاح!"
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
    chatChefButton: "Chef Oussama AI",
    ssoConnected: "SSO Connected",
    ssoLogin: "SSO Sign In",
    logout: "Log Out",
    btnInstallApp: "📲 Install App",

    // Auth wall
    authWallTitle: "Welcome to the AI Recipe & Grocery App",
    authWallSubtitle: "Your smart platform for worldwide cuisine & halal recipes with Chef Oussama",
    authWallNotice: "Access to this application requires logging in with your oussamma.tn SSO ecosystem account.",
    authWallButton: "Sign in with our SSO",
    authWallBadge: "Secure OIDC / SSO Gate",
    authWallFeatures: [
      "Authentic worldwide recipes (Tunisia, Morocco, Italy, France, Levant, Asia...)",
      "Chef Oussama AI: personalized tips, tricks and menus 24/7",
      "Smart AI meal planning and recipe generation powered by LiteLLM",
      "Consolidated grocery list with pantry inventory deductions"
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
    aiAdviceTitle: "Chef Oussama's Recommendation:",
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

    // Web Import modal (Gratuit)
    btnImportWeb: "🌐 Import from Web",
    webImportModalTitle: "Import Recipe from the Web for Free",
    webImportModalDesc: "Paste any recipe URL (Marmiton, 750g, cooking blogs...) OR type the name of a traditional dish. Our AI extracts instructions, scales ingredients, and adds it to your catalog for free!",
    webImportPlaceholder: "E.g.: https://... OR Authentic Moroccan Lamb Tajine",
    webImportSubmit: "Search & Import Recipe",
    webImportSuccessMsg: "Recipe successfully imported from the Web!",
    webImportErrorNotice: "Failed to import recipe. Please verify the URL or dish name.",
    sourceWebBadge: "🌐 Web Source",
    btnViewImportedRecipe: "View Imported Recipe",

    // Chatbot
    chatAminaTitle: "Chef Oussama AI",
    chatAminaStatus: "Worldwide Culinary Expert & Guide",
    chatThinking: "Chef Oussama is thinking...",
    chatInputPlaceholder: "Ask Chef Oussama any culinary question...",
    quickPromptHelp: "How do I use this app and the meal planner?",
    quickPromptCouscous: "What is the secret to perfect steamed couscous?",
    quickPromptDinner: "Give me an idea for a quick dinner tonight",
    quickPromptPantry: "What can I cook tonight with the ingredients in my pantry?",

    // Anti-Gaspi Placard
    chipPantryReady: "My Pantry",
    pantryBannerTitle: "What can I cook with my pantry?",
    pantryBannerSub: "recipes you can make right now with what you already have at home",
    btnViewPantryRecipes: "View cookable recipes",
    btnGeneratePantryRecipe: "Create tailored recipe from pantry with AI",
    inStock100: "100% in stock",
    missingCountText: "missing",
    missingPluralText: "missing",
    pantryEmptyNotice: "Your pantry is empty right now! Add some ingredients in the Pantry tab first.",

    // Centre de Gestion & Réinitialisation (Chef Oussama)
    manageSectionTitle: "Management & Reset Center",
    manageSectionSubtitle: "Chef Oussama admin commands to clear, reset, or restore application data",
    btnResetPlan: "Clear Weekly Meal Plan",
    btnResetPlanDesc: "Removes all scheduled meals for the week (lunch & dinner)",
    btnClearPantry: "Empty Pantry",
    btnClearPantryDesc: "Deletes all items currently in your pantry inventory",
    btnRestorePantry: "Restore Default Pantry",
    btnRestorePantryDesc: "Restores starter staples (olive oil, harissa, couscous, spices...)",
    btnResetChat: "Clear Chef Oussama Chat",
    btnResetChatDesc: "Wipes conversation history and starts a fresh dialogue",
    btnClearFavorites: "Clear Favorites",
    btnClearFavoritesDesc: "Removes all recipes saved in your favorites list",
    btnResetRecipes: "Reset Recipe Catalog",
    btnResetRecipesDesc: "Restores initial recipes and removes AI-generated/imported dishes",
    btnHardResetAll: "⚠️ Reset Everything (Hard Reset)",
    btnHardResetAllDesc: "Clears meal plan, resets pantry, wipes chat, removes favorites, and restores catalog",
    confirmResetPlan: "Are you sure you want to clear the entire weekly meal plan?",
    confirmClearPantry: "Are you sure you want to delete all items in your pantry?",
    confirmRestorePantry: "Do you want to restore default starter pantry items?",
    confirmResetChat: "Do you want to clear your entire chat history with Chef Oussama?",
    confirmClearFavorites: "Do you want to remove all recipes from your favorites?",
    confirmResetRecipes: "Warning: All AI-generated and web-imported recipes will be deleted. Confirm reset?",
    confirmHardResetAll: "🚨 CAUTION: This will clear your meal plan, reset your pantry, wipe chat history, delete favorites, and restore initial recipes. Are you ABSOLUTELY sure?",
    confirmDeleteRecipe: "Are you sure you want to delete this recipe from your catalog?",
    btnDeleteRecipe: "Delete Recipe",
    btnClearShoppingChecks: "Uncheck All",
    btnQuickClearPlan: "Clear",
    btnQuickClearPantry: "Empty",
    btnQuickClearChat: "Clear",
    resetSuccess: "Action completed successfully!"
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

      // Chatbot Chef Oussama IA
      isChatOpen: false,
      chatMessages: [],
      chatInput: '',
      isTypingChat: false,

      // PWA Mobile App Installation
      canInstallPWA: false,
      deferredPrompt: null,
      showIOSInstallModal: false,

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
      isGeneratingPantryRecipe: false,

      // Modal Import Web (Gratuit)
      isImportWebModalOpen: false,
      webImportInput: '',
      isImportingWeb: false,
      webImportError: '',
      webImportSuccessRecipe: null,

      isAddPantryModalOpen: false,
      pantryForm: {
        id: null,
        name: '',
        quantity: 500,
        unit: 'g',
        category: 'Épicerie & Féculents',
        brand: ''
      },

      // Stitch Design State
      currentFilter: 'all', // 'all', 'tunisie', 'maroc', 'express', 'favoris'
      shoppingSubTab: 'list', // 'list' or 'pantry'
      checkedShoppingItems: JSON.parse(localStorage.getItem('checked_shopping_items') || '[]'),
      newShoppingItemInput: '',
      activePlanningDay: 'lundi',
      selectedWeekLabel: '12 - 18 Mai',
      dismissAuthWall: localStorage.getItem('dismiss_auth_wall') === '1'
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

      // Filtre Stitch chips
      if (this.currentFilter === 'favoris') {
        list = list.filter(r => this.favoriteIds.includes(r.id));
      } else if (this.currentFilter === 'tunisie') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('tunis'));
      } else if (this.currentFilter === 'maroc') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('maroc'));
      } else if (this.currentFilter === 'italie') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('ital'));
      } else if (this.currentFilter === 'france') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('fran'));
      } else if (this.currentFilter === 'levant') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('liban') || (r.origin || '').toLowerCase().includes('levant') || (r.origin || '').toLowerCase().includes('orient'));
      } else if (this.currentFilter === 'asie') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('asie') || (r.origin || '').toLowerCase().includes('japon') || (r.origin || '').toLowerCase().includes('chin'));
      } else if (this.currentFilter === 'mexique') {
        list = list.filter(r => (r.origin || '').toLowerCase().includes('mexi'));
      } else if (this.currentFilter === 'express') {
        list = list.filter(r => (r.prepTime + r.cookTime) <= 35 || (r.category || '').toLowerCase().includes('express'));
      } else if (this.currentFilter === 'placard') {
        // Filtre et trie par disponibilité dans le placard (recettes immédiatement faisables en premier)
        list = [...list].sort((a, b) => this.getMissingCount(a) - this.getMissingCount(b));
      }

      if (this.showOnlyFavorites && this.currentFilter !== 'favoris') {
        list = list.filter(r => this.favoriteIds.includes(r.id));
      }

      if (this.aiSearchResult && this.aiSearchResult.recommendations && this.aiSearchResult.recommendations.length > 0) {
        const recIds = this.aiSearchResult.recommendations.map(r => r.recipeId);
        const matched = list.filter(r => recIds.includes(r.id));
        if (matched.length > 0) return matched;
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

    shoppingCategorizedItems() {
      const categories = {
        'Boucherie & Poissonnerie': { icon: 'fa-solid fa-fish', emoji: '🐟', items: [] },
        'Épicerie & Féculents': { icon: 'fa-solid fa-wheat-awn', emoji: '🌾', items: [] },
        'Épices & Condiments': { icon: 'fa-solid fa-pepper-hot', emoji: '🌶', items: [] },
        'Primeur': { icon: 'fa-solid fa-carrot', emoji: '🥦', items: [] },
        'Frais & Crèmerie': { icon: 'fa-solid fa-egg', emoji: '🧀', items: [] },
        'Huiles & Condiments': { icon: 'fa-solid fa-bottle-droplet', emoji: '🫒', items: [] },
      };

      const allItems = this.shoppingList?.items || [];
      for (const item of allItems) {
        let cat = item.category || 'Épicerie & Féculents';
        if (cat.toLowerCase().includes('boucherie') || cat.toLowerCase().includes('poisson') || cat.toLowerCase().includes('viande') || cat.toLowerCase().includes('merguez')) {
          categories['Boucherie & Poissonnerie'].items.push(item);
        } else if (cat.toLowerCase().includes('épices') || cat.toLowerCase().includes('condiment') || cat.toLowerCase().includes('harissa') || cat.toLowerCase().includes('tabel')) {
          categories['Épices & Condiments'].items.push(item);
        } else if (cat.toLowerCase().includes('primeur') || cat.toLowerCase().includes('légume') || cat.toLowerCase().includes('fruit') || cat.toLowerCase().includes('piment')) {
          categories['Primeur'].items.push(item);
        } else if (cat.toLowerCase().includes('frais') || cat.toLowerCase().includes('crèmerie') || cat.toLowerCase().includes('œuf') || cat.toLowerCase().includes('fromage')) {
          categories['Frais & Crèmerie'].items.push(item);
        } else if (cat.toLowerCase().includes('huile')) {
          categories['Huiles & Condiments'].items.push(item);
        } else {
          categories['Épicerie & Féculents'].items.push(item);
        }
      }

      return Object.entries(categories)
        .filter(([_, data]) => data.items.length > 0)
        .map(([name, data]) => ({
          name,
          icon: data.icon,
          emoji: data.emoji,
          count: data.items.length,
          items: data.items
        }));
    },

    shoppingCheckedCount() {
      const allItems = this.shoppingList?.items || [];
      return allItems.filter(i => this.checkedShoppingItems.includes(i.name)).length;
    },

    shoppingProgressPercent() {
      const total = this.shoppingList?.items?.length || 0;
      if (total === 0) return 0;
      return Math.round((this.shoppingCheckedCount / total) * 100);
    },

    missingTotalItemsCount() {
      return this.shoppingList?.itemsToBuyCount || (this.shoppingList?.items?.length || 0);
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
    },

    readyFromPantryCount() {
      if (!this.pantryItems || this.pantryItems.length === 0 || !this.recipes) return 0;
      return this.recipes.filter(r => this.getMissingCount(r) === 0).length;
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

    // Enregistrement PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW register error:', err));
    }

    // Écouteur d'installation PWA Mobile / Desktop
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstallPWA = true;
    });

    window.addEventListener('appinstalled', () => {
      this.canInstallPWA = false;
      this.deferredPrompt = null;
      console.log('PWA installée avec succès');
    });

    await this.fetchAuth();
    this.authChecked = true;

    // Charger les données de l'application (profil utilisateur ou invité)
    await this.fetchRecipes();
    await this.fetchFavorites();
    await this.fetchPlan();
    await this.fetchPantry();
    await this.fetchPreferences();
    await this.fetchShoppingList();
    await this.fetchChat();
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

    dismissGuestWall() {
      this.dismissAuthWall = true;
      localStorage.setItem('dismiss_auth_wall', '1');
    },

    // --- PWA INSTALLATION MOBILE ---
    async installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          this.canInstallPWA = false;
        }
        this.deferredPrompt = null;
      } else {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          this.showIOSInstallModal = true;
        } else {
          alert(this.currentLang === 'ar'
            ? 'لتثبيت التطبيق على هاتفك أو حاسوبك: افتح قائمة المتصفح (⋮ أو ⚙️) ثم اضغط على "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"'
            : (this.currentLang === 'en'
              ? 'To install this app on your device: open the browser menu (⋮) and select "Install app" or "Add to Home Screen"'
              : 'Pour installer l\'application sur votre téléphone ou PC : ouvrez le menu de votre navigateur (⋮) puis cliquez sur "Installer l\'application" ou "Ajouter à l\'écran d\'accueil"'));
        }
      }
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
          this.activeTab = 'planning';
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

    clearAiSearch() {
      this.aiSearchResult = null;
      this.searchQuery = '';
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
        this.closeRecipeDetails();
        this.activeTab = 'planning';
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
        this.activeTab = 'planning';
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

    // --- IMPORTATION & RECHERCHE DE RECETTES SUR LE WEB (GRATUIT) ---
    openImportWebModal() {
      this.webImportInput = '';
      this.webImportError = '';
      this.webImportSuccessRecipe = null;
      this.isImportWebModalOpen = true;
    },

    closeImportWebModal() {
      this.isImportWebModalOpen = false;
    },

    async submitImportWeb() {
      if (!this.webImportInput.trim()) return;
      this.isImportingWeb = true;
      this.webImportError = '';
      this.webImportSuccessRecipe = null;

      try {
        const res = await fetch('/api/ai/import-web-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queryOrUrl: this.webImportInput })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Erreur lors de l’importation de la recette.');
        }

        this.webImportSuccessRecipe = data.recipe;
        await this.fetchRecipes();
      } catch (err) {
        console.error('Erreur import web:', err);
        this.webImportError = err.message || this.t.webImportErrorNotice;
      } finally {
        this.isImportingWeb = false;
      }
    },

    viewImportedRecipe() {
      if (this.webImportSuccessRecipe) {
        const r = this.webImportSuccessRecipe;
        this.isImportWebModalOpen = false;
        this.viewRecipeDetails(r);
      }
    },

    // --- CHATBOT CHEF OUSSAMA IA MULTILINGUE ---
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
    },

    // --- GOOGLE STITCH DESIGN HELPERS ---
    setFilter(key) {
      this.currentFilter = key;
    },

    isIngredientInStock(name) {
      if (!name) return false;
      const n = name.toLowerCase().trim();
      return this.pantryItems.some(p => {
        const pn = (p.name || '').toLowerCase().trim();
        return pn.includes(n) || n.includes(pn);
      });
    },

    getMissingCount(recipe, servings = 4) {
      if (!recipe || !recipe.ingredients) return 0;
      return recipe.ingredients.filter(ing => !this.isIngredientInStock(ing.name)).length;
    },

    getInStockCount(recipe) {
      if (!recipe || !recipe.ingredients) return 0;
      return recipe.ingredients.filter(ing => this.isIngredientInStock(ing.name)).length;
    },

    getMatchPercentage(recipe) {
      if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) return 0;
      const inStock = this.getInStockCount(recipe);
      return Math.round((inStock / recipe.ingredients.length) * 100);
    },

    showPantryReadyRecipes() {
      this.activeTab = 'recipes';
      this.closeRecipeDetails();
      this.setFilter('placard');
    },

    async generatePantryRecipeAI() {
      if (!this.pantryItems || this.pantryItems.length === 0) {
        alert(this.t.pantryEmptyNotice);
        this.activeTab = 'shopping';
        this.shoppingSubTab = 'pantry';
        return;
      }
      this.isGeneratingPantryRecipe = true;
      try {
        const res = await fetch('/api/ai/pantry-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ note: '' })
        });
        const data = await res.json();
        if (data.recipe) {
          this.recipes.unshift(data.recipe);
          this.openRecipeDetails(data.recipe);
        } else {
          alert(data.error || 'Erreur lors de la création de la recette anti-gaspi');
        }
      } catch (e) {
        console.error('Erreur generatePantryRecipeAI:', e);
        alert('Erreur lors de la génération avec le placard');
      } finally {
        this.isGeneratingPantryRecipe = false;
      }
    },

    async addMissingToShopping(recipe) {
      if (!recipe) return;
      // Trouver le premier créneau libre ou utiliser lundi midi
      const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
      let targetDay = 'lundi';
      let targetMeal = 'midi';
      for (const d of days) {
        if (!this.mealPlan?.days?.[d]?.midi) { targetDay = d; targetMeal = 'midi'; break; }
        if (!this.mealPlan?.days?.[d]?.soir) { targetDay = d; targetMeal = 'soir'; break; }
      }

      try {
        await fetch('/api/plan/set-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            day: targetDay,
            mealType: targetMeal,
            recipeId: recipe.id,
            servings: this.modalServings || 4
          })
        });
        await this.fetchPlan();
        await this.fetchShoppingList();
      } catch (e) {
        console.error('Erreur assignation repas courses:', e);
      }

      this.closeRecipeDetails();
      this.activeTab = 'shopping';
      this.shoppingSubTab = 'list';
    },

    toggleShoppingCheck(itemName) {
      const idx = this.checkedShoppingItems.indexOf(itemName);
      if (idx >= 0) {
        this.checkedShoppingItems.splice(idx, 1);
      } else {
        this.checkedShoppingItems.push(itemName);
      }
      localStorage.setItem('checked_shopping_items', JSON.stringify(this.checkedShoppingItems));
    },

    isShoppingItemChecked(itemName) {
      return this.checkedShoppingItems.includes(itemName);
    },

    async addQuickShoppingItem() {
      const val = this.newShoppingItemInput.trim();
      if (!val) return;
      try {
        await fetch('/api/pantry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: val,
            quantity: 1,
            unit: 'pièce',
            category: 'Épicerie & Féculents'
          })
        });
        this.newShoppingItemInput = '';
        await this.fetchPantry();
        await this.fetchShoppingList();
      } catch (e) {
        console.error('Erreur ajout article rapide:', e);
      }
    },

    copyShoppingListForShare() {
      if (!this.shoppingList?.items?.length) return;
      let text = `🛒 *Liste de courses (recettes.oussamma.tn)*\n`;
      text += `📅 Semaine ${this.selectedWeekLabel}\n\n`;
      for (const item of this.shoppingList.items) {
        const status = this.isShoppingItemChecked(item.name) ? '✅' : '⬜';
        text += `${status} ${item.name} : ${item.toBuy} ${item.unit} ${item.recommendedBrand ? `(${item.recommendedBrand})` : ''}\n`;
      }
      navigator.clipboard.writeText(text);
      alert(this.t.listCopiedAlert || 'Liste copiée pour WhatsApp !');
    },

    openRecipeDetails(recipe) {
      this.selectedRecipeModal = recipe;
      this.modalServings = recipe.defaultServings || 4;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    closeRecipeDetails() {
      this.selectedRecipeModal = null;
    },

    openSwapMeal(day, mealType) {
      this.selectRecipeModalTarget = { day, mealType };
    },

    getRecipeById(id) {
      if (!id) return null;
      return this.recipes.find(r => r.id === id) || null;
    },

    // --- GESTION & RÉINITIALISATION (CHEF OUSSAMA / ADMIN) ---
    async resetMealPlanConfirm() {
      if (!confirm(this.t.confirmResetPlan)) return;
      try {
        const res = await fetch('/api/reset/plan', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          this.mealPlan = data.plan;
          await this.fetchShoppingList();
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur reset plan:', e);
      }
    },

    async clearPantryConfirm(mode = 'empty') {
      const msg = mode === 'empty' ? this.t.confirmClearPantry : this.t.confirmRestorePantry;
      if (!confirm(msg)) return;
      try {
        const res = await fetch('/api/reset/pantry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode })
        });
        if (res.ok) {
          const data = await res.json();
          this.pantryItems = data.items;
          await this.fetchShoppingList();
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur reset pantry:', e);
      }
    },

    async resetChatConfirm() {
      if (!confirm(this.t.confirmResetChat)) return;
      try {
        const res = await fetch('/api/reset/chat', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          this.chatMessages = data.history;
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur reset chat:', e);
      }
    },

    async clearFavoritesConfirm() {
      if (!confirm(this.t.confirmClearFavorites)) return;
      try {
        const res = await fetch('/api/reset/favorites', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          this.favoriteIds = data.favorites;
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur reset favorites:', e);
      }
    },

    async resetRecipesConfirm() {
      if (!confirm(this.t.confirmResetRecipes)) return;
      try {
        const res = await fetch('/api/reset/recipes', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          this.recipes = data.recipes;
          await this.fetchShoppingList();
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur reset recipes:', e);
      }
    },

    async hardResetAllConfirm() {
      if (!confirm(this.t.confirmHardResetAll)) return;
      try {
        const res = await fetch('/api/reset/all', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          this.mealPlan = data.plan;
          this.pantryItems = data.pantry;
          this.chatMessages = data.history;
          this.favoriteIds = data.favorites;
          this.recipes = data.recipes;
          this.checkedShoppingItems = [];
          localStorage.removeItem('checked_shopping_items');
          await this.fetchShoppingList();
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur hard reset:', e);
      }
    },

    async deleteRecipeConfirm(recipeId) {
      if (!recipeId) return;
      if (!confirm(this.t.confirmDeleteRecipe)) return;
      try {
        const res = await fetch(`/api/recipes/${recipeId}`, { method: 'DELETE' });
        if (res.ok) {
          this.recipes = this.recipes.filter(r => r.id !== recipeId);
          this.favoriteIds = this.favoriteIds.filter(id => id !== recipeId);
          if (this.selectedRecipeModal && this.selectedRecipeModal.id === recipeId) {
            this.closeRecipeDetails();
          }
          await this.fetchShoppingList();
          alert(this.t.resetSuccess);
        }
      } catch (e) {
        console.error('Erreur suppression recette:', e);
      }
    },

    resetCheckedShoppingItems() {
      this.checkedShoppingItems = [];
      localStorage.removeItem('checked_shopping_items');
    },

    getDayLabel(dayKey) {
      if (!dayKey) return '';
      const cap = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
      return this.t['day' + cap] || cap;
    },

    getDayShort(dayKey) {
      const map = {
        lundi: 'LUN',
        mardi: 'MAR',
        mercredi: 'MER',
        jeudi: 'JEU',
        vendredi: 'VEN',
        samedi: 'SAM',
        dimanche: 'DIM'
      };
      return map[dayKey] || dayKey.substring(0, 3).toUpperCase();
    }
  }
}).mount('#app');
