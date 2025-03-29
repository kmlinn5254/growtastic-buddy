
// Helper function to map water requirement
export function getWaterRequirement(watering: string | undefined): string {
  if (!watering) return "Moderate watering";
  
  switch(watering.toLowerCase()) {
    case "frequent":
      return "Keep soil moist, water when top inch of soil is dry";
    case "average":
      return "Water when top 2 inches of soil are dry";
    case "minimum":
      return "Allow soil to dry between waterings";
    case "none":
      return "Very drought tolerant, minimal watering required";
    default:
      return "Moderate watering";
  }
}

// Helper function to map light requirement
export function getLightRequirement(sunlight: string[] | undefined): string {
  if (!sunlight || sunlight.length === 0) return "Medium light";
  
  const light = sunlight[0].toLowerCase();
  
  if (light.includes("full")) return "Full sun";
  if (light.includes("part")) return "Partial sun";
  if (light.includes("shade")) return "Shade";
  
  return "Medium light";
}
