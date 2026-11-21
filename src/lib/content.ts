// Tout le contenu du portfolio, en français et en anglais.
// Pour modifier un texte, c'est ici et nulle part ailleurs.

import profilePhoto from "@/assets/profile.webp";

export type Lang = "fr" | "en";

export const profile = {
  name: "Marc Floris ANDRINIAINA",
  firstName: "Marc",
  email: "marcandriniaina9@gmail.com",
  phones: ["+261 34 05 592 64", "+261 32 41 367 71"],
  whatsapp: "261340559264",
  linkedin: "https://www.linkedin.com/in/marc-andriniaina-53126826b",
  // Ajoute ton lien GitHub ici, il apparaîtra automatiquement dans le site
  github: "",
  cv: "/cv-marc-floris-andriniaina.pdf",
  photo: profilePhoto,
  stack: ["React", "React Native", "Next.js", "Node.js", "NestJS", "PostgreSQL"],
};

export type Project = {
  id: string;
  name: string;
  kind: Record<Lang, string>;
  platforms: Record<Lang, string>;
  context: Record<Lang, string>;
  role: Record<Lang, string>;
  description: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  tech: string[];
  url?: string;
  image?: string;
  fullImage?: string;
  mobile?: boolean;
  featured?: boolean;
};

const teamRole = {
  fr: "Développeur fullstack en équipe : tickets frontend, backend et mobile",
  en: "Fullstack developer in a team: frontend, backend and mobile tickets",
};

export const projects: Project[] = [
  {
    id: "ticket-ci",
    name: "ticket.ci",
    kind: { fr: "Billetterie événementielle", en: "Event ticketing" },
    platforms: { fr: "Web · iOS · Android", en: "Web · iOS · Android" },
    context: { fr: "Freelance · en production", en: "Freelance · in production" },
    role: teamRole,
    description: {
      fr: "Plateforme de billetterie pour la Côte d’Ivoire, avec trois espaces : acheteur, organisateur (création et suivi des ventes) et agent terrain (vente et scan des billets).",
      en: "Ticketing platform for Côte d’Ivoire with three spaces: buyer, organizer (event creation and sales tracking) and field agent (ticket sales and scanning).",
    },
    highlights: {
      fr: [
        "Paiement mobile par Wave et Orange Money",
        "Contrôle des billets par QR code à l’entrée",
        "Mises à jour en temps réel avec Socket.IO",
      ],
      en: [
        "Mobile payments with Wave and Orange Money",
        "QR code ticket checks at the entrance",
        "Real-time updates with Socket.IO",
      ],
    },
    tech: ["React", "React Native (Expo)", "Express", "PostgreSQL", "Socket.IO"],
    url: "https://ticket.ci",
    image: "/images/ticket-ci-cover.webp",
    fullImage: "/images/ticket-ci-full.webp",
    featured: true,
  },
  {
    id: "ate-connect",
    name: "ATE Connect",
    kind: { fr: "Transport scolaire", en: "School transport" },
    platforms: { fr: "Admin web · 2 apps mobiles", en: "Web admin · 2 mobile apps" },
    context: { fr: "Freelance · en production", en: "Freelance · in production" },
    role: teamRole,
    description: {
      fr: "Gestion des missions, des chauffeurs, des familles et des véhicules, avec suivi GPS en temps réel.",
      en: "Management of trips, drivers, families and vehicles, with real-time GPS tracking.",
    },
    highlights: {
      fr: [
        "Deux applications (chauffeur et famille) publiées sur l’App Store et Google Play",
        "Suivi GPS en temps réel avec PostGIS et Socket.IO",
        "Déploiement avec Docker Swarm",
      ],
      en: [
        "Two apps (driver and family) published on the App Store and Google Play",
        "Real-time GPS tracking with PostGIS and Socket.IO",
        "Deployed with Docker Swarm",
      ],
    },
    tech: ["React", "React Native (Expo)", "Express", "PostgreSQL / PostGIS", "Socket.IO", "Docker Swarm"],
    image: "/images/ate-connect.webp",
    mobile: true,
    featured: true,
  },
  {
    id: "lebonplan-ci",
    name: "Toutici Market / lebonplan.ci",
    kind: { fr: "Marketplace", en: "Marketplace" },
    platforms: { fr: "Web · admin · mobile", en: "Web · admin · mobile" },
    context: { fr: "Freelance · en production", en: "Freelance · in production" },
    role: teamRole,
    description: {
      fr: "Plateforme de petites annonces pour la Côte d’Ivoire, avec des attributs dynamiques selon la catégorie.",
      en: "Classified ads platform for Côte d’Ivoire, with dynamic attributes per category.",
    },
    highlights: {
      fr: [
        "Messagerie et notifications en temps réel",
        "Attributs d’annonce dynamiques par catégorie",
        "Applications publiées sur l’App Store et Google Play",
      ],
      en: [
        "Real-time messaging and notifications",
        "Dynamic listing attributes per category",
        "Apps published on the App Store and Google Play",
      ],
    },
    tech: ["NestJS", "React", "React Native (Expo)"],
    url: "https://lebonplan.ci",
    image: "/images/lebonplan-ci-cover.webp",
    fullImage: "/images/lebonplan-ci-full.webp",
    featured: true,
  },
  {
    id: "costm",
    name: "COSTM",
    kind: { fr: "Parc informatique & formations", en: "IT assets & training" },
    platforms: { fr: "Application web", en: "Web application" },
    context: { fr: "Stage · 2025", en: "Internship · 2025" },
    role: {
      fr: "Conception et développement de l’application",
      en: "Design and development of the application",
    },
    description: {
      fr: "Application de gestion du parc informatique et de suivi des formations pour le Centre d’Orientation du Système et de Technologie Moderne.",
      en: "IT asset management and training tracking application for the Centre d’Orientation du Système et de Technologie Moderne.",
    },
    highlights: {
      fr: [
        "Gestion des équipements et de leur maintenance",
        "Planification et suivi des formations",
        "Gestion des utilisateurs avec contrôle d’accès",
      ],
      en: [
        "Equipment and maintenance management",
        "Training planning and tracking",
        "User management with access control",
      ],
    },
    tech: ["Next.js"],
    image: "/images/costm-cover.webp",
    fullImage: "/images/costm-full.webp",
  },
  {
    id: "dren",
    name: "DREN Atsimo-Andrefana",
    kind: { fr: "Affectation des enseignants", en: "Teacher assignments" },
    platforms: { fr: "Application web", en: "Web application" },
    context: { fr: "Stage · 2023", en: "Internship · 2023" },
    role: {
      fr: "Conception et développement de l’application",
      en: "Design and development of the application",
    },
    description: {
      fr: "Application de gestion des affectations des enseignants pour la Direction régionale de l’Éducation nationale.",
      en: "Teacher assignment management application for the Regional Directorate of National Education.",
    },
    highlights: {
      fr: ["Suivi des affectations des enseignants", "Comptes utilisateurs et authentification"],
      en: ["Teacher assignment tracking", "User accounts and authentication"],
    },
    tech: ["React"],
    image: "/images/dren-cover.webp",
  },
  {
    id: "drsp",
    name: "DRSP Atsimo-Andrefana",
    kind: { fr: "Parc informatique", en: "IT asset management" },
    platforms: { fr: "Application web", en: "Web application" },
    context: { fr: "Stage · 2022", en: "Internship · 2022" },
    role: {
      fr: "Conception et développement de l’application",
      en: "Design and development of the application",
    },
    description: {
      fr: "Application de gestion du parc informatique pour la Direction régionale de la Santé publique.",
      en: "IT asset management application for the Regional Directorate of Public Health.",
    },
    highlights: { fr: [], en: [] },
    tech: ["PHP"],
  },
];

