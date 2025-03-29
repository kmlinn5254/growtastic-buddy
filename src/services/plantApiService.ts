
import { Plant } from "@/types/plants";
import { toast } from "@/hooks/use-toast";
import { getWaterRequirement, getLightRequirement } from "@/utils/plantDataMappers";
import { saveExternalPlant } from "@/services/plantStorage";

// Fetch plant data from external API
export const fetchPlantFromExternalAPI = async (plantName: string): Promise<Plant | null> => {
  try {
    // Using Perenual API as an example
    const response = await fetch(`https://perenual.com/api/species-list?key=sk-L2g7645b8bd22a8ea2246&q=${encodeURIComponent(plantName)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch plant data');
    }
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const plantData = data.data[0];
      
      // Map the external API response to our Plant interface
      const plant: Plant = {
        id: Date.now(),
        name: plantData.common_name || plantName,
        image: plantData.default_image?.medium_url || plantData.default_image?.regular_url || 
               `https://source.unsplash.com/featured/?${encodeURIComponent(plantName)},plant`,
        difficulty: plantData.care_level || "Moderate",
        light: getLightRequirement(plantData.sunlight),
        water: getWaterRequirement(plantData.watering),
        temperature: `${plantData.hardiness?.min || "Unknown"} - ${plantData.hardiness?.max || "Unknown"}`,
        description: plantData.description,
        careSteps: [
          {
            title: "Watering",
            description: getWaterRequirement(plantData.watering)
          },
          {
            title: "Light",
            description: getLightRequirement(plantData.sunlight)
          },
          {
            title: "Temperature",
            description: `Preferred temperature range: ${plantData.hardiness?.min || "Unknown"} - ${plantData.hardiness?.max || "Unknown"}`
          }
        ],
        isExternal: true
      };
      
      // Save to localStorage and return
      saveExternalPlant(plant);
      toast({
        title: "Plant Guide Found",
        description: `Successfully added care guide for ${plant.name} to your database`,
      });
      return plant;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching plant data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch plant data from external source",
      variant: "destructive",
    });
    return null;
  }
};
