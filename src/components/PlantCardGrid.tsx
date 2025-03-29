
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
          <PlantCard key={plant.id} plant={plant} onSelectPlant={onSelectPlant} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No plants found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

// Separate component for each plant card to manage its own image loading state
const PlantCard: React.FC<{ plant: Plant; onSelectPlant: (plant: Plant) => void }> = ({ plant, onSelectPlant }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log("Image failed to load:", plant.image);
    setImageError(true);
    setImageLoaded(true); // We're done loading, though it failed
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden" 
      onClick={() => onSelectPlant(plant)}
    >
      <div className="aspect-square overflow-hidden relative bg-green-50">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        )}
        
        {imageError ? (
          // Show a placeholder with the plant icon if image fails to load
          <div className="w-full h-full flex items-center justify-center bg-green-100">
            <Leaf className="h-16 w-16 text-plant-primary opacity-70" />
          </div>
        ) : (
          <img
            src={plant.image}
            alt={`${plant.name} plant`}
            className={`w-full h-full object-cover transition-transform hover:scale-105 ${imageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-1">{plant.name}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Leaf className="h-4 w-4 text-plant-primary mr-1" />
          <span>{plant.difficulty}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCardGrid;
