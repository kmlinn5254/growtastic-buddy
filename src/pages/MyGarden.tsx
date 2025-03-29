
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PlantSelection from "@/components/PlantSelection";
import ReminderSystem from "@/components/ReminderSystem";
import PlantDetail from "@/components/PlantDetail";
import GrowthTracker from "@/components/GrowthTracker";
import { Plant } from "@/components/PlantSelection";
import { Shovel, Bell, Sprout, Info, Camera } from "lucide-react";

// Sample plants data for growing
const growablePlants: Plant[] = [
  {
    id: 1,
    name: "Basil",
    image: "https://images.unsplash.com/photo-1528796940112-4979b4a98424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    difficulty: "Easy",
    light: "Full sun",
    water: "Keep soil moist",
    growTime: "3-4 weeks",
  },
  {
    id: 2,
    name: "Cherry Tomatoes",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    difficulty: "Moderate",
    light: "Full sun",
    water: "Regular watering",
    growTime: "50-75 days",
  },
  {
    id: 3,
    name: "Mint",
    image: "https://images.unsplash.com/photo-1628556270448-4d67a3e5e456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Very Easy",
    light: "Partial shade",
    water: "Keep soil moist",
    growTime: "2-3 weeks",
  },
  {
    id: 4,
    name: "Lettuce",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    difficulty: "Easy",
    light: "Partial sun",
    water: "Regular watering",
    growTime: "45-55 days",
  },
  {
    id: 5,
    name: "Chili Peppers",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    difficulty: "Moderate",
    light: "Full sun",
    water: "Moderate watering",
    growTime: "60-90 days",
  },
  {
    id: 6,
    name: "Cilantro",
    image: "https://images.unsplash.com/photo-1503767849114-976b67568b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    difficulty: "Easy",
    light: "Partial sun",
    water: "Keep soil moist",
    growTime: "3-4 weeks",
  },
];

const MyGarden = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>(() => {
    const savedPlants = localStorage.getItem("myGardenPlants");
    return savedPlants ? JSON.parse(savedPlants) : [];
  });
  
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'detail' | 'growth'>('list');
  const [activeTab, setActiveTab] = useState("my-plants");

  useEffect(() => {
    localStorage.setItem("myGardenPlants", JSON.stringify(myPlants));
  }, [myPlants]);

  const handleSelectPlants = (selectedPlants: Plant[]) => {
    // Merge new plants with existing plants without duplicates
    const existingPlantIds = myPlants.map(plant => plant.id);
    const newPlants = selectedPlants.filter(plant => !existingPlantIds.includes(plant.id));
    
    setMyPlants([...myPlants, ...newPlants]);
  };
  
  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setActiveView('detail');
  };
  
  const handleTrackGrowth = (plant: Plant) => {
    setSelectedPlant(plant);
    setActiveView('growth');
  };
  
  const handleBackToList = () => {
    setSelectedPlant(null);
    setActiveView('list');
    setActiveTab("my-plants");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-plant-dark mb-4">My Garden</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select plants to grow, track their progress, and set care reminders to keep your garden thriving.
            </p>
          </div>
          
          {activeView === 'list' ? (
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
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
                {myPlants.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No plants yet</CardTitle>
                      <CardDescription>
                        Go to the "Add Plants" tab to choose plants for your garden.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Plants in My Garden</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {myPlants.map((plant) => (
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
                                onClick={() => handlePlantClick(plant)}
                                className="flex items-center text-sm text-plant-primary hover:text-plant-dark"
                              >
                                <Info className="h-4 w-4 mr-1" />
                                Growing Guide
                              </button>
                              <button 
                                onClick={() => handleTrackGrowth(plant)}
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
                )}
              </TabsContent>
              
              <TabsContent value="add-plants">
                <PlantSelection plants={growablePlants} onSelectPlants={handleSelectPlants} />
              </TabsContent>
              
              <TabsContent value="reminders">
                <ReminderSystem plants={myPlants} />
              </TabsContent>
            </Tabs>
          ) : activeView === 'detail' && selectedPlant ? (
            <PlantDetail plant={selectedPlant} onBack={handleBackToList} />
          ) : activeView === 'growth' && selectedPlant ? (
            <div className="space-y-4">
              <button 
                onClick={handleBackToList}
                className="text-plant-primary hover:text-plant-dark flex items-center"
              >
                ← Back to my plants
              </button>
              <GrowthTracker plant={selectedPlant} />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default MyGarden;