export const experiences = [
  {
    period: { fr: "Janv. 2026 – aujourd’hui", en: "Jan 2026 – present" },
    type: { fr: "Freelance", en: "Freelance" },
    title: { fr: "Développeur fullstack freelance", en: "Freelance fullstack developer" },
    org: {
      fr: "Équipe de développement encadrée par un lead technique",
      en: "Development team led by a tech lead",
    },
    text: {
      fr: "Réalisation de tickets Jira frontend, backend et mobile attribués par le lead technique, sur des plateformes en production : ticket.ci, ATE Connect et Toutici Market / lebonplan.ci.",
      en: "Delivering frontend, backend and mobile Jira tickets assigned by the tech lead on production platforms: ticket.ci, ATE Connect and Toutici Market / lebonplan.ci.",
    },
    tech: ["Next.js", "NestJS", "React Native"],
  },
  {
    period: { fr: "Juin – oct. 2025", en: "Jun – Oct 2025" },
    type: { fr: "Stage", en: "Internship" },
    title: { fr: "Développeur web fullstack", en: "Fullstack web developer" },
    org: {
      fr: "Centre d’Orientation du Système et de Technologie Moderne",
      en: "Centre d’Orientation du Système et de Technologie Moderne",
    },
    text: {
      fr: "Conception et développement d’une application web de gestion du parc informatique et de suivi des formations.",
      en: "Designed and built a web application for IT asset management and training tracking.",
    },
    tech: ["Next.js"],
  },
  {
    period: { fr: "Sept. – nov. 2023", en: "Sep – Nov 2023" },
    type: { fr: "Stage", en: "Internship" },
    title: { fr: "Développeur web", en: "Web developer" },
    org: {
      fr: "Direction régionale de l’Éducation nationale (DREN) Atsimo-Andrefana",
      en: "Regional Directorate of National Education (DREN) Atsimo-Andrefana",
    },
    text: {
      fr: "Conception et développement d’une application web de gestion des affectations des enseignants.",
      en: "Designed and built a web application for managing teacher assignments.",
    },
    tech: ["React"],
  },
  {
    period: { fr: "Sept. – nov. 2022", en: "Sep – Nov 2022" },
    type: { fr: "Stage", en: "Internship" },
    title: { fr: "Développeur web", en: "Web developer" },
    org: {
      fr: "Direction régionale de la Santé publique (DRSP) Atsimo-Andrefana",
      en: "Regional Directorate of Public Health (DRSP) Atsimo-Andrefana",
    },
    text: {
      fr: "Conception et développement d’une application web de gestion du parc informatique.",
      en: "Designed and built a web application for IT asset management.",
    },
    tech: ["PHP"],
  },
];

