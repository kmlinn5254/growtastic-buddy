
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
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&q=80",
    difficulty: "Easy",
    light: "Bright indirect",
    water: "Weekly",
    temperature: "65-85°F"
  },
  {
    id: 2,
    name: "Snake Plant",
    image: "https://images.unsplash.com/photo-1572686424871-ef929e9e50e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "Every 2-3 weeks",
    temperature: "60-85°F"
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    image: "https://images.unsplash.com/photo-1545165375-75ee42079cf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    difficulty: "Moderate",
    light: "Bright indirect",
    water: "When top inch is dry",
    temperature: "65-75°F"
  },
  {
    id: 4,
    name: "Pothos",
    image: "https://images.unsplash.com/photo-1600411833114-5c51f36863a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "When top soil is dry",
    temperature: "60-80°F"
  },
  {
    id: 5,
    name: "Boston Fern",
    image: "https://images.unsplash.com/photo-1682270242236-5920a1d2a601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    difficulty: "Moderate",
    light: "Indirect light",
    water: "Keep soil consistently moist",
    temperature: "60-75°F"
  },
  {
    id: 6,
    name: "Peace Lily",
    image: "https://images.unsplash.com/photo-1548625361-a40267ff3083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    difficulty: "Easy",
    light: "Low to medium indirect",
    water: "When leaves start to droop",
    temperature: "65-85°F"
  },
  {
    id: 7,
    name: "ZZ Plant",
    image: "https://images.unsplash.com/photo-1623910835629-42960526fce9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Very Easy",
    light: "Low to bright indirect",
    water: "Every 2-3 weeks",
    temperature: "60-85°F"
  },
  {
    id: 8,
    name: "Rubber Plant",
    image: "https://images.unsplash.com/photo-1596724878582-76f49a79b42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Easy",
    light: "Medium to bright indirect",
    water: "When top inch is dry",
    temperature: "60-80°F"
  },
  {
    id: 9,
    name: "Aloe Vera",
    image: "https://images.unsplash.com/photo-1596547609387-3d5f28090945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Easy",
    light: "Bright direct to indirect",
    water: "When soil is completely dry",
    temperature: "55-80°F"
  },
  {
    id: 10,
    name: "Jade Plant",
    image: "https://images.unsplash.com/photo-1632002046727-efd926baa696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Easy",
    light: "Bright direct to indirect",
    water: "When soil is completely dry",
    temperature: "65-75°F"
  }
];

export default plantFAQ;
