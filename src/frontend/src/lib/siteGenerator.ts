export interface SiteFeature {
  icon: string;
  title: string;
  description: string;
}

export interface SiteContent {
  title: string;
  tagline: string;
  heroText: string;
  ctaLabel: string;
  features: SiteFeature[];
  aboutText: string;
  sections: string[];
  navLinks: string[];
  footerText: string;
  galleryLabels: string[];
}

type IndustryKey =
  | "bakery"
  | "restaurant"
  | "portfolio"
  | "photographer"
  | "agency"
  | "gym"
  | "spa"
  | "tech"
  | "startup"
  | "shop"
  | "blog"
  | "default";

const industryMap: Record<IndustryKey, SiteContent> = {
  bakery: {
    title: "Artisan Bakehouse",
    tagline: "Fresh Baked Goods Every Single Day",
    heroText:
      "Handcrafted with love since 1994. Every loaf, every pastry, every bite — made from scratch using time-honored recipes and the finest local ingredients.",
    ctaLabel: "Explore Our Menu",
    features: [
      {
        icon: "🥖",
        title: "Sourdough Breads",
        description:
          "48-hour cold-fermented loaves with that perfect crust and open crumb.",
      },
      {
        icon: "🥐",
        title: "French Pastries",
        description:
          "Buttery croissants, pain au chocolat, and seasonal fruit tarts.",
      },
      {
        icon: "🎂",
        title: "Custom Cakes",
        description:
          "Wedding cakes, birthday creations, and bespoke celebration confections.",
      },
    ],
    aboutText:
      "We opened our doors in a small corner shop with nothing but a 50-year-old family recipe book and an obsession with getting it right. Today we bake over 200 items daily, but every piece still gets the same attention it did on day one.",
    sections: ["hero", "features", "about", "gallery", "contact"],
    navLinks: ["Menu", "Our Story", "Custom Orders", "Find Us"],
    footerText: "Baked fresh daily. Open 7am–6pm.",
    galleryLabels: [
      "Sourdough",
      "Croissants",
      "Celebration Cake",
      "Pastry Case",
      "Morning Buns",
      "Rye Loaf",
    ],
  },
  restaurant: {
    title: "Table & Terroir",
    tagline: "Farm-to-Table Dining Reimagined",
    heroText:
      "Seasonal menus crafted from hyper-local farms within 50 miles. Every dish tells the story of the land it came from.",
    ctaLabel: "Reserve a Table",
    features: [
      {
        icon: "🌿",
        title: "Seasonal Menus",
        description:
          "Our menu changes weekly to reflect what's at peak ripeness.",
      },
      {
        icon: "🍷",
        title: "Natural Wines",
        description:
          "A curated list of biodynamic and natural wines from small producers.",
      },
      {
        icon: "👨‍🍳",
        title: "Chef's Table",
        description:
          "An intimate 8-seat experience at the pass with a 12-course tasting menu.",
      },
    ],
    aboutText:
      "Chef Marisol Vega trained in Lyon and spent five years sourcing ingredients across three continents before returning home to open Table & Terroir. The restaurant has been recognized by Michelin for sustainable practices.",
    sections: ["hero", "features", "about", "gallery", "contact"],
    navLinks: ["Menu", "Reservations", "Events", "About"],
    footerText: "Dinner service Wed–Sun from 6pm.",
    galleryLabels: [
      "Amuse-Bouche",
      "Main Course",
      "Dessert",
      "Wine Cellar",
      "Chef's Table",
      "Garden View",
    ],
  },
  photographer: {
    title: "Light & Frame Studio",
    tagline: "Photographs That Last a Lifetime",
    heroText:
      "Visual storytelling through documentary portraits, editorial fashion, and commercial imagery. Every frame is a deliberate choice.",
    ctaLabel: "View Portfolio",
    features: [
      {
        icon: "📸",
        title: "Portrait Sessions",
        description:
          "Environmental and studio portraits that reveal authentic character.",
      },
      {
        icon: "💒",
        title: "Wedding Photography",
        description:
          "Full-day coverage with a photojournalistic editorial eye.",
      },
      {
        icon: "🏢",
        title: "Commercial & Brand",
        description: "Product, lifestyle, and campaign photography for brands.",
      },
    ],
    aboutText:
      "Based in New York City, I've spent the last decade photographing people and products across 30 countries. My work has appeared in Vogue, The New York Times, and on the walls of galleries from Paris to Tokyo.",
    sections: ["hero", "gallery", "features", "about", "contact"],
    navLinks: ["Portfolio", "Services", "About", "Contact"],
    footerText: "Available worldwide for commissioned work.",
    galleryLabels: [
      "Portrait",
      "Editorial",
      "Wedding",
      "Commercial",
      "Street",
      "Studio",
    ],
  },
  portfolio: {
    title: "Kieran Osei — Design & Code",
    tagline: "Turning Complex Problems Into Elegant Interfaces",
    heroText:
      "Product designer and frontend engineer with 8 years crafting digital experiences for startups and Fortune 500s. Currently open for freelance.",
    ctaLabel: "See My Work",
    features: [
      {
        icon: "🎨",
        title: "UI/UX Design",
        description: "Figma-to-production design systems and product flows.",
      },
      {
        icon: "⚡",
        title: "Frontend Development",
        description: "React, TypeScript, and modern CSS at production quality.",
      },
      {
        icon: "📐",
        title: "Brand Identity",
        description:
          "Logo systems, typography, and visual language for new ventures.",
      },
    ],
    aboutText:
      "I grew up drawing interfaces on graph paper before computers were cool. Studied HCI at Carnegie Mellon, worked at Google and Figma, and now I help ambitious startups ship products their users actually love.",
    sections: ["hero", "features", "gallery", "about", "contact"],
    navLinks: ["Work", "Services", "About", "Contact"],
    footerText: "Available for new projects starting Q2.",
    galleryLabels: [
      "SaaS Dashboard",
      "Mobile App",
      "Brand System",
      "E-commerce",
      "Design System",
      "Landing Page",
    ],
  },
  agency: {
    title: "Meridian Creative Agency",
    tagline: "Strategy + Story + Craft",
    heroText:
      "We build brands that people remember and campaigns that move markets. From brand strategy to execution — under one roof.",
    ctaLabel: "Start a Project",
    features: [
      {
        icon: "🧠",
        title: "Brand Strategy",
        description:
          "Positioning, messaging architecture, and competitive differentiation.",
      },
      {
        icon: "✏️",
        title: "Creative Production",
        description: "Copy, design, motion, and content at campaign scale.",
      },
      {
        icon: "📊",
        title: "Growth Marketing",
        description: "Performance campaigns that compound over time.",
      },
    ],
    aboutText:
      "Founded in 2012, Meridian has grown from a two-person shop to a 45-person creative powerhouse. We've launched over 300 brands and campaigns that collectively generated $2B in attributable revenue for clients.",
    sections: ["hero", "features", "about", "gallery", "contact"],
    navLinks: ["Work", "Services", "About", "Careers"],
    footerText: "New York · London · Singapore",
    galleryLabels: [
      "Brand Identity",
      "Campaign",
      "Digital",
      "Packaging",
      "Environmental",
      "Social",
    ],
  },
  gym: {
    title: "APEX Performance",
    tagline: "Train Without Limits",
    heroText:
      "Elite-level coaching, competition-grade equipment, and a community that pushes you past what you thought was possible.",
    ctaLabel: "Start Training",
    features: [
      {
        icon: "🏋️",
        title: "Personal Training",
        description:
          "1-on-1 coaching tailored to your specific goals and body.",
      },
      {
        icon: "🤸",
        title: "Group Classes",
        description: "HIIT, yoga, boxing, and strength classes 7 days a week.",
      },
      {
        icon: "🥗",
        title: "Nutrition Planning",
        description:
          "Evidence-based nutrition plans designed by sports dietitians.",
      },
    ],
    aboutText:
      "APEX was founded by Olympic coach Marcus Theron after watching too many talented athletes train in under-equipped facilities. We invested everything into building the facility we wish had existed.",
    sections: ["hero", "features", "about", "contact"],
    navLinks: ["Classes", "Membership", "Trainers", "About"],
    footerText: "Open 5am–11pm, 7 days a week.",
    galleryLabels: [
      "Weight Floor",
      "Group Class",
      "Boxing Ring",
      "Recovery",
      "Turf Zone",
      "Locker Room",
    ],
  },
  spa: {
    title: "Serenara Wellness Spa",
    tagline: "Restore. Renew. Radiate.",
    heroText:
      "A sanctuary of calm in the heart of the city. Ancient healing traditions meet modern science in our award-winning treatment rooms.",
    ctaLabel: "Book Your Visit",
    features: [
      {
        icon: "💆",
        title: "Therapeutic Massage",
        description:
          "Deep tissue, hot stone, and customized therapeutic sessions.",
      },
      {
        icon: "🌸",
        title: "Facial Treatments",
        description:
          "Medical-grade facials and skin therapy with premium botanicals.",
      },
      {
        icon: "🛁",
        title: "Bathing Rituals",
        description:
          "Private thermal pools, sauna, and float tank experiences.",
      },
    ],
    aboutText:
      "Serenara was born from a belief that wellness should be accessible without sacrificing quality. Our team of certified therapists averages 12 years of experience, and every product we use is sustainably sourced.",
    sections: ["hero", "features", "about", "gallery", "contact"],
    navLinks: ["Treatments", "Packages", "Gift Cards", "About"],
    footerText: "Voted Best Spa 3 years running by City Magazine.",
    galleryLabels: [
      "Treatment Room",
      "Thermal Pool",
      "Relaxation Lounge",
      "Products",
      "Sauna",
      "Couples Suite",
    ],
  },
  tech: {
    title: "NeuralForge AI",
    tagline: "Intelligence, Engineered from First Principles",
    heroText:
      "We build the AI infrastructure that powers the next generation of intelligent applications. From model serving to orchestration — at scale.",
    ctaLabel: "Get Early Access",
    features: [
      {
        icon: "⚡",
        title: "Sub-10ms Inference",
        description:
          "Optimized serving infrastructure with global edge deployment.",
      },
      {
        icon: "🔒",
        title: "Private by Design",
        description: "On-premise, VPC, and confidential compute options.",
      },
      {
        icon: "🔗",
        title: "Universal API",
        description:
          "One SDK. Every frontier model. Switch providers in one line.",
      },
    ],
    aboutText:
      "Founded by researchers from DeepMind and MIT, NeuralForge started with the conviction that enterprise AI deserved better infrastructure. We've raised $45M to build it.",
    sections: ["hero", "features", "about", "contact"],
    navLinks: ["Product", "Docs", "Pricing", "Blog"],
    footerText: "SOC2 Type II · HIPAA · ISO 27001",
    galleryLabels: [
      "Dashboard",
      "API Explorer",
      "Analytics",
      "Model Hub",
      "Monitoring",
      "Deployments",
    ],
  },
  startup: {
    title: "Velox",
    tagline: "Move Fast. Ship Smarter.",
    heroText:
      "The all-in-one platform that gives your team a single source of truth for product decisions, sprint velocity, and customer insights.",
    ctaLabel: "Start Free Trial",
    features: [
      {
        icon: "🗺️",
        title: "Unified Roadmap",
        description: "Connect OKRs, epics, and sprints in one living document.",
      },
      {
        icon: "📈",
        title: "Velocity Analytics",
        description:
          "Predict delivery dates with 90% accuracy using your own data.",
      },
      {
        icon: "💬",
        title: "Customer Signal",
        description:
          "Surface what users actually want from support, NPS, and reviews.",
      },
    ],
    aboutText:
      "Velox grew out of frustration with disconnected tools causing misalignment between engineering, product, and business. We've been through YC, raised a $12M Seed, and have 2,400 teams on the platform.",
    sections: ["hero", "features", "about", "contact"],
    navLinks: ["Features", "Pricing", "Customers", "Blog"],
    footerText: "Trusted by 2,400+ product teams worldwide.",
    galleryLabels: [
      "Dashboard",
      "Roadmap View",
      "Sprint Board",
      "Analytics",
      "Integrations",
      "Mobile",
    ],
  },
  shop: {
    title: "Provenance Supply Co.",
    tagline: "Goods Made to Endure",
    heroText:
      "We source the world for objects designed with integrity — tools, textiles, and everyday goods that reward daily use.",
    ctaLabel: "Shop the Collection",
    features: [
      {
        icon: "🎁",
        title: "Curated Selection",
        description:
          "Every product hand-tested and backed by our 30-day guarantee.",
      },
      {
        icon: "🌍",
        title: "Ethical Sourcing",
        description: "Direct relationships with makers in 22 countries.",
      },
      {
        icon: "📦",
        title: "Carbon-Neutral Shipping",
        description:
          "Fully compostable packaging and offset delivery on every order.",
      },
    ],
    aboutText:
      "Provenance was started in a San Francisco apartment after founder Jess Tam grew tired of cheap goods that broke in months. Today we carry 400+ products and partner directly with 80 makers worldwide.",
    sections: ["hero", "features", "gallery", "about", "contact"],
    navLinks: ["Shop", "Journal", "Makers", "About"],
    footerText: "Free returns. Free shipping over $75.",
    galleryLabels: [
      "Ceramics",
      "Leather Goods",
      "Kitchen",
      "Textiles",
      "Stationery",
      "Outdoor",
    ],
  },
  blog: {
    title: "Gradient Thoughts",
    tagline: "Long-form thinking on design, tech, and culture.",
    heroText:
      "Weekly essays at the intersection of technology, design, and what it means to build things that matter.",
    ctaLabel: "Read Latest",
    features: [
      {
        icon: "✍️",
        title: "Weekly Essays",
        description: "In-depth pieces every Monday on design and technology.",
      },
      {
        icon: "🎙️",
        title: "Conversations",
        description:
          "Interviews with founders, designers, and creative thinkers.",
      },
      {
        icon: "📚",
        title: "Reading Lists",
        description: "Curated links and book recommendations every Friday.",
      },
    ],
    aboutText:
      "Gradient Thoughts is written by Priya Nair, a former product designer turned writer based in Bangalore. The newsletter has 45,000 subscribers across 90 countries.",
    sections: ["hero", "features", "about", "contact"],
    navLinks: ["Essays", "Interviews", "Newsletter", "About"],
    footerText: "45,000 readers. No ads. Ever.",
    galleryLabels: [
      "Featured Essay",
      "Latest Post",
      "Interview",
      "Reading List",
      "Archive",
      "Newsletter",
    ],
  },
  default: {
    title: "Vertex Studio",
    tagline: "Where Vision Becomes Reality",
    heroText:
      "A premium creative studio delivering exceptional work across design, strategy, and digital experiences.",
    ctaLabel: "Get Started",
    features: [
      {
        icon: "🌟",
        title: "Premium Quality",
        description:
          "Uncompromising craft and attention to detail in everything we create.",
      },
      {
        icon: "🚀",
        title: "Fast Delivery",
        description:
          "Agile workflows that move quickly without cutting corners.",
      },
      {
        icon: "🤝",
        title: "True Partnership",
        description:
          "We become deeply invested in your success, not just the deliverable.",
      },
    ],
    aboutText:
      "Vertex was founded on a simple idea: the best creative work happens when talented people are given clear briefs and real trust. We've built a team that thrives in that environment.",
    sections: ["hero", "features", "about", "contact"],
    navLinks: ["Work", "Services", "Team", "Contact"],
    footerText: "Let's build something extraordinary together.",
    galleryLabels: [
      "Project 1",
      "Project 2",
      "Project 3",
      "Project 4",
      "Project 5",
      "Project 6",
    ],
  },
};