export const education = [
  {
    year: "2025",
    title: {
      fr: "Master professionnel en informatique générale (M2)",
      en: "Professional Master’s degree in Computer Science (M2)",
    },
    school: "École Nationale d’Informatique (ENI) — Université de Fianarantsoa, Toliara",
  },
  {
    year: "2023",
    title: {
      fr: "Licence professionnelle en informatique générale",
      en: "Professional Bachelor’s degree in Computer Science",
    },
    school: "École Nationale d’Informatique (ENI) — Université de Fianarantsoa, Toliara",
  },
  {
    year: "2019",
    title: { fr: "Baccalauréat série D", en: "Baccalaureate, Science (série D)" },
    school: "Institution Père Barré, Toliara",
  },
];

export const skills: { group: Record<Lang, string>; items: string[] }[] = [
  { group: { fr: "Langages", en: "Languages" }, items: ["TypeScript", "JavaScript", "PHP", "Java", "C"] },
  {
    group: { fr: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "HeroUI", "Zustand"],
  },
  { group: { fr: "Mobile", en: "Mobile" }, items: ["React Native", "Expo"] },
  {
    group: { fr: "Backend", en: "Backend" },
    items: ["Node.js", "NestJS", "Express", "Bun / Hono", "tRPC", "Better Auth", "Zod", "Socket.IO"],
  },
  {
    group: { fr: "Données", en: "Data" },
    items: ["PostgreSQL", "PostGIS", "Redis", "MySQL", "MongoDB", "Neon"],
  },
  {
    group: { fr: "Méthodes & outils", en: "Methods & tools" },
    items: ["Agile", "Sprints", "Merise", "Git", "Jira", "Docker", "Linux"],
  },
];

