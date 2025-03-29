
// Sample answers for common plant questions
const plantFAQ: Record<string, string> = {
  "water": "Most indoor plants should be watered when the top inch of soil feels dry. Frequency depends on the specific plant, humidity, and season.",
  "light": "Different plants have different light requirements. Most houseplants prefer bright, indirect light. Some plants like succulents need direct light, while others like ferns prefer shade.",
  "fertilizer": "Generally, fertilize houseplants every 4-6 weeks during growing season (spring and summer) and reduce or stop during dormant periods (fall and winter).",
  "repot": "Most houseplants need repotting every 1-2 years. Signs it's time to repot include roots growing through drainage holes, water running straight through the pot, or slowed growth.",
  "pest": "Common houseplant pests include spider mites, mealybugs, aphids, and scale. Regularly inspect plants, isolate infected ones, and treat with insecticidal soap or neem oil.",
  "hello": "Hello! I'm ArgoMind's plant assistant. How can I help with your plants today?",
  "hi": "Hi there! What plant questions can I answer for you today?",
  "help": "I can help with questions about plant care, watering schedules, light requirements, pest control, and more. Just ask away!",
};

// Additional plant data for searches
export const allPlants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_grant_cream_768x.jpg",
    difficulty: "Easy",
    light: "Bright indirect",
    water: "Weekly",
    temperature: "65-85°F"
  },
  {
    id: 2,
    name: "Snake Plant",
    image: "https://www.thespruce.com/thmb/StjXqA3Tj3pe1zsqkiEZkZjJD0c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-guide-4797223-hero-b10beccc74e04251a0afa33f320a91c2.jpg",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "Every 2-3 weeks",
    temperature: "60-85°F"
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    image: "https://bloomscape.com/wp-content/uploads/2022/03/Fiddle-Leaf-Fig_Stone_Carousel.jpg",
    difficulty: "Moderate",
    light: "Bright indirect",
    water: "When top inch is dry",
    temperature: "65-75°F"
  },
  {
    id: 4,
    name: "Pothos",
    image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_pothos-marble-queen_variant_small_tabitha_citrine_768x.jpg",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "When top soil is dry",
    temperature: "60-80°F"
  },
  {
    id: 5,
    name: "Boston Fern",
    image: "https://www.gardeningknowhow.com/wp-content/uploads/2019/11/Boston-fern-1.jpg",
    difficulty: "Moderate",
    light: "Indirect light",
    water: "Keep soil consistently moist",
    temperature: "60-75°F"
  },
  {
    id: 6,
    name: "Peace Lily",
    image: "https://cdn.shopify.com/s/files/1/0662/5489/products/Peace_Lily_-_Spathiphyllum_-_pistils_nursery.jpg",
    difficulty: "Easy",
    light: "Low to medium indirect",
    water: "When leaves start to droop",
    temperature: "65-85°F"
  },
  {
    id: 7,
    name: "ZZ Plant",
    image: "https://www.gardendesign.com/pictures/images/900x705Max/site_3/zanzibar-gem-zz-plant-zamioculcas-zamiifolia-shutterstock-com_15962.jpg",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "Every 2-3 weeks",
    temperature: "60-85°F"
  },
  {
    id: 8,
    name: "Rubber Plant",
    image: "https://www.thespruce.com/thmb/5phoVGgI4aBCZR6xBLVaROgBrJs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grow-rubber-plants-ficus-elastica-1902755-04-86c6574a284b40248a78bbed5a43a61c.jpg",
    difficulty: "Easy",
    light: "Medium to bright indirect",
    water: "When top inch is dry",
    temperature: "60-80°F"
  },
  {
    id: 9,
    name: "Aloe Vera",
    image: "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/aloe-vera-white-pot_sunwand24-ss_edit.jpg",
    difficulty: "Easy",
    light: "Bright direct to indirect",
    water: "When soil is completely dry",
    temperature: "55-80°F"
  },
  {
    id: 10,
    name: "Jade Plant",
    image: "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/jade-plante.jpg",
    difficulty: "Easy",
    light: "Bright direct to indirect",
    water: "When soil is completely dry",
    temperature: "65-75°F"
  }
];

export default plantFAQ;
