import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Leaf, DropletIcon, SunIcon, ThermometerIcon, Wind, CheckCircle, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { searchPlants } from "@/services/plantService";
import { allPlants } from "@/data/plantFAQ";

// Mock data for seasonal guides
const seasonalGuides = [
  {
    id: 1,
    season: "Spring",
    title: "Spring Planting Guide",
    description: "The best plants to grow in spring and how to care for them.",
    image: "https://images.unsplash.com/photo-1510205695-0c53dc4a0635?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    content: [
      {
        heading: "Getting Started with Spring Planting",
        text: "Spring is the perfect time to start your garden. As temperatures rise and days lengthen, plants emerge from dormancy and begin active growth. This guide will help you make the most of the spring planting season."
      },
      {
        heading: "Preparing Your Garden",
        text: "Start by cleaning up your garden beds. Remove any debris, dead plants, and weeds. Till the soil to a depth of 8-10 inches and add compost or other organic matter to improve soil structure and fertility."
      },
      {
        heading: "What to Plant in Spring",
        text: "Spring is ideal for planting cool-season vegetables like lettuce, spinach, peas, and radishes. It's also a good time to plant perennial flowers and many trees and shrubs before the heat of summer arrives."
      },
      {
        heading: "Watering Guidelines",
        text: "New plantings need consistent moisture. Water deeply but infrequently to encourage deep root growth. Morning is the best time to water, allowing foliage to dry before evening to prevent disease."
      }
    ]
  },
  {
    id: 2,
    season: "Summer",
    title: "Summer Maintenance",
    description: "How to keep your plants thriving during hot summer months.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    content: [
      {
        heading: "Summer Garden Care",
        text: "Summer brings heat and often drought conditions that can stress plants. Proper maintenance is crucial to keep your garden thriving through the hottest months of the year."
      },
      {
        heading: "Watering Strategies",
        text: "Water deeply and early in the morning to minimize evaporation. Consider installing drip irrigation or soaker hoses for efficient watering. Most established plants need about 1-1.5 inches of water per week."
      },
      {
        heading: "Mulching Benefits",
        text: "Apply a 2-3 inch layer of organic mulch around plants to conserve moisture, suppress weeds, and keep soil temperatures cooler. Keep mulch a few inches away from plant stems to prevent rot."
      },
      {
        heading: "Heat Protection",
        text: "Provide shade for sensitive plants during the hottest part of the day. Shade cloth, umbrellas, or strategically planted tall plants can create protective microclimates in your garden."
      }
    ]
  },
  {
    id: 3,
    season: "Fall",
    title: "Fall Preparation",
    description: "Preparing your garden and houseplants for the cooler months.",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    content: [
      {
        heading: "Fall Garden Transitions",
        text: "Fall is a time of transition in the garden. As temperatures cool, it's time to prepare both outdoor and indoor plants for the coming winter months."
      },
      {
        heading: "Plant Protection",
        text: "Begin by assessing which plants need protection from frost. Tender perennials may need to be dug up and stored, while others can be protected with mulch or frost cloth when temperatures drop."
      },
      {
        heading: "Fall Planting Opportunities",
        text: "Fall is an excellent time to plant trees, shrubs, and spring-flowering bulbs. The cooler temperatures and typically more consistent rainfall help plants establish strong root systems before winter dormancy."
      },
      {
        heading: "Indoor Plant Preparation",
        text: "Bring tropical houseplants indoors before nighttime temperatures drop below 55°F. Inspect them for pests, gradually acclimate them to indoor conditions, and reduce watering and fertilizing as growth slows."
      }
    ]
  },
  {
    id: 4,
    season: "Winter",
    title: "Winter Plant Care",
    description: "Tips for keeping your plants alive during the winter months.",
    image: "https://images.unsplash.com/photo-1511881099974-5fc04e9f9d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    content: [
      {
        heading: "Winter Indoor Plant Care",
        text: "During winter, indoor plants face challenges from reduced light, dry air, and temperature fluctuations. Adjusting your care routine is essential for keeping plants healthy until spring."
      },
      {
        heading: "Light Requirements",
        text: "With shorter days and less intense sunlight, consider relocating plants to brighter windows (usually south or west-facing). Clean dust from leaves to maximize light absorption, and rotate plants regularly for even growth."
      },
      {
        heading: "Humidity Management",
        text: "Indoor heating systems create dry air that can stress many houseplants. Increase humidity by grouping plants together, using humidity trays filled with pebbles and water, or running a humidifier nearby."
      },
      {
        heading: "Watering Adjustments",
        text: "Most plants need less water during winter as growth slows. Allow soil to dry out more between waterings, and always use room temperature water to avoid shocking plant roots. Watch for signs of overwatering, which is common in winter."
      }
    ]
  }
];

// Mock plant care guide steps
const plantCareSteps = [
  {
    step: 1,
    title: "Choosing the Right Location",
    description: "Place your Monstera in a spot with bright, indirect light. Avoid direct sunlight as it can burn the leaves."
  },
  {
    step: 2,
    title: "Proper Watering",
    description: "Water when the top 1-2 inches of soil feels dry to the touch. Reduce watering in winter and increase in summer."
  },
  {
    step: 3,
    title: "Humidity and Temperature",
    description: "Maintain humidity around 60-80% for optimal growth. Keep temperatures between 65-85°F (18-29°C)."
  },
  {
    step: 4,
    title: "Fertilizing",
    description: "Feed with a balanced liquid fertilizer once a month during the growing season (spring and summer)."
  },
  {
    step: 5,
    title: "Pruning and Cleaning",
    description: "Remove yellowing or damaged leaves. Wipe the leaves occasionally to remove dust and allow better photosynthesis."
  }
];

