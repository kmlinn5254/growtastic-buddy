
import React from 'react';
import { SunIcon, DropletIcon, ThermometerIcon, Wind, Leaf, UtensilsCrossed } from "lucide-react";
import { Plant } from "@/types/plants";

interface PlantQuickCareProps {
  plant: Plant;
}

const PlantQuickCare: React.FC<PlantQuickCareProps> = ({ plant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Quick Care Guide</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <SunIcon className="h-5 w-5 text-amber-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Light</p>
            <p className="text-gray-600">{plant.light}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <DropletIcon className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Water</p>
            <p className="text-gray-600">{plant.water}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <ThermometerIcon className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Temperature</p>
            <p className="text-gray-600">{plant.temperature}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Humidity</p>
            <p className="text-gray-600">{plant.difficulty === "Expert" ? "High" : plant.difficulty === "Difficult" ? "Medium to High" : "Medium"}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Leaf className="h-5 w-5 text-plant-primary mr-3" />
          <div>
            <p className="text-sm font-medium">Difficulty</p>
            <p className="text-gray-600">{plant.difficulty}</p>
          </div>
        </div>
        
        {/* Add edible information */}
        <div className="flex items-center">
          <UtensilsCrossed className="h-5 w-5 text-yellow-600 mr-3" />
          <div>
            <p className="text-sm font-medium">Edible</p>
            <p className="text-gray-600">
              {plant.edible ? 
                `Yes - ${plant.edibleParts}` : 
                `No - ${plant.edibleParts || "Not for consumption"}`}
            </p>
          </div>
        </div>
      </div>
      
      {plant.description && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-gray-600 text-sm">{plant.description}</p>
        </div>
      )}
    </div>
  );
};

export default PlantQuickCare;
