
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import PlantDetail from "@/components/PlantDetail";
import GardenTabs from "@/components/my-garden/GardenTabs";
import GrowthView from "@/components/my-garden/GrowthView";
import { growablePlants } from "@/components/my-garden/data";
import { Plant } from "@/types/plants";

const MyGarden = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>(() => {
    const savedPlants = localStorage.getItem("myGardenPlants");
    return savedPlants ? JSON.parse(savedPlants) : [];
  });
  
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'detail' | 'growth'>('list');
  const [activeTab, setActiveTab] = useState("my-plants");
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem("myGardenPlants", JSON.stringify(myPlants));
  }, [myPlants]);

  const handleSelectPlants = (selectedPlants: Plant[]) => {
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
            <GardenTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              myPlants={myPlants}
              growablePlants={growablePlants}
              isMobile={isMobile}
              onSelectPlants={handleSelectPlants}
              onPlantClick={handlePlantClick}
              onTrackGrowth={handleTrackGrowth}
            />
          ) : activeView === 'detail' && selectedPlant ? (
            <PlantDetail plant={selectedPlant} onBack={handleBackToList} />
          ) : activeView === 'growth' && selectedPlant ? (
            <GrowthView plant={selectedPlant} onBack={handleBackToList} />
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default MyGarden;
