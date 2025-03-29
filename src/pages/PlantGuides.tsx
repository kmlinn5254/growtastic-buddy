
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { searchPlants } from "@/services/plantService";
import { allPlants } from "@/data/plantFAQ";
import seasonalGuides from "@/data/seasonalGuides";
import SearchPlant from "@/components/SearchPlant";
import PlantDetailView from "@/components/PlantDetailView";
import SeasonalGuideView from "@/components/SeasonalGuideView";
import PlantCardGrid from "@/components/PlantCardGrid";
import SeasonalGuidesGrid from "@/components/SeasonalGuidesGrid";
import ImportPlantForm from "@/components/ImportPlantForm";
import { Leaf, Plus } from "lucide-react";

const PlantGuides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<typeof allPlants[0] | null>(null);
  const [selectedSeasonalGuide, setSelectedSeasonalGuide] = useState<typeof seasonalGuides[0] | null>(null);
  const [showImportForm, setShowImportForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Use the searchPlants service to search for plants
  const filteredPlants = searchPlants(searchQuery);
  
  const handleImportSuccess = () => {
    setShowImportForm(false);
    // Trigger a refresh of the plant list
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 plant-section">
            <h1 className="text-4xl font-bold text-plant-dark mb-4">Plant Care Guides</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover expert advice on growing and caring for your favorite plants. Browse our collection of 
              guides or search for specific plants.
            </p>
          </div>
          
          {showImportForm ? (
            <ImportPlantForm 
              onSuccess={handleImportSuccess} 
              onCancel={() => setShowImportForm(false)} 
            />
          ) : selectedPlant ? (
            <PlantDetailView 
              selectedPlant={selectedPlant} 
              onBack={() => setSelectedPlant(null)} 
            />
          ) : selectedSeasonalGuide ? (
            <SeasonalGuideView 
              guide={selectedSeasonalGuide} 
              onBack={() => setSelectedSeasonalGuide(null)} 
            />
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <SearchPlant 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                />
                
                <Button 
                  onClick={() => setShowImportForm(true)}
                  className="w-full md:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Import Plant Guide
                </Button>
              </div>
              
              <Tabs defaultValue="popular" className="plant-section">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="popular">Plants</TabsTrigger>
                  <TabsTrigger value="seasonal">Seasonal Guides</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular">
                  <PlantCardGrid 
                    plants={filteredPlants} 
                    searchQuery={searchQuery}
                    onSelectPlant={setSelectedPlant} 
                    key={`plant-grid-${refreshTrigger}`} // Ensure grid refreshes when new plants are added
                  />
                </TabsContent>
                
                <TabsContent value="seasonal">
                  <SeasonalGuidesGrid 
                    guides={seasonalGuides} 
                    onSelectGuide={setSelectedSeasonalGuide} 
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlantGuides;
