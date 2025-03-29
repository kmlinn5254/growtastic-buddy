
import { Plant } from "@/types/plants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Info } from "lucide-react";

interface GardenPlantListProps {
  plants: Plant[];
  onPlantClick: (plant: Plant) => void;
  onTrackGrowth: (plant: Plant) => void;
}

const GardenPlantList: React.FC<GardenPlantListProps> = ({ 
  plants, 
  onPlantClick, 
  onTrackGrowth 
}) => {
  if (plants.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No plants yet</CardTitle>
          <CardDescription>
            Go to the "Add Plants" tab to choose plants for your garden.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Plants in My Garden</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((plant) => (
          <Card key={plant.id} className="hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{plant.name}</CardTitle>
              <CardDescription>Growth time: {plant.growTime}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1 mb-4">
                <p><span className="font-medium">Light:</span> {plant.light}</p>
                <p><span className="font-medium">Water:</span> {plant.water}</p>
                <p><span className="font-medium">Difficulty:</span> {plant.difficulty}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onPlantClick(plant)}
                  className="flex items-center text-sm text-plant-primary hover:text-plant-dark"
                >
                  <Info className="h-4 w-4 mr-1" />
                  Growing Guide
                </button>
                <button 
                  onClick={() => onTrackGrowth(plant)}
                  className="flex items-center text-sm text-plant-primary hover:text-plant-dark"
                >
                  <Camera className="h-4 w-4 mr-1" />
                  Track Growth
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GardenPlantList;
