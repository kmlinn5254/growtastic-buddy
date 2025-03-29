
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";

interface Plant {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  light: string;
  water: string;
  temperature: string;
}

interface PlantCardGridProps {
  plants: Plant[];
  searchQuery: string;
  onSelectPlant: (plant: Plant) => void;
}

const PlantCardGrid: React.FC<PlantCardGridProps> = ({ plants, searchQuery, onSelectPlant }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plants.length > 0 ? (
        plants.map((plant) => (
          <Card 
            key={plant.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden" 
            onClick={() => onSelectPlant(plant)}
          >
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
  );
};

export default PlantCardGrid;
