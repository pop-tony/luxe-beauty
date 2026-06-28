export const products = [
  {
    id: 1,
    name: "32” Factory 13x4 Full Frontal SDD Burmese Curl",
    category: "Full Frontal Wigs",
    type: "Super Double Drawn",
    texture: "Burmese Curl",
    lace: "13x4 Full Frontal",
    length: "32 inches",
    density: "180%",
    featured: true,
    bestseller: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800"
    ],
    desc: "Premium Super Double Drawn Burmese curl with 13x4 full frontal. Full from root to tip with bouncy, defined curls.",

    // Length variants with different prices
    variants: [
      { length: "18\"", price: 1400, stock: 5 },
      { length: "20\"", price: 1500, stock: 8 },
      { length: "22\"", price: 1600, stock: 6 },
      { length: "24\"", price: 1800, stock: 4 },
      { length: "26\"", price: 2100, stock: 3 },
      { length: "28\"", price: 2500, stock: 2 },
      { length: "30\"", price: 2850, stock: 2 },
      { length: "32\"", price: 3200, stock: 1 },
      { length: "34\"", price: 3400, stock: 1 }
    ],

    addons: [
      { name: "Glueless Styling", price: 100 },
      { name: "Normal Styling", price: 70 }
    ],

    specs: {
      "Hair Type": "100% Human Hair",
      "Lace Type": "13x4 HD Lace Frontal",
      "Cap Size": "Medium (22.5\")",
      "Can Be Dyed": "Yes",
      "Heat Safe": "Up to 180°C"
    },

    care: [
      "Wash with sulfate-free shampoo",
      "Deep condition weekly",
      "Air dry or low heat",
      "Store on wig stand"
    ]
  },

  {
    id: 2,
    name: "Raw Donor Burgundy Vietnamese Bounce Layered",
    category: "Closure Wigs",
    type: "Raw Donor",
    texture: "Vietnamese Bounce",
    lace: "5x5 Lace Closure",
    length: "16/18/20 layered",
    density: "200%",
    color: "Burgundy",
    featured: true,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800",
    desc: "Luxury raw donor Vietnamese bounce wig in rich burgundy. Pre-layered 16/18/20 inches with 5x5 closure. Available in all colours.",

    variants: [
      { length: "16/18/20 layered", price: 3600, stock: 3 }
    ],

    addons: [
      { name: "Color Change", price: 200 },
      { name: "Glueless Styling", price: 100 }
    ],

    specs: {
      "Hair Type": "Raw Donor Human Hair",
      "Lace Type": "5x5 HD Lace Closure",
      "Color": "Burgundy (Custom colors available)",
      "Cap Size": "Medium (22.5\")",
      "Can Be Dyed": "Yes",
      "Lifespan": "3-5 years with care"
    }
  },

  {
    id: 3,
    name: "Super Double Drawn Flip Curls",
    category: "Closure Wigs",
    type: "Super Double Drawn",
    texture: "Flip Curls",
    lace: "5x5 Lace Closure",
    featured: false,
    image: "https://images.unsplash.com/photo-1559599076-9c7e1a35982d?w=800",
    desc: "Bouncy flip curls with super double drawn density. Full and voluminous. Available in 200g or 300g.",

    variants: [
      { length: "12\"", weight: "200g", lace: "5x5", price: 1300, stock: 4 },
      { length: "14\"", weight: "200g", lace: "5x5", price: 1600, stock: 3 },
      { length: "16\"", weight: "200g", lace: "5x5", price: 1800, stock: 2 },
      { length: "12\"", weight: "300g", lace: "5x5", price: 1800, stock: 2 },
      { length: "14\"", weight: "300g", lace: "5x5", price: 2100, stock: 1 },
      { length: "16\"", weight: "300g", lace: "5x5", price: 2300, stock: 1 },
      { length: "12\"", weight: "200g", lace: "Frontal", price: 1650, stock: 2 },
      { length: "14\"", weight: "200g", lace: "Frontal", price: 1850, stock: 2 },
      { length: "16\"", weight: "200g", lace: "Frontal", price: 1990, stock: 1 }
    ],

    addons: [
      { name: "Wigging & Styling", price: 200 },
      { name: "Glueless Conversion", price: 100 }
    ],

    specs: {
      "Hair Type": "100% Human Hair",
      "Density": "200g / 300g options",
      "Lace Type": "5x5 Closure or Frontal",
      "Cap Size": "Medium (22.5\")",
      "Can Be Dyed": "Yes"
    }
  }
];

export const productCategories = [
  "All",
  "Full Frontal Wigs",
  "Closure Wigs",
  "Ready to Ship"
];