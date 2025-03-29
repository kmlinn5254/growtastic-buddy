
import React, { useState } from 'react';
import { Plant } from "@/types/plants";
import { Leaf } from "lucide-react";

interface PlantImageProps {
  plant: Plant;
}

const PlantImage: React.FC<PlantImageProps> = ({ plant }) => {
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      {hasError ? (
        <div className="w-full h-full aspect-square flex items-center justify-center bg-green-100">
          <div className="text-center p-4">
            <Leaf className="h-16 w-16 mx-auto text-plant-primary opacity-70" />
            <p className="mt-2 text-plant-dark font-medium">{plant.name}</p>
          </div>
        </div>
      ) : (
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-auto object-cover aspect-square"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export default PlantImage;