export const t = {
  nav: {
    about: { fr: "À propos", en: "About" },
    projects: { fr: "Projets", en: "Projects" },
    experience: { fr: "Parcours", en: "Experience" },
    skills: { fr: "Compétences", en: "Skills" },
    contact: { fr: "Contact", en: "Contact" },
  },
  hero: {
    available: { fr: "Disponible pour des missions freelance", en: "Available for freelance work" },
    title: { fr: "Développeur Fullstack JavaScript", en: "Fullstack JavaScript Developer" },
    subtitle: { fr: "Web & Mobile", en: "Web & Mobile" },
    pitch: {
      fr: "Je construis des applications web et mobiles en production : billetterie, transport scolaire avec suivi GPS, marketplace. Je travaille côté frontend, backend et mobile.",
      en: "I build web and mobile applications that run in production: ticketing, school transport with GPS tracking, a marketplace. I work across frontend, backend and mobile.",
    },
    ctaProjects: { fr: "Voir mes projets", en: "See my work" },
    ctaCv: { fr: "Télécharger le CV", en: "Download CV" },
    ctaContact: { fr: "Me contacter", en: "Contact me" },
    location: { fr: "Toliara, Madagascar · disponible à distance", en: "Toliara, Madagascar · available remotely" },
  },
  stats: [
    { value: "3", label: { fr: "plateformes en production", en: "platforms in production" } },
    { value: "4", label: { fr: "apps mobiles iOS & Android", en: "iOS & Android mobile apps" } },
    { value: "M2", label: { fr: "Master en informatique", en: "Master’s in Computer Science" } },
  ],
  about: {
    kicker: { fr: "À propos", en: "About" },
    title: { fr: "Un développeur qui livre en équipe", en: "A developer who ships with a team" },
    p1: {
      fr: "Développeur fullstack freelance depuis janvier 2026, je travaille en équipe, sous la direction d’un lead technique, sur des plateformes utilisées tous les jours en Côte d’Ivoire. J’y prends des tickets frontend, backend et mobile, principalement avec Next.js, NestJS et React Native.",
      en: "A freelance fullstack developer since January 2026, I work in a team led by a tech lead on platforms used daily in Côte d’Ivoire. I take frontend, backend and mobile tickets, mainly with Next.js, NestJS and React Native.",
    },
    p2: {
      fr: "Titulaire d’un Master professionnel en informatique générale de l’ENI, j’ai auparavant réalisé trois stages durant lesquels j’ai conçu et développé des applications web de gestion pour des administrations et un centre de formation.",
      en: "I hold a Professional Master’s degree in Computer Science from ENI, and before that completed three internships where I designed and built management web applications for public administrations and a training centre.",
    },
    facts: {
      location: { fr: "Localisation", en: "Location" },
      locationValue: { fr: "Toliara (Tuléar), Madagascar", en: "Toliara (Tuléar), Madagascar" },
      birth: { fr: "Date de naissance", en: "Date of birth" },
      birthValue: { fr: "7 janvier 2001", en: "January 7, 2001" },
      languages: { fr: "Langues", en: "Languages" },
      languagesValue: {
        fr: "Malgache (maternelle) · Français (courant) · Anglais (intermédiaire)",
        en: "Malagasy (native) · French (fluent) · English (intermediate)",
      },
      softSkills: { fr: "Savoir-être", en: "Soft skills" },
      softSkillsValue: {
        fr: "Communication · Organisation · Travail en équipe",
        en: "Communication · Organisation · Teamwork",
      },
      interests: { fr: "Centres d’intérêt", en: "Interests" },
      interestsValue: { fr: "Lecture · Musique · Cinéma", en: "Reading · Music · Cinema" },
    },
  },
  projects: {
    kicker: { fr: "Réalisations", en: "Work" },
    title: { fr: "Projets sélectionnés", en: "Selected projects" },
    intro: {
      fr: "Trois plateformes en production sur lesquelles je travaille en freelance, et les applications conçues pendant mes stages.",
      en: "Three production platforms I work on as a freelancer, and the applications I built during my internships.",
    },
    role: { fr: "Rôle", en: "Role" },
    visit: { fr: "Voir le site", en: "Visit site" },
    fullPage: { fr: "Voir la page entière", en: "View full page" },
    close: { fr: "Fermer", en: "Close" },
    internships: { fr: "Projets de stage", en: "Internship projects" },
    noImage: { fr: "Capture à venir", en: "Screenshot coming soon" },
  },
  experience: {
    kicker: { fr: "Parcours", en: "Experience" },
    title: { fr: "Expérience & formation", en: "Experience & education" },
    work: { fr: "Expérience", en: "Experience" },
    education: { fr: "Formation", en: "Education" },
  },
  skills: {
    kicker: { fr: "Compétences", en: "Skills" },
    title: { fr: "Ma boîte à outils", en: "My toolbox" },
    intro: {
      fr: "TypeScript de bout en bout : interface web, application mobile, API et base de données.",
      en: "TypeScript end to end: web interface, mobile app, API and database.",
    },
  },
  contact: {
    kicker: { fr: "Contact", en: "Contact" },
    title: { fr: "Un projet ? Parlons-en.", en: "Have a project? Let’s talk." },
    text: {
      fr: "Je suis disponible pour des missions freelance, en équipe ou en autonomie, à distance. Réponse rapide par email ou WhatsApp.",
      en: "I’m available for freelance work, in a team or on my own, remotely. Quick replies by email or WhatsApp.",
    },
    email: { fr: "Email", en: "Email" },
    phone: { fr: "Téléphone", en: "Phone" },
    copy: { fr: "Copier", en: "Copy" },
    copied: { fr: "Copié !", en: "Copied!" },
    whatsapp: { fr: "Écrire sur WhatsApp", en: "Message on WhatsApp" },
  },
  footer: {
    built: { fr: "Conçu et développé avec Next.js et Tailwind CSS.", en: "Designed and built with Next.js and Tailwind CSS." },
    top: { fr: "Haut de page", en: "Back to top" },
  },
  ui: {
    logo: { fr: "Ingénieur en informatique", en: "Computer Engineer" },
    theme: { fr: "Thème", en: "Theme" },
    light: { fr: "Clair", en: "Light" },
    dark: { fr: "Sombre", en: "Dark" },
    langLabel: { fr: "Langue", en: "Language" },
    menu: { fr: "Menu", en: "Menu" },
  },
};
