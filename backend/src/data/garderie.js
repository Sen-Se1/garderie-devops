const garderie = {
  name: "Les Petits Explorateurs",
  tagline: "Grandir, découvrir et s'épanouir chaque jour",
  description:
    "Un espace chaleureux et sécurisé où chaque enfant apprend, joue et grandit à son rythme, accompagné par une équipe passionnée.",
  address: "Nabeul, Tunisie",
  phone: "+216 72 000 000",
  email: "bonjour@petits-explorateurs.tn",
  openingHours: "Du lundi au vendredi, de 7 h 30 à 18 h",
  ageRange: "De 3 mois à 5 ans"
};

const services = [
  {
    id: 1,
    icon: "🧸",
    title: "Accueil bienveillant",
    description: "Un environnement rassurant et adapté aux besoins de chaque enfant."
  },
  {
    id: 2,
    icon: "🍎",
    title: "Repas équilibrés",
    description: "Des repas variés qui favorisent la découverte des goûts et une bonne croissance."
  },
  {
    id: 3,
    icon: "📚",
    title: "Éveil et apprentissage",
    description: "Des activités ludiques pour développer le langage, la curiosité et l'autonomie."
  },
  {
    id: 4,
    icon: "🌿",
    title: "Jeux en plein air",
    description: "Des moments de mouvement et de découverte dans un espace adapté aux enfants."
  }
];

const activites = [
  {
    id: 1,
    title: "Ateliers créatifs",
    description: "Peinture, dessin, collage et premières créations manuelles.",
    ageGroup: "2–5 ans"
  },
  {
    id: 2,
    title: "Éveil musical",
    description: "Chansons, rythmes et découverte des sons par le jeu.",
    ageGroup: "1–5 ans"
  },
  {
    id: 3,
    title: "Histoires et contes",
    description: "Des histoires pour stimuler l'imagination et enrichir le vocabulaire.",
    ageGroup: "1–5 ans"
  },
  {
    id: 4,
    title: "Motricité",
    description: "Des parcours et jeux adaptés pour bouger et gagner en confiance.",
    ageGroup: "6 mois–5 ans"
  }
];

module.exports = { garderie, services, activites };