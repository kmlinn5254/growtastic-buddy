
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Shovel, Bell } from "lucide-react";
import GardenPlantList from "./GardenPlantList";
import PlantSelection from "@/components/PlantSelection";
import ReminderSystem from "@/components/ReminderSystem";
import { Plant } from "@/types/plants";

interface GardenTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  myPlants: Plant[];
  growablePlants: Plant[];
  isMobile: boolean;
  onSelectPlants: (selectedPlants: Plant[]) => void;
  onPlantClick: (plant: Plant) => void;
  onTrackGrowth: (plant: Plant) => void;
}

const GardenTabs: React.FC<GardenTabsProps> = ({
  activeTab,
  setActiveTab,
  myPlants,
  growablePlants,
  isMobile,
  onSelectPlants,
  onPlantClick,
  onTrackGrowth
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className={`${isMobile ? "w-full flex" : "grid w-full grid-cols-3"}`}>
        <TabsTrigger value="my-plants" className="flex items-center">
          <Sprout className="h-4 w-4 mr-2" />
          My Plants
        </TabsTrigger>
        <TabsTrigger value="add-plants" className="flex items-center">
          <Shovel className="h-4 w-4 mr-2" />
          Add Plants
        </TabsTrigger>
        <TabsTrigger value="reminders" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Reminders
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="my-plants">
        <GardenPlantList 
          plants={myPlants} 
          onPlantClick={onPlantClick} 
          onTrackGrowth={onTrackGrowth} 
        />
      </TabsContent>
      
      <TabsContent value="add-plants">
        <PlantSelection plants={growablePlants} onSelectPlants={onSelectPlants} />
      </TabsContent>
      
      <TabsContent value="reminders">
        <ReminderSystem plants={myPlants} />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
