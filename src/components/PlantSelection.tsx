
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DropletIcon, SunIcon, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Plant } from "@/types/plants";

interface PlantSelectionProps {
  plants: Plant[];
  onSelectPlants: (selectedPlants: Plant[]) => void;
}

const PlantSelection = ({ plants, onSelectPlants }: PlantSelectionProps) => {
  const [selectedPlantIds, setSelectedPlantIds] = useState<number[]>([]);
  const { toast } = useToast();

  const handleTogglePlant = (plantId: number) => {
    setSelectedPlantIds((prev) => {
      if (prev.includes(plantId)) {
        return prev.filter((id) => id !== plantId);
      } else {
        return [...prev, plantId];
      }
    });
  };

  const handleSavePlants = () => {
    const selectedPlants = plants.filter((plant) => selectedPlantIds.includes(plant.id));
    onSelectPlants(selectedPlants);
    
    toast({
      title: "Plants saved to your garden!",
      description: `You've added ${selectedPlants.length} plant(s) to grow.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((plant) => (
          <Card key={plant.id} className={`transition-all ${
            selectedPlantIds.includes(plant.id) ? "border-plant-primary ring-1 ring-plant-primary" : ""
          }`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                {plant.name}
                <Checkbox 
                  id={`plant-${plant.id}`} 
                  checked={selectedPlantIds.includes(plant.id)}
                  onCheckedChange={() => handleTogglePlant(plant.id)}
                  className="h-5 w-5 data-[state=checked]:bg-plant-primary"
                />
              </CardTitle>
              <CardDescription>Grow time: {plant.growTime || 'Unknown'}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-2">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center">
                  <SunIcon className="h-4 w-4 text-amber-500 mr-2" />
                  <span>Light: {plant.light}</span>
                </div>
                <div className="flex items-center">
                  <DropletIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Water: {plant.water}</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-plant-primary mr-2" />
                  <span>Difficulty: {plant.difficulty}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Label 
                htmlFor={`plant-${plant.id}`} 
                className="flex items-center cursor-pointer text-sm text-muted-foreground"
              >
                {selectedPlantIds.includes(plant.id) ? "Selected to grow" : "Select to grow"}
              </Label>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleSavePlants} 
          disabled={selectedPlantIds.length === 0}
          className="bg-plant-primary hover:bg-plant-primary/90"
        >
          Save Selected Plants to My Garden
        </Button>
      </div>
    </div>
  );
};

export default PlantSelection;