function detectIndustry(prompt: string): IndustryKey {
  const p = prompt.toLowerCase();
  if (p.includes("bak")) return "bakery";
  if (
    p.includes("restaurant") ||
    p.includes("dining") ||
    p.includes("food") ||
    p.includes("cafe") ||
    p.includes("bistro")
  )
    return "restaurant";
  if (
    p.includes("photographer") ||
    p.includes("photography") ||
    p.includes("photo studio")
  )
    return "photographer";
  if (
    p.includes("portfolio") ||
    p.includes("freelance") ||
    p.includes("designer") ||
    p.includes("developer")
  )
    return "portfolio";
  if (
    p.includes("agency") ||
    p.includes("creative agency") ||
    p.includes("marketing agency")
  )
    return "agency";
  if (
    p.includes("gym") ||
    p.includes("fitness") ||
    p.includes("workout") ||
    p.includes("training")
  )
    return "gym";
  if (
    p.includes("spa") ||
    p.includes("wellness") ||
    p.includes("massage") ||
    p.includes("beauty")
  )
    return "spa";
  if (
    p.includes("tech") ||
    p.includes("ai") ||
    p.includes("saas") ||
    p.includes("software")
  )
    return "tech";
  if (p.includes("startup") || p.includes("product") || p.includes("platform"))
    return "startup";
  if (
    p.includes("shop") ||
    p.includes("store") ||
    p.includes("ecommerce") ||
    p.includes("e-commerce")
  )
    return "shop";
  if (
    p.includes("blog") ||
    p.includes("newsletter") ||
    p.includes("journal") ||
    p.includes("writing")
  )
    return "blog";
  return "default";
}