const PlantGuides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<typeof allPlants[0] | null>(null);
  const [selectedSeasonalGuide, setSelectedSeasonalGuide] = useState<typeof seasonalGuides[0] | null>(null);
  
  // Use the searchPlants service to search for plants
  const filteredPlants = searchPlants(searchQuery);
  
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
            <div className="plant-section">
              <div className="mb-6 flex items-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPlant(null)}
                  className="mr-3"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to guides
                </Button>
                <h2 className="text-2xl font-bold text-plant-dark">{selectedPlant.name} Care Guide</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={selectedPlant.image}
                      alt={selectedPlant.name}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                  
                  <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-4">Quick Care Guide</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <SunIcon className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium">Light</p>
                          <p className="text-gray-600">{selectedPlant.light}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <DropletIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium">Water</p>
                          <p className="text-gray-600">{selectedPlant.water}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <ThermometerIcon className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium">Temperature</p>
                          <p className="text-gray-600">{selectedPlant.temperature}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Wind className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium">Humidity</p>
                          <p className="text-gray-600">Medium to High</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Leaf className="h-5 w-5 text-plant-primary mr-3" />
                        <div>
                          <p className="text-sm font-medium">Difficulty</p>
                          <p className="text-gray-600">{selectedPlant.difficulty}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Care Instructions</CardTitle>
                      <CardDescription>
                        Follow these steps to keep your {selectedPlant.name} healthy and thriving.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-6">
                        {plantCareSteps.map((step) => (
                          <li key={step.step} className="flex">
                            <div className="mr-4 flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-plant-primary text-white">
                                {step.step}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">{step.title}</h4>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      
                      <div className="mt-8 p-4 bg-plant-light/20 rounded-lg border border-plant-light">
                        <h4 className="text-lg font-semibold flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-plant-primary mr-2" />
                          Pro Tips
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Rotate your plant occasionally to ensure even growth.</li>
                          <li>Monstera can be propagated easily from stem cuttings in water or soil.</li>
                          <li>Consider staking or providing a moss pole for support as the plant matures.</li>
                          <li>The leaves will develop more splits and holes as the plant matures and receives more light.</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : selectedSeasonalGuide ? (
            <div className="plant-section">
              <div className="mb-6 flex items-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedSeasonalGuide(null)}
                  className="mr-3"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to guides
                </Button>
                <h2 className="text-2xl font-bold text-plant-dark">{selectedSeasonalGuide.title}</h2>
              </div>
              
              <div className="flex flex-col gap-8 mb-8">
                <div className="w-full rounded-lg overflow-hidden shadow-md h-64">
                  <img
                    src={selectedSeasonalGuide.image}
                    alt={selectedSeasonalGuide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedSeasonalGuide.title}</CardTitle>
                    <CardDescription>
                      {selectedSeasonalGuide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {selectedSeasonalGuide.content.map((section, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold mb-3 text-plant-dark">{section.heading}</h3>
                          <p className="text-gray-700">{section.text}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-plant-light/20 rounded-lg border border-plant-light">
                      <h4 className="text-lg font-semibold flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-plant-primary mr-2" />
                        Seasonal Tips
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Plan your garden on paper before planting to optimize space and plant compatibility.</li>
                        <li>Keep a garden journal to track what works well in your specific climate and conditions.</li>
                        <li>Consider your local climate zone when choosing plants for the best success rate.</li>
                        <li>Incorporate native plants which are often better adapted to local conditions and support wildlife.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 max-w-md mx-auto plant-section">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search for any plant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 plant-input"
                  />
                </div>
              </div>
              
              <Tabs defaultValue="popular" className="plant-section">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="popular">Plants</TabsTrigger>
                  <TabsTrigger value="seasonal">Seasonal Guides</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredPlants.length > 0 ? (
                      filteredPlants.map((plant) => (
                        <Card key={plant.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden" onClick={() => setSelectedPlant(plant)}>
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={plant.image}
                              alt={plant.name}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                          <CardContent className="pt-4">
                            <h3 className="font-semibold text-lg mb-1">{plant.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Leaf className="h-4 w-4 text-plant-primary mr-1" />
                              <span>{plant.difficulty}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p className="text-gray-500">No plants found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="seasonal">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {seasonalGuides.map((guide) => (
                      <Card 
                        key={guide.id} 
                        className="hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                        onClick={() => setSelectedSeasonalGuide(guide)}
                      >
                        <div className="flex flex-col md:flex-row h-full">
                          <div className="md:w-1/3">
                            <img
                              src={guide.image}
                              alt={guide.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-4 flex flex-col">
                            <div className="mb-2">
                              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-plant-light/30 text-plant-dark">
                                {guide.season}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                            <p className="text-gray-600 text-sm flex-grow">{guide.description}</p>
                            <Button variant="ghost" className="mt-2 self-start text-plant-primary">
                              Read Guide
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
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
