export const ingredients = [
  {
    key: "ginger",
    name: "Ginger",
    label: "Ginger Juice",
    image: "/images/formula/ingredient-ginger.png",
    description: "Warms the body and supports healthy circulation.",
  },
  {
    key: "garlic",
    name: "Garlic",
    label: "Garlic Juice",
    image: "/images/formula/ingredient-garlic.png",
    description: "A time-honoured root known to support heart wellness.",
  },
  {
    key: "lemon",
    name: "Lemon",
    label: "Lemon Juice",
    image: "/images/formula/ingredient-lemon.png",
    description: "Bright citrus that supports immunity and digestion.",
  },
  {
    key: "honey",
    name: "Honey",
    label: "Honey",
    image: "/images/formula/ingredient-honey.png",
    description: "Naturally soothing sweetness with antioxidant support.",
  },
  {
    key: "acv",
    name: "Apple Cider Vinegar",
    label: "Apple Cider Vinegar",
    image: "/images/formula/ingredient-acv.png",
    description: "A daily wellness staple for balance and vitality.",
  },
] as const;

export const heroTrustBadges = [
  { icon: "leaf", label: "100% Natural" },
  { icon: "slash", label: "No Added Sugars" },
  { icon: "droplet", label: "No Artificial Preservatives" },
] as const;

export const heroBenefits = [
  {
    icon: "heart",
    title: "Supports Heart Health",
    description: "Helps maintain a healthy heart and cardiovascular function.",
  },
  {
    icon: "droplet",
    title: "Promotes Healthy Circulation",
    description: "Supports healthy blood flow and improves circulation naturally.",
  },
  {
    icon: "shield",
    title: "Supports Immune Function",
    description: "Rich in antioxidants that help strengthen immunity.",
  },
  {
    icon: "activity",
    title: "Helps Maintain Healthy Blood Pressure",
    description: "May help support healthy blood pressure levels already within the normal range.",
  },
  {
    icon: "feather",
    title: "Detoxifies Naturally",
    description: "Helps cleanse the body by flushing out toxins and supporting liver health.",
  },
  {
    icon: "sun",
    title: "Supports Digestive Health",
    description: "Aids digestion and promotes a healthy gut naturally.",
  },
  {
    icon: "zap",
    title: "Boosts Energy and Vitality",
    description: "Helps reduce fatigue and supports natural energy levels.",
  },
] as const;

export const problems = [
  {
    key: "heart-wellness",
    title: "Heart Wellness",
    image: "/images/problems/problem-heart-wellness.jpg",
    icon: "heart",
  },
  {
    key: "healthy-circulation",
    title: "Healthy Circulation",
    image: "/images/problems/problem-healthy-circulation.jpg",
    icon: "droplet",
  },
  {
    key: "blood-pressure",
    title: "Blood Pressure Support",
    image: "/images/problems/problem-blood-pressure.jpg",
    icon: "heart",
  },
  {
    key: "daily-wellness",
    title: "Daily Wellness",
    image: "/images/problems/problem-daily-wellness.jpg",
    icon: "sun",
  },
  {
    key: "immune-support",
    title: "Immune Support",
    image: "/images/problems/problem-immune-support.jpg",
    icon: "shield",
  },
  {
    key: "healthy-lifestyle",
    title: "Healthy Lifestyle",
    image: "/images/problems/problem-healthy-lifestyle.jpg",
    icon: "feather",
  },
] as const;

export const whyChooseLeft = [
  { icon: "leaf", label: "100% Natural Ingredients" },
  { icon: "feather", label: "Herbal Formula" },
  { icon: "slash", label: "No Artificial Preservatives" },
  { icon: "droplet", label: "No Added Sugars" },
] as const;

export const whyChooseRight = [
  { icon: "heart", label: "Supports Heart Health" },
  { icon: "activity", label: "Promotes Healthy Circulation" },
  { icon: "shield", label: "Supports Immune Function" },
  { icon: "sun", label: "Daily Wellness Support" },
] as const;

export const formulaProcess = [
  { icon: "leaf", label: "Fresh Ingredients" },
  { icon: "filter", label: "Carefully Extracted" },
  { icon: "scale", label: "Balanced Formula" },
  { icon: "zap", label: "Daily Wellness" },
] as const;

export const howToUseSteps = [
  {
    icon: "shake",
    title: "Shake Well",
    description: "Gently shake the bottle before every use to blend the tonic.",
  },
  {
    icon: "mix",
    title: "Mix 1 tablespoon (15ml)",
    description: "Mix with ½ glass of drinking water.",
  },
  {
    icon: "daily",
    title: "Consume Once Daily",
    description: "Preferably before breakfast, as part of your everyday ritual.",
  },
] as const;

