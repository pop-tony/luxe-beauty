export const services = [
  // WIG MAKING
  {
    id: 1,
    name: "Frontal Wig Making",
    price: 300,
    priceRange: "250-300",
    duration: "3-5 days",
    category: "Wig Making",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    desc: "Custom handmade frontal wig using your bundles. Professional construction with bleached knots and plucked hairline.",
    featured: true,
    includes: [
      "Wig construction",
      "Bleached knots",
      "Custom hairline plucking",
      "Elastic band & combs"
    ]
  },
  {
    id: 2,
    name: "Closure Wig Making",
    price: 200,
    duration: "2-3 days",
    category: "Wig Making",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800",
    desc: "Custom closure wig construction. Perfect for beginners and low-maintenance wear.",
    includes: [
      "Wig construction",
      "Bleached knots",
      "Elastic band & combs",
      "Basic styling"
    ]
  },
  {
    id: 3,
    name: "Express 1 Day Wig Making",
    price: 400,
    duration: "24 hours",
    category: "Wig Making",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
    desc: "Need it fast? Get your custom wig made in 24 hours. Priority service.",
    featured: true,
    includes: [
      "Priority construction",
      "Bleached knots",
      "Custom hairline plucking",
      "Elastic band & combs",
      "Express styling"
    ]
  },
  {
    id: 4,
    name: "Glueless Wig Making",
    price: 100,
    duration: "2 days",
    category: "Wig Making",
    image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=800",
    desc: "Convert your wig to glueless. Add adjustable straps and elastic band for secure, glue-free wear.",
    includes: [
      "Elastic band installation",
      "Adjustable straps",
      "Combs for security"
    ]
  },

  // INSTALLATIONS
  {
    id: 5,
    name: "Frontal Installation",
    price: 200,
    duration: "2-3 hours",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800",
    desc: "Professional lace frontal installation. Melted lace, natural hairline, styled to perfection.",
    featured: true,
    includes: [
      "Braid down",
      "Lace melting",
      "Custom baby hairs",
      "Styling"
    ]
  },
  {
    id: 6,
    name: "Closure Installation",
    price: 150,
    duration: "1.5-2 hours",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2d49a3?w=800",
    desc: "Clean closure install with seamless blend. Perfect for protective styling.",
    includes: [
      "Braid down",
      "Closure placement",
      "Styling"
    ]
  },

  // PONYTAILS
  {
    id: 7,
    name: "Frontal Ponytail",
    price: 220,
    duration: "2 hours",
    category: "Ponytail",
    image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800",
    desc: "Sleek frontal ponytail install. Laid edges, high shine finish.",
    includes: [
      "Hair prep",
      "Frontal install",
      "Ponytail styling",
      "Edge control"
    ]
  },
  {
    id: 8,
    name: "Traditional Ponytail",
    price: 120,
    duration: "1 hour",
    category: "Ponytail",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800",
    desc: "Classic sleek ponytail with your natural hair or extensions.",
    includes: [
      "Hair prep",
      "Sleek styling",
      "Edge control"
    ]
  },

  // SEW INS
  {
    id: 9,
    name: "Versatile Sew In (Leave Out)",
    price: 200,
    duration: "2-3 hours",
    category: "Sew In",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800",
    desc: "Traditional sew in with leave out. Blend your natural hair for versatile styling.",
    includes: [
      "Braid down",
      "Track installation",
      "Leave out blending",
      "Styling"
    ]
  },
  {
    id: 10,
    name: "Traditional Sew In (No Leave Out)",
    price: 200,
    duration: "2-3 hours",
    category: "Sew In",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
    desc: "Full sew in with no leave out. Complete protective style.",
    includes: [
      "Braid down",
      "Full track installation",
      "Styling"
    ]
  },
  {
    id: 11,
    name: "Sew In with Closure",
    price: 250,
    priceRange: "200-250",
    duration: "2-3 hours",
    category: "Sew In",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800",
    desc: "Sew in with closure for full protection. No leave out needed.",
    featured: true,
    includes: [
      "Braid down",
      "Closure installation",
      "Track installation",
      "Styling"
    ]
  },
  {
    id: 12,
    name: "Sew In with Frontal",
    price: 300,
    duration: "3-4 hours",
    category: "Sew In",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    desc: "Frontal sew in for maximum versatility. Ear-to-ear coverage.",
    includes: [
      "Braid down",
      "Frontal installation",
      "Track installation",
      "Custom hairline",
      "Styling"
    ]
  },

  // COLORING & REVAMP
  {
    id: 13,
    name: "Wig Coloring",
    price: 250,
    priceNote: "250+",
    duration: "2-3 days",
    category: "Coloring",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800",
    desc: "Professional wig coloring service. From subtle highlights to full color transformation. Price varies by complexity.",
    includes: [
      "Color consultation",
      "Professional dye",
      "Deep conditioning",
      "Style finish"
    ],
    addons: [
      { name: "Bleaching", price: 100 },
      { name: "Highlights", price: 150 },
      { name: "Ombré", price: 200 }
    ]
  },
  {
    id: 14,
    name: "Laundering & Treatment",
    price: 150,
    duration: "2 days",
    category: "Revamping",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    desc: "Full wig revamp: deep wash, treatment, detangle, and restyle. Bring your old wig back to life.",
    includes: [
      "Deep wash",
      "Intensive treatment",
      "Detangling",
      "Restyling"
    ]
  },
  {
    id: 15,
    name: "Laundry",
    price: 90,
    duration: "1 day",
    category: "Revamping",
    image: "https://images.unsplash.com/photo-1559599076-9c7e1a35982d?w=800",
    desc: "Basic wig wash and condition. Quick refresh for your unit.",
    includes: [
      "Gentle wash",
      "Conditioning",
      "Air dry"
    ]
  },

  // PIERCING - NEW CATEGORY
  {
    id: 16,
    name: "Ear Piercing",
    price: 80,
    duration: "15 mins",
    category: "Piercing",
    image: "https://images.unsplash.com/photo-1611652022419-d837c1c4b8b0?w=800",
    desc: "Professional earlobe piercing with sterile equipment. Includes starter studs.",
    featured: true,
    includes: [
      "Consultation",
      "Sterile piercing",
      "Starter studs",
      "Aftercare instructions"
    ],
    addons: [
      { name: "Upgrade to Gold Stud", price: 50 },
      { name: "Second Piercing", price: 60 }
    ]
  },
  {
    id: 17,
    name: "Nose Piercing",
    price: 100,
    duration: "20 mins",
    category: "Piercing",
    image: "https://images.unsplash.com/photo-1600427157363-4798f76380e5?w=800",
    desc: "Nostril piercing done with precision. Includes surgical steel stud.",
    includes: [
      "Consultation",
      "Sterile piercing",
      "Surgical steel stud",
      "Aftercare kit"
    ],
    addons: [
      { name: "Gold Nose Ring", price: 80 },
      { name: "Diamond Stud", price: 150 }
    ]
  },
  {
    id: 18,
    name: "Belly Button Piercing",
    price: 150,
    duration: "30 mins",
    category: "Piercing",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    desc: "Professional navel piercing. Includes curved barbell and aftercare.",
    includes: [
      "Consultation",
      "Sterile piercing",
      "Curved barbell",
      "Aftercare solution"
    ]
  },
  {
    id: 19,
    name: "Helix/Cartilage Piercing",
    price: 120,
    duration: "20 mins",
    category: "Piercing",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
    desc: "Upper ear cartilage piercing. Multiple placement options available.",
    includes: [
      "Consultation",
      "Sterile piercing",
      "Starter jewelry",
      "Aftercare instructions"
    ]
  }
];

export const serviceCategories = [
  "All",
  "Wig Making", 
  "Installation", 
  "Ponytail", 
  "Sew In", 
  "Coloring", 
  "Revamping",
  "Piercing" // <- Added
];
