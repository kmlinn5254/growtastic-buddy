
// Different plant analysis results to provide variety in AI responses

type PlantAnalysisResult = {
  plantName: string;
  condition: string;
  issues: string[];
  recommendations: string[];
};

// Array of potential plant problems and solutions
export const plantAnalysisResults: PlantAnalysisResult[] = [
  {
    plantName: "Monstera Deliciosa",
    condition: "Healthy with minor issues",
    issues: [
      "Some leaf edges showing brown tips",
      "Minor pest infestation (spider mites)"
    ],
    recommendations: [
      "Increase humidity around the plant",
      "Wipe leaves with neem oil solution to treat mites",
      "Ensure good air circulation around the plant",
      "Maintain consistent watering schedule"
    ]
  },
  {
    plantName: "Fiddle Leaf Fig",
    condition: "Stressed",
    issues: [
      "Yellowing leaves indicate overwatering",
      "Brown spots suggest sunburn",
      "Leaves drooping may indicate low humidity"
    ],
    recommendations: [
      "Water only when top 2 inches of soil are dry",
      "Move to a location with bright, indirect light",
      "Increase humidity with a humidifier or pebble tray",
      "Apply a balanced fertilizer once a month during growing season"
    ]
  },
  {
    plantName: "Snake Plant",
    condition: "Mildly distressed",
    issues: [
      "Soft, mushy leaves at the base indicate overwatering",
      "Slight discoloration on some leaves",
      "Slow growth"
    ],
    recommendations: [
      "Allow soil to dry completely between waterings",
      "Repot with well-draining soil mix",
      "Place in brighter indirect light",
      "Check roots for rot and trim if necessary"
    ]
  },
  {
    plantName: "Peace Lily",
    condition: "Needs attention",
    issues: [
      "Drooping leaves indicate underwatering",
      "Yellow leaf edges suggest mineral buildup",
      "Lack of blooms"
    ],
    recommendations: [
      "Water thoroughly when the top inch of soil is dry",
      "Flush soil with distilled water to remove mineral buildup",
      "Increase light exposure (still keeping indirect)",
      "Apply phosphorus-rich fertilizer to encourage blooming"
    ]
  },
  {
    plantName: "Pothos",
    condition: "Minor problems",
    issues: [
      "Yellowing leaves indicate inconsistent watering",
      "Leggy growth suggests insufficient light",
      "Slow growth may indicate it's root-bound"
    ],
    recommendations: [
      "Establish a consistent watering schedule",
      "Move to a brighter location, still avoiding direct sun",
      "Consider repotting to a slightly larger container",
      "Prune to encourage fuller growth"
    ]
  },
  {
    plantName: "ZZ Plant",
    condition: "Showing minor stress",
    issues: [
      "Yellowing stems indicate overwatering",
      "Brown leaf tips suggest low humidity",
      "New growth appears stunted"
    ],
    recommendations: [
      "Allow soil to dry completely between waterings",
      "Place in area with higher humidity or use a humidifier",
      "Check if plant is rootbound and repot if necessary",
      "Apply diluted houseplant fertilizer every 3 months"
    ]
  },
  {
    plantName: "Calathea",
    condition: "Needs care adjustments",
    issues: [
      "Curling leaves indicate low humidity",
      "Brown leaf edges suggest tap water sensitivity",
      "Fading patterns on leaves"
    ],
    recommendations: [
      "Increase humidity with a humidifier or pebble tray",
      "Water with distilled or filtered water only",
      "Keep away from drafts and cold windows",
      "Maintain consistent temperature between 65-80°F"
    ]
  }
];

// Function to get a random or specific analysis result
export const getPlantAnalysis = (imageData?: File): PlantAnalysisResult => {
  // In a real app, this would analyze the actual image using a plant identification API
  // For now, we'll return a random result
  const randomIndex = Math.floor(Math.random() * plantAnalysisResults.length);
  return plantAnalysisResults[randomIndex];
};

// Function for text-based analysis
export const getTextAnalysis = (description: string): PlantAnalysisResult => {
  // In a real app, this would use NLP to understand the description and return relevant analysis
  // For demo purposes, we'll use simple keyword matching to provide some variety
  
  const lowercaseDesc = description.toLowerCase();
  
  if (lowercaseDesc.includes("yellow") || lowercaseDesc.includes("yellowing")) {
    // Return fiddle leaf fig analysis for yellowing issues
    return plantAnalysisResults[1];
  } else if (lowercaseDesc.includes("droop") || lowercaseDesc.includes("wilting")) {
    // Return peace lily analysis for drooping issues
    return plantAnalysisResults[3];
  } else if (lowercaseDesc.includes("brown") || lowercaseDesc.includes("spots")) {
    // Return fiddle leaf fig for brown spots
    return plantAnalysisResults[1];
  } else if (lowercaseDesc.includes("curling") || lowercaseDesc.includes("crispy")) {
    // Return calathea analysis for curling issues
    return plantAnalysisResults[6];
  } else {
    // Return a random analysis if no keywords match
    const randomIndex = Math.floor(Math.random() * plantAnalysisResults.length);
    return plantAnalysisResults[randomIndex];
  }
};
