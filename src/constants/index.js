import {
  benefitCard1,
  benefitCard2,
  benefitCard3,
  benefitCard4,
  benefitCard5,
  benefitCard6,
  benefitImage1,
  cart,
  checkIcon,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  fast,
  figma,
  file02,
  fire,
  framer,
  homeIcon,
  homeSmile,
  instagram,
  ledIcon,
  load,
  lockIcon,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  printer,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  share,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";
import { paths } from "../routes/paths";

export const navigation = [
  {
    id: "1",
    title: "Accueil",
    url: paths.root
  },
  {
    id: "0",
    title: "Modèles de VKARD",
    url: paths.products.list,
  },
  {
    id: "2",
    title: "Démo & Devis",
    url: paths.contact.root,
  },
  
  {
    id: "6",
    title: "Sign in",
    url: paths.auth.root,
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Sécurité des données",
    text: "Vos données sont intégralement chiffrées sur notre plateforme soumise régulièrement aux tests d'intrusion (niveau A+).",
    backgroundUrl: benefitCard1,
    iconUrl: lockIcon,
    imageUrl: benefitImage1,
  },
  {
    id: "1",
    title: "RGPD & Confidendialité",
    text: "VKARD est auditée et totalement conforme au RGPD pour une protection maximale de vos données personnelles.",
    backgroundUrl: benefitCard2,
    iconUrl: checkIcon,
    imageUrl: benefitImage1,
    light: true,
  },
  {
    id: "2",
    title: "RSE & Ecologie",
    text: "Nous adoptons une approche éco-responsable en minimisant notre empreinte carbone et en favorisant les matériaux durables et recyclables.",
    backgroundUrl: benefitCard3,
    iconUrl: ledIcon,
    imageUrl: benefitImage1,
  },
  {
    id: "3",
    title: "Fabriqué en France",
    text: "Nos produits sont conçus et fabriqués en France. Cela nous permet de garantir une qualité supérieure et des délais de fabrication réduits.",
    backgroundUrl: benefitCard4,
    iconUrl: homeIcon,
    imageUrl: benefitImage1,
    light: true,
  },
];

export const whyUsVars = [
  {
    id: "0",
    text: "Partagez vos coordonnées en quelques secondes via le sans contact (NFC) ou le QRcode",
    iconUrl: share,
    backgroundUrl: benefitCard4,
  },
  {
    id: "1",
    text: "Mise à jour facile et illimitée via le Dashboard",
    iconUrl: load,
    backgroundUrl: benefitCard5,
  },
  {
    id: "2",
    text: "Récupérez les coordonnées de vos prospects via votre VKARD",
    iconUrl: cart,
    backgroundUrl: benefitCard1,
  },
  {
    id: "3",
    text: "Effet whaoo et moderne",
    iconUrl: fire,
    backgroundUrl: benefitCard6,
  },
  {
    id: "4",
    text: "N’imprimez plus jamais de cartes en papier. ",
    iconUrl: printer,
    backgroundUrl: benefitCard2,
  },
  {
    id: "5",
    text: "Fabrication et envoi rapide",
    iconUrl: fast,
    backgroundUrl: benefitCard2,
  },
]

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

export const ORDER_STATUS = [
  {
    value: 'pending',
    label: 'À payer',
    color: '#b45309',       // amber-700
    bgColor: '#fef3c7',     // amber-100
  },
  {
    value: 'paid',
    label: 'Payé',
    color: '#15803d',       // green-700
    bgColor: '#dcfce7',     // green-100
  },
  {
    value: 'unpaid',
    label: 'Échoué',
    color: '#b91c1c',       // red-700
    bgColor: '#fee2e2',     // red-100
  },
  {
    value: 'waiting',
    label: 'À valider',
    color: '#7c3aed',       // purple-700
    bgColor: '#ede9fe',     // purple-100
  },
  {
    value: 'delivered',
    label: 'Livré',
    color: '#0369a1',       // sky-700
    bgColor: '#e0f2fe',     // sky-100
  },
];


export const STORAGE_KEY = 'speedgi_access_token';