export const nutritionSnapshot = {
  servingSize: "15 ml",
  facts: [
    { label: "Energy", value: "15 kcal" },
    { label: "Total Carbohydrates", value: "4 g" },
    { label: "Total Sugars", value: "3 g" },
    { label: "Protein", value: "< 0.5 g" },
    { label: "Fat", value: "0 g" },
  ],
} as const;

export const testimonials = [
  {
    name: "Adeel",
    age: 42,
    photo: "/images/testimonials/testimonial-1.jpg",
    rating: 5,
    quote:
      "Hayat+ has become a part of my daily routine. I feel more active, my digestion is better and my energy levels have improved naturally.",
  },
  {
    name: "Amina",
    age: 35,
    photo: "/images/testimonials/testimonial-2.jpg",
    rating: 5,
    quote:
      "Simple, natural, and it just feels right. It's the one wellness habit I've actually stuck with.",
  },
  {
    name: "Farhan",
    age: 29,
    photo: "/images/testimonials/testimonial-3.jpg",
    rating: 5,
    quote:
      "I appreciate how clean the formula is. Five ingredients, no clutter, no compromises.",
  },
] as const;

export const faqs = [
  {
    question: "What is Hayat+ Heart Tonic made of?",
    answer:
      "Hayat+ Heart Tonic is a herbal blend of Ginger, Garlic, Lemon, Honey and Apple Cider Vinegar — five carefully sourced botanicals and nothing else.",
  },
  {
    question: "How do I take Hayat+?",
    answer:
      "Shake well, mix one tablespoon (15ml) with half a glass of drinking water, and consume once daily, preferably before breakfast.",
  },
  {
    question: "Is Hayat+ suitable for daily use?",
    answer:
      "Yes. Hayat+ is formulated as a gentle, natural addition to your everyday wellness routine.",
  },
  {
    question: "Does Hayat+ contain artificial preservatives?",
    answer:
      "No. Hayat+ is made without artificial preservatives, colours, flavours, or added sugars.",
  },
  {
    question: "How should I store the bottle?",
    answer:
      "Store in a cool, dry place away from direct sunlight. Refrigerate after opening for best freshness.",
  },
] as const;

export const product = {
  slug: "heart-tonic",
  name: "Hayat+ Heart Tonic",
  tagline: "Nature's Daily Support for a Healthy Heart",
  description:
    "Hayat+ Heart Tonic is a carefully crafted herbal blend made from Ginger, Garlic, Lemon, Honey and Apple Cider Vinegar to support heart health, healthy circulation, immune wellness and everyday vitality.",
  longDescription:
    "Made in small batches with quality ingredients and nothing more than necessary, Hayat+ Heart Tonic is a daily ritual rooted in five time-trusted botanicals. No fillers, no artificial preservatives — just a thoughtfully balanced blend crafted for consistent quality in every bottle.",
  image: "/images/hero/hero-product-ingredients.png",
} as const;

// TODO: replace with real pricing before launch (currency: PKR)
export const productSizes = [
  { id: "250ml", label: "250 ML", price: 1200 },
  { id: "500ml", label: "500 ML", price: 2200 },
] as const;

export type ProductSizeId = (typeof productSizes)[number]["id"];

export const paymentMethods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives at your doorstep.",
  },
  {
    id: "advance",
    label: "Advance Payment",
    description:
      "Pay via bank transfer and confirm your order with a screenshot on WhatsApp.",
  },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

// TODO: replace with real bank account details before launch
export const bankDetails = {
  bankName: "[Add Your Bank Name]",
  accountTitle: "[Add Account Title]",
  accountNumber: "[Add Account Number]",
  iban: "[Add IBAN — optional]",
} as const;

export const contactInfo = {
  whatsapp: "+92 309 3868046",
  email: "hayaatpluss@gmail.com",
  phone: "+92 309 3868046",
} as const;

export const socialLinks = [
  { key: "whatsapp", href: "https://wa.me/923093868046", label: "WhatsApp" },
  {
    key: "instagram",
    href: "https://www.instagram.com/hayaatpluss?igsh=MTUzanJtZDN5cG9pNg==",
    label: "Instagram",
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/share/1EpnCdyWQt/",
    label: "Facebook",
  },
  { key: "email", href: "mailto:hayaatpluss@gmail.com", label: "Email" },
  { key: "phone", href: "tel:+923093868046", label: "Phone" },
] as const;

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#benefits", label: "Benefits" },
  { href: "#how-to-use", label: "How to Use" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const footerLinks = {
  quickLinks: [
    { href: "#top", label: "Home" },
    { href: "#ingredients", label: "Ingredients" },
    { href: "#benefits", label: "Benefits" },
    { href: "#how-to-use", label: "How to Use" },
  ],
  company: [
    { href: "#about", label: "About Us" },
    { href: "#ingredients", label: "Our Formula" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ],
  support: [
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Shipping & Delivery" },
    { href: "#contact", label: "Returns & Refunds" },
    { href: "#contact", label: "Privacy Policy" },
  ],
} as const;
