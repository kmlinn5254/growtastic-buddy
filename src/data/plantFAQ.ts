
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
    image: "https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg",
    difficulty: "Easy",
    light: "Bright indirect",
    water: "Weekly",
    temperature: "65-85°F"
  },
  {
    id: 2,
    name: "Snake Plant",
    image: "https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "Every 2-3 weeks",
    temperature: "60-85°F"
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    image: "https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg",
    difficulty: "Moderate",
    light: "Bright indirect",
    water: "When top inch is dry",
    temperature: "65-75°F"
  },
  {
    id: 4,
    name: "Pothos",
    image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "When top soil is dry",
    temperature: "60-80°F"
  },
  {
    id: 5,
    name: "Boston Fern",
    image: "https://images.pexels.com/photos/1084196/pexels-photo-1084196.jpeg",
    difficulty: "Moderate",
    light: "Indirect light",
    water: "Keep soil consistently moist",
    temperature: "60-75°F"
  },
  {
    id: 6,
    name: "Peace Lily",
    image: "https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg",
    difficulty: "Easy",
    light: "Low to medium indirect",
    water: "When leaves start to droop",
    temperature: "65-85°F"
  },
  {
    id: 7,
    name: "ZZ Plant",
    image: "https://images.pexels.com/photos/7728782/pexels-photo-7728782.jpeg",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "Every 2-3 weeks",
    temperature: "60-85°F"
  },
  {
    id: 8,
    name: "Rubber Plant",
    image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg",
    difficulty: "Easy",
    light: "Medium to bright indirect",
    water: "When top inch is dry",
    temperature: "60-80°F"
  },
  {
    id: 9,
    name: "Aloe Vera",
    image: "https://images.pexels.com/photos/1022695/pexels-photo-1022695.jpeg",
    difficulty: "Easy",
    light: "Bright direct to indirect",
    water: "When soil is completely dry",
    temperature: "55-80°F"
  },
  {
    id: 10,
    name: "Jade Plant",
    image: "https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg",
    difficulty: "Easy",
    light: "Bright direct to indirect",
    water: "When soil is completely dry",
    temperature: "65-75°F"
  }
];

export default plantFAQ;
