
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Plant } from "@/types/plants";

interface PlantCareInstructionsProps {
  plant: Plant;
}

const PlantCareInstructions: React.FC<PlantCareInstructionsProps> = ({ plant }) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Care Instructions</CardTitle>
        <CardDescription>
          Follow these steps to keep your {plant.name} healthy and thriving.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-6">
          {plant.careSteps ? (
            // Use imported care steps if available
            plant.careSteps.map((step, index) => (
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
  );
};

export default PlantCareInstructions;
