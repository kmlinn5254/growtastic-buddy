
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plant } from "@/components/PlantSelection";
import { Shovel, Droplet, Sun, Calendar, Sprout } from "lucide-react";

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
}

const PlantDetail = ({ plant, onBack }: PlantDetailProps) => {
  const isMobile = useIsMobile();
  // Detailed growing instructions for plants - hardcoded for demo purposes
  const growingInstructions = {
    "Basil": [
      "Start seeds indoors 6-8 weeks before last frost or direct sow when soil is warm.",
      "Plant in well-draining soil with plenty of organic matter.",
      "Space plants 12-18 inches apart to allow good air circulation.",
      "Water regularly, keeping soil moist but not soggy.",
      "Pinch off flower buds to encourage leaf growth and prevent bitter taste.",
      "Harvest leaves regularly by pinching them off with your fingers."
    ],
    "Cherry Tomatoes": [
      "Start seeds indoors 6-8 weeks before last frost date.",
      "Transplant seedlings after danger of frost has passed.",
      "Plant in full sun with rich, well-draining soil.",
      "Space plants 24-36 inches apart and provide stakes or cages for support.",
      "Water deeply and regularly, about 1-2 inches per week.",
      "Fertilize every 2-3 weeks with a balanced vegetable fertilizer."
    ],
    "Mint": [
      "Plant mint in containers to prevent spreading, as it's highly invasive.",
      "Use rich soil with good drainage.",
      "Place in partial shade to full sun.",
      "Keep soil consistently moist.",
      "Harvest leaves regularly to encourage bushier growth.",
      "Prune plants when they reach 3-4 inches tall to promote fullness."
    ],
    "Lettuce": [
      "Sow seeds directly in the garden as soon as soil can be worked.",
      "Plant in partial shade during hot months to prevent bolting.",
      "Space seedlings 8-12 inches apart.",
      "Keep soil consistently moist and cool.",
      "Fertilize with nitrogen-rich fertilizer.",
      "Harvest outer leaves as needed, allowing inner leaves to continue growing."
    ],
    "Chili Peppers": [
      "Start seeds indoors 8-10 weeks before last frost date.",
      "Transplant to full sun location after soil has warmed.",
      "Plant in well-draining soil with moderate fertility.",
      "Space plants 18-24 inches apart.",
      "Water regularly but avoid overwatering.",
      "Apply calcium to prevent blossom end rot."
    ],
    "Cilantro": [
      "Sow seeds directly in the garden after danger of frost has passed.",
      "Plant in partial shade in hot climates, full sun in cooler areas.",
      "Space plants 6-8 inches apart in rows 12 inches apart.",
      "Keep soil consistently moist but not waterlogged.",
      "Succession plant every 2-3 weeks for continuous harvest.",
      "Harvest leaves when plants reach 6 inches tall."
    ]
  };

  // Default instructions if plant name doesn't match predefined instructions
  const defaultInstructions = [
    "Plant in well-draining soil with appropriate light conditions.",
    "Water according to plant needs, checking soil moisture regularly.",
    "Fertilize as needed based on plant requirements.",
    "Monitor for pests and diseases regularly.",
    "Provide appropriate support for climbing or tall plants.",
  ];

  const instructions = growingInstructions[plant.name as keyof typeof growingInstructions] || defaultInstructions;

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="text-plant-primary hover:text-plant-dark flex items-center mb-4"
      >
        ← Back to my plants
      </button>

      <Card>
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">{plant.name}</CardTitle>
          <CardDescription className="text-lg">Step-by-step growing guide</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="instructions" className="space-y-4">
            <TabsList className="w-full">
              <TabsTrigger value="instructions" className="flex items-center">
                <Shovel className="h-4 w-4 mr-2" />
                Growing Instructions
              </TabsTrigger>
              <TabsTrigger value="care" className="flex items-center">
                <Droplet className="h-4 w-4 mr-2" />
                Plant Care
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Sprout className="h-5 w-5 mr-2 text-plant-primary" />
                  Growing Instructions
                </h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-700">{instruction}</li>
                  ))}
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="care" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Sun className="h-5 w-5 mr-2 text-amber-500" />
                      Light Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{plant.light}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                      Water Needs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{plant.water}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Shovel className="h-5 w-5 mr-2 text-brown-500" />
                      Difficulty Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{plant.difficulty}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                      Growing Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{plant.growTime}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantDetail;
