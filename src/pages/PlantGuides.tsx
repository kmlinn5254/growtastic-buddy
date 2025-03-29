import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { searchPlants } from "@/services/plantSearchService";
import { fetchPlants } from "@/services/supabasePlantService";
import SearchPlant from "@/components/SearchPlant";
import PlantDetailView from "@/components/PlantDetailView";
import SeasonalGuideView from "@/components/SeasonalGuideView";
import PlantCardGrid from "@/components/PlantCardGrid";
import SeasonalGuidesGrid from "@/components/SeasonalGuidesGrid";
import { Loader2 } from "lucide-react";
import { Plant } from "@/types/plants";
import { supabase } from "@/integrations/supabase/client";

const fetchSeasonalGuides = async () => {
  try {
    const { data, error } = await supabase
      .from('seasonal_guides')
      .select(`
        *,
        content:seasonal_guide_content(*)
      `)
      .order('season');
      
    if (error) throw error;
    
    return (data || []).map(guide => ({
      id: guide.id,
      season: guide.season,
      title: guide.title,
      description: guide.description,
      image: guide.image,
      content: guide.content?.map((item: any) => ({
        heading: item.heading,
        text: item.text
      })) || []
    }));
  } catch (error) {
    console.error('Error fetching seasonal guides:', error);
    return [];
  }
};

const fetchSeasonalGuideById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('seasonal_guides')
      .select(`
        *,
        content:seasonal_guide_content(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return {
      id: data.id,
      season: data.season,
      title: data.title,
      description: data.description,
      image: data.image,
      content: data.content?.map((item: any) => ({
        heading: item.heading,
        text: item.text
      })) || []
    };
  } catch (error) {
    console.error('Error fetching seasonal guide:', error);
    return null;
  }
};

const PlantGuides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [selectedSeasonalGuide, setSelectedSeasonalGuide] = useState<any | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seasonalGuides, setSeasonalGuides] = useState<any[]>([]);
  
  useEffect(() => {
    const loadSeasonalGuides = async () => {
      const guides = await fetchSeasonalGuides();
      setSeasonalGuides(guides);
    };
    
    loadSeasonalGuides();
  }, []);
  
  useEffect(() => {
    const fetchPlantsData = async () => {
      setIsLoading(true);
      try {
        const plants = await searchPlants(searchQuery);
        setFilteredPlants(plants);
        if (plants.some(plant => plant.isExternal)) {
          setRefreshTrigger(prev => prev + 1);
        }
      } catch (error) {
        console.error("Error searching plants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlantsData();
  }, [searchQuery, refreshTrigger]);
  
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
          
          {selectedPlant ? (
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
              <div className="flex justify-center mb-6">
                <SearchPlant 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                  className="w-full max-w-md"
                />
              </div>
              
              <Tabs defaultValue="popular" className="plant-section">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="popular">Plants</TabsTrigger>
                  <TabsTrigger value="seasonal">Seasonal Guides</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-plant-primary" />
                      <span className="ml-2 text-plant-primary">Searching for plant guides...</span>
                    </div>
                  ) : (
                    <PlantCardGrid 
                      plants={filteredPlants} 
                      searchQuery={searchQuery}
                      onSelectPlant={(plant: Plant) => setSelectedPlant(plant)} 
                      key={`plant-grid-${refreshTrigger}`}
                    />
                  )}
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
