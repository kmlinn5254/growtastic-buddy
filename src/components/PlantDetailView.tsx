
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, DropletIcon, SunIcon, ThermometerIcon, Wind, CheckCircle, Trash2 } from "lucide-react";
import { Plant, deleteExternalPlant } from "@/services/plantService";
import { useToast } from "@/hooks/use-toast";

interface PlantDetailProps {
  selectedPlant: Plant;
  onBack: () => void;
}

const PlantDetailView: React.FC<PlantDetailProps> = ({ selectedPlant, onBack }) => {
  const { toast } = useToast();
  
  // Default plant care steps if not provided
  const defaultCareSteps = [
    {
      step: 1,
      title: "Choosing the Right Location",
      description: "Place your plant in a spot with appropriate lighting. Consider its specific light requirements."
    },
    {
      step: 2,
      title: "Proper Watering",
      description: "Water according to the plant's specific needs. Monitor soil moisture and adjust as needed."
    },
    {
      step: 3,
      title: "Humidity and Temperature",
      description: "Maintain appropriate humidity and temperature levels for optimal growth."
    },
    {
      step: 4,
      title: "Fertilizing",
      description: "Feed with a balanced fertilizer during the growing season, following recommendations for your specific plant."
    },
    {
      step: 5,
      title: "Pruning and Cleaning",
      description: "Remove yellow or damaged leaves. Wipe leaves occasionally to remove dust for better photosynthesis."
    }
  ];

  const handleDelete = () => {
    if (selectedPlant.isExternal && selectedPlant.id) {
      const success = deleteExternalPlant(selectedPlant.id);
      if (success) {
        toast({
          title: "Plant guide deleted",
          description: `${selectedPlant.name} has been removed from your plant database.`,
        });
        onBack();
      } else {
        toast({
          title: "Deletion failed",
          description: "There was an error deleting the plant guide.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="plant-section">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to guides
          </Button>
          <h2 className="text-2xl font-bold text-plant-dark">{selectedPlant.name} Care Guide</h2>
        </div>
        
        {selectedPlant.isExternal && (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-1" /> Delete Guide
          </Button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={selectedPlant.image}
              alt={selectedPlant.name}
              className="w-full h-auto object-cover aspect-square"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="w-full h-full aspect-square flex items-center justify-center bg-green-100">
                    <svg class="h-16 w-16 text-plant-primary opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2v8M9 9c-3 1.5-4 3-4 6 0 3 2 4 4 3"/>
                      <path d="M15 9c3 1.5 4 3 4 6 0 3-2 4-4 3"/>
                      <path d="M9 18c0 0 0 2 3 2s3-2 3-2"/>
                    </svg>
                  </div>
                `;
              }}
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
                  <p className="text-gray-600">{selectedPlant.difficulty === "Expert" ? "High" : selectedPlant.difficulty === "Difficult" ? "Medium to High" : "Medium"}</p>
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
            
            {selectedPlant.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-gray-600 text-sm">{selectedPlant.description}</p>
              </div>
            )}
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
                {selectedPlant.careSteps ? (
                  // Use imported care steps if available
                  selectedPlant.careSteps.map((step, index) => (
                    <li key={index} className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-plant-primary text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  // Use default care steps if none are provided
                  defaultCareSteps.map((step) => (
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
                  ))
                )}
              </ol>
              
              <div className="mt-8 p-4 bg-plant-light/20 rounded-lg border border-plant-light">
                <h4 className="text-lg font-semibold flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-plant-primary mr-2" />
                  Pro Tips
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Rotate your plant occasionally to ensure even growth.</li>
                  <li>Many plants can be propagated from stem cuttings in water or soil.</li>
                  <li>Consider staking or providing support as the plant matures.</li>
                  <li>Keep an eye out for early signs of pests or disease.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailView;