export function generateSiteContent(
  prompt: string,
  _colorScheme: string,
  _layoutStyle: string,
): SiteContent {
  const industry = detectIndustry(prompt);
  const content = { ...industryMap[industry] };

  // Detect extra sections from prompt
  const p = prompt.toLowerCase();
  const extraSections: string[] = [];
  if (
    p.includes("gallery") ||
    p.includes("photos") ||
    p.includes("images") ||
    p.includes("portfolio")
  ) {
    if (!content.sections.includes("gallery")) extraSections.push("gallery");
  }
  if (p.includes("about") || p.includes("story") || p.includes("team")) {
    if (!content.sections.includes("about")) extraSections.push("about");
  }

  if (extraSections.length > 0) {
    const sections = [...content.sections];
    const contactIdx = sections.indexOf("contact");
    for (const s of extraSections) {
      if (contactIdx >= 0) {
        sections.splice(contactIdx, 0, s);
      } else {
        sections.push(s);
      }
    }
    content.sections = sections;
  }

  return content;
}

export const EXAMPLE_PROMPTS = [
  "a bakery website with a warm color scheme and rustic feel",
  "a portfolio for a photographer specializing in weddings",
  "a tech startup landing page with bold typography",
  "an elegant spa and wellness retreat website",
  "a creative agency with a dark, editorial aesthetic",
  "an e-commerce shop for handmade ceramics",
  "a gym and fitness studio with high energy vibes",
  "a minimal personal blog about design and technology",
];
