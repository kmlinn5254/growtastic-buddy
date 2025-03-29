
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, DropletIcon, SunIcon, ThermometerIcon, Wind, CheckCircle } from "lucide-react";

interface PlantDetailProps {
  selectedPlant: {
    id: number;
    name: string;
    image: string;
    difficulty: string;
    light: string;
    water: string;
    temperature: string;
  };
  onBack: () => void;
}

const PlantDetailView: React.FC<PlantDetailProps> = ({ selectedPlant, onBack }) => {
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

  return (
    <div className="plant-section">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
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
  );
};

export default PlantDetailView;
