import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 语言资源
const resources = {
  fr: {
    translation: {
      welcome: "bienvenu",
      description: "C'est un example",
      Welcome_to_Stampee: "Bienvenue sur Stampee",
      An_exceptional_auction_platform: "Une plateforme d'enchère d'exception",
      How_does_it_work: "Comment ça marche ?",
      Acquire_stamps_in_a_few_steps:
        "Aquérissez des timbres en quelques étapes :",
      Log_in_or_sign_up: "Connectez-vous ou inscrivez-vous",
      Use_advanced_search_to_find_the_rare_gem:
        "Utilisez la recherche avancée pour trouver la perle rare",
      Bid_and_enjoy_your_favorite_auctions_easily:
        "Misez et savourez vos enchères favorites facilement",
      Learn_more: "En savoir plus",
      Discover_the_Lords_favorites: "Découvrez les coups de coeur du Lord",
      Look_for_the: "Reprenez l'icône",
      icon_to_find_our_experts_favorite_auctions:
        "afin de trouver les enchères favorites de notre expert !",
      Not_yet_registered: "Pas encore inscrit(e) ?",
      Bid_and_enjoy_Stampee_fully_as_a_registered_member:
        "Misez et profitez pleinement de Stampee en tant que membre inscrit !",
      Become_a_member: "Devenir membre",
      Log_in: "Se connecter",
      Featured_offers: "Offres en vedette",
      Last_offer_by_user2024: "Dernière offre par user2024",
      See_all: "Voir tout",
      Categories: "Catégories",
      Most_popular: "Les plus populaire",
      Ending_soon: "Bientôt terminées",
      New_offers: "Nouvelles offres",
      News: "Actualités",
      Recently_published: "Récemment publié",
      Read_the_article: "Lire l'article",
      How_I_learned_to_look_at_stamps:
        "Comment j’ai appris à regarder les timbres",
      Auction_paradise_An_hour_in_London:
        "Paradis des enchères - Une heure à Londres",
      Our_mission: "Notre mission",
      A_platform_for_enthusiasts: "Une plateforme pour les passionné(e)s",
      Lord_Reginald_Stampee:
        "Lord Reginald Stampee, duc de Worcessteshear et philatéliste depuis sa tendre enfance au milieu des années cinquante, Venenatis urna cursuse nunc scelerisque viverra mauris in. Dolor sit amet consectetur adipiscing purus sit. Vel pharetra vel turpis nunc eget lorem dolor sed. Vitae congue",
      Our_team:
        "Notre équipe est toujours prête à répondre à vos questions dans les plus brefs délais !",
      Contact_us: "Contactez-nous",
      Quick_access: "Accès rapides",
      Philately_is_life: "La philatélie, c'est la vie",
      Lords_biography: "Biographie du Lord",
      Family_history: "Historique familial",
      Subscribe_to_our_newsletter: "Abonnez-vous à notre infolettre !",
      Get_early_access:
        "Prenez connaissance en avance de toutes nos nouveautés et profitez d’offres exceptionnelles !",
      Subscribe: "S'abonner",
      Contact_Support: "Contact & Support",
      Terms_conditions: "Termes et conditions",
      Help: "Aide",
      Contact_the_webmaster: "Contactez le webmaster",
      Stampee_2024: "Stampee 2024. Tous droits réservés",
      Advanced: "Avancée",
      Find: "Trouvez une enchère",
      catalog: "Catalogue d'enchères",
      progress: "En cours",
      Functioning: "Fonctionnement",
      propos: " À propos de Lord Réginald Stampee III",
      Participating:
        "Participer à une enchère n'aura jamais été aussi simple et rapide",
      Discover: "Découvrez dès maintenant notre sélection.",
      See: "Voir toute les enchères",
      favorites: "Voir tous les favoris",
      Bet: "Miser",
      Current: "Mise courante",
      offer: "offre",
      offers: "offres",
      None: "Aucune",
      Published: "Publié le",
      Auction: "Enchères",
      more: "Lire la suite",
      Reginald: "Par Lord Réginald Stampee",
      Stamps: "Timbres",
      BROWSE: "PARCOUREZ NOS ENCHÈRES",
      PEARL: "TROUVEZ LA PERLE RARE",
      Hi: "Bonjour",
      post: "publier une enchère",
      Sign_out: "Se déconnecter",
      my_auctions: "mes enchères",
      All: "Tous",
      Descending_price: "Prix décroissant",
      Ascending_price: "Prix croissant",
      Advanced_search: "Recherche Avancée",
      Perfect: "Parfaite",
      Excellent: "Excellente",
      Good: "Bonne",
      Average: "Moyenne",
      Damaged: "Endommagé",
      country: "Pays d'origine",
      All_countries: "Tous les pays",
      United_Kingdom: "Royaume-Uni",
      UNITED_STATES: "États-unis",
      Australia: "Australie",
      China: "Chine",
      Spain: "Espagne",
      Price: "Prix",
      default: "Par défaut",
      search: "Chercher",
      auctions_found: "enchères trouvées",
      DELETE: "Supprimer",
      of: "de",
      E_mail: "Courriel",
      Password: "Mot de passe",
      Incorrect: "E-mail ou mot de passe incorrect",
      CREATE: "CRÉE UN COMPTE",
      Name: "Nom",
      try_again: "essayer à nouveau",
      start_date: "Date de début",
      end_date: "Date de fin",
      favorite: "Davoris",
      Creation_date: "Date de création",
      Bid_time: "Heure de l'enchère",
      Starting_price: "Prix de départ",
      Reserve_price: "Prix de réserve",
      status: "statut",
      certified: "certifié",
      Back_catalog: "Retour au catalogue",
      Details: "Détails",
      history: "Historique",
      Seller: "Vendeur",
      END: "Fin",
      Beginning: "Début",
      Close: "Fermer dans",
      Year_issue: "Année d'émission",
      Sending_country: "Pays d'envoi",
      Free_international_delivery: "Livraison internationale gratuite",
      Certification_guaranteed: "Certification garantie",
      same_category: "Dans la même catégorie",
      Allt: "Tout",
      display: "afficher",
      closed: "fermé",
    },
    // _
  },
  en: {
    translation: {
      welcome: "welcome",
      description: "C'est un example",
      Welcome_to_Stampee: "Welcome to Stampee",
      An_exceptional_auction_platform: "An exceptional auction platform",
      How_does_it_work: "How does it work?",
      Acquire_stamps_in_a_few_steps: "Acquire stamps in a few steps:",
      Log_in_or_sign_up: "Log in or sign up",
      Use_advanced_search_to_find_the_rare_gem:
        "Use advanced search to find the rare gem",
      Bid_and_enjoy_your_favorite_auctions_easily:
        "Bid and enjoy your favorite auctions easily",
      Learn_more: "Learn more",
      Discover_the_Lords_favorites: "Discover the Lord's favorites",
      Look_for_the: "Look for the",
      icon_to_find_our_experts_favorite_auctions:
        "icon to find our expert's favorite auctions!",
      Not_yet_registered: "Not yet registered?",
      Bid_and_enjoy_Stampee_fully_as_a_registered_member:
        "Bid and enjoy Stampee fully as a registered member!",
      Become_a_member: "Become a member",
      Log_in: "Log in",
      Featured_offers: "Featured offers",
      Last_offer_by_user2024: "Last offer by user2024",
      See_all: "See all",
      Categories: "Categories",
      Most_popular: "Most popular",
      Ending_soon: "Ending soon",
      New_offers: "New offers",
      News: "News",
      Recently_published: "Recently published",
      Read_the_article: "Read the article",
      How_I_learned_to_look_at_stamps: "How I learned to look at stamps",
      Auction_paradise_An_hour_in_London:
        "Auction paradise - An hour in London",
      Our_mission: "Our mission",
      A_platform_for_enthusiasts: "A platform for enthusiasts",
      Lord_Reginald_Stampee:
        "Lord Reginald Stampee, Duke of Worcestershire and philatelist since his early childhood in the mid-fifties",
      Our_team:
        "Our team is always ready to answer your questions as quickly as possible!",
      Contact_us: "Contact us",
      Quick_access: "Quick access",
      Philately_is_life: "Philately is life",
      Lords_biography: "Lord's biography",
      Family_history: "Family history",
      Subscribe_to_our_newsletter: "Subscribe to our newsletter!",
      Get_early_access:
        "Get early access to all our news and enjoy exceptional offers!",
      Subscribe: "Subscribe",
      Contact_Support: "Contact & Support",
      Terms_conditions: "Terms and conditions",
      Help: "Help",
      Contact_the_webmaster: "Contact the webmaster",
      Stampee_2024: "Stampee 2024. All rights reserved",
      Advanced: "Advanced",
      Find: "Find an auction",
      catalog: "Auction catalog",
      progress: "In progress",
      Functioning: "Functioning",
      propos: "About Lord Reginald Stampee III",
      Participating:
        "Participating in an auction has never been so simple and quick",
      Discover: "Discover our selection now.",
      See: "See all auctions",
      favorites: "See all favorites",
      Bet: "Bet",
      Current: "Current bet",
      offer: "offer",
      offers: "offers",
      None: "None",
      Published: "Published on",
      Auction: "Auctions",
      more: "Read more",
      Reginald: "By Lord Reginald Stampee",
      Stamps: "Stamps",
      BROWSE: "BROWSE OUR AUCTIONS",
      PEARL: "FIND THE RARE PEARL",
      Hi: "Hi",
      post: "post an auction",
      Sign_out: "Sign out",
      my_auctions: "my auctions",
      All: "All",
      Descending_price: "Descending price",
      Ascending_price: "Ascending price",
      Advanced_search: "Advanced search",
      Perfect: "Perfect",
      Excellent: "Excellent",
      Good: "Good",
      Average: "Average",
      Damaged: "Damaged",
      country: "Native country",
      All_countries: "All countries",
      United_Kingdom: "United Kingdom",
      UNITED_STATES: "UNITED STATES",
      Australia: "Australia",
      China: "China",
      Spain: "Spain",
      Price: "Price",
      default: "By default",
      search: "Search",
      auctions_found: "auctions found",
      DELETE: "Delete",
      of: "of",
      E_mail: "E-mail",
      Password: "Password",
      Incorrect: "Incorrect email or password",
      CREATE: "CREATE AN ACCOUNT",
      Name: "Name",
      try_again: "try again",
      start_date: "Start date",
      end_date: "End date",
      favorite: "Favorites",
      Creation_date: "Creation date",
      Bid_time: "Bid time",
      Starting_price: "Starting price",
      Reserve_price: "Reserve price",
      status: "status",
      certified: "certified",
      Back_catalog: "Back to catalog",
      Details: "Details",
      history: "History",
      Seller: "Seller",
      END: "End",
      Beginning: "Begin",
      Close: "Close in",
      Year_issue: "Year of issue",
      Sending_country: "Sending country",
      Free_international_delivery: "Free international delivery",
      Certification_guaranteed: "Certification guaranteed",
      same_category: "In the same category",
      Allt: "All",
      display: "display",
      closed: "closed",
    },
  },
};

i18n
  .use(initReactI18next) // 将 i18next 传递给 react-i18next
  .init({
    resources,
    // lng: "en", // 默认语言
    lng: "fr", // 默认语言
    fallbackLng: "fr",
    // fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React 已经进行转义处理
    },
  });

export default i18n;
