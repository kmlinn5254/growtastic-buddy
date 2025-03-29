
import React from 'react';
import { Plant } from "@/types/plants";

interface PlantImageProps {
  plant: Plant;
}

const PlantImage: React.FC<PlantImageProps> = ({ plant }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img
        src={plant.image}
        alt={plant.name}
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
  );
};

export default PlantImage;
