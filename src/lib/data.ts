export const ingredients = [
  {
    key: "ginger",
    name: "Ginger",
    description: "Warms the body and supports healthy circulation.",
  },
  {
    key: "garlic",
    name: "Garlic",
    description: "A time-honoured root known to support heart wellness.",
  },
  {
    key: "lemon",
    name: "Lemon",
    description: "Bright citrus that supports immunity and digestion.",
  },
  {
    key: "honey",
    name: "Honey",
    description: "Naturally soothing sweetness with antioxidant support.",
  },
  {
    key: "acv",
    name: "Apple Cider Vinegar",
    description: "A daily wellness staple for balance and vitality.",
  },
] as const;

export const benefits = [
  {
    icon: "heart",
    title: "Supports Heart Health",
    description: "Formulated to nurture everyday cardiovascular wellness.",
  },
  {
    icon: "activity",
    title: "Supports Healthy Circulation",
    description: "Encourages steady, healthy blood flow throughout the day.",
  },
  {
    icon: "shield",
    title: "Immune Support",
    description: "A blend of botanicals that help fortify natural defences.",
  },
  {
    icon: "leaf",
    title: "100% Natural Ingredients",
    description: "Nothing artificial — just five trusted botanicals.",
  },
  {
    icon: "droplet",
    title: "Herbal Formula",
    description: "Crafted using traditional herbal wisdom, refined for today.",
  },
  {
    icon: "check",
    title: "No Artificial Preservatives",
    description: "Clean, honest formulation from start to finish.",
  },
  {
    icon: "sunrise",
    title: "Daily Wellness",
    description: "A simple ritual designed to fit effortlessly into your day.",
  },
  {
    icon: "care",
    title: "Made with Care",
    description: "Small-batch crafted with attention to every detail.",
  },
] as const;

export const howToUseSteps = [
  {
    icon: "shake",
    title: "Shake Well",
    description: "Gently shake the bottle before every use to blend the tonic.",
  },
  {
    icon: "mix",
    title: "Mix with Water",
    description: "Mix one tablespoon with half a glass of drinking water.",
  },
  {
    icon: "daily",
    title: "Consume Daily",
    description: "Enjoy once daily as part of your everyday wellness ritual.",
  },
] as const;

export const nutritionFacts = [
  { label: "Ginger Extract", value: "Included" },
  { label: "Garlic Extract", value: "Included" },
  { label: "Lemon Extract", value: "Included" },
  { label: "Honey", value: "Included" },
  { label: "Apple Cider Vinegar", value: "Included" },
] as const;

export const testimonials = [
  {
    name: "Amina R.",
    role: "Daily user, 6 months",
    quote:
      "Hayat+ has become part of my morning ritual. Simple, natural, and it just feels right.",
  },
  {
    name: "Farhan K.",
    role: "Daily user, 1 year",
    quote:
      "I appreciate how clean the formula is. Five ingredients, no clutter, no compromises.",
  },
  {
    name: "Sana M.",
    role: "Daily user, 8 months",
    quote:
      "Elegant packaging, honest ingredients. It feels premium without being complicated.",
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
      "Shake well, mix one tablespoon with half a glass of drinking water, and consume once daily.",
  },
  {
    question: "Is Hayat+ suitable for daily use?",
    answer:
      "Yes. Hayat+ is formulated as a gentle, natural addition to your everyday wellness routine.",
  },
  {
    question: "Does Hayat+ contain artificial preservatives?",
    answer:
      "No. Hayat+ is made without artificial preservatives, colours, or flavours.",
  },
  {
    question: "How should I store the bottle?",
    answer:
      "Store in a cool, dry place away from direct sunlight. Refrigerate after opening for best freshness.",
  },
] as const;

export const contactInfo = {
  whatsapp: "+92 300 1234567",
  email: "care@hayatplus.com",
  phone: "+92 21 111 222 333",
} as const;

export const socialLinks = [
  { key: "instagram", href: "https://instagram.com/hayatplus", label: "Instagram" },
  { key: "facebook", href: "https://facebook.com/hayatplus", label: "Facebook" },
  { key: "twitter", href: "https://twitter.com/hayatplus", label: "Twitter" },
] as const;

export const navLinks = [
  { href: "#ingredients", label: "Ingredients" },
  { href: "#why-choose", label: "Benefits" },
  { href: "#how-to-use", label: "How to Use" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;
