
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Plant } from "@/types/plants";

interface PlantDetailHeaderProps {
  plant: Plant;
  onBack: () => void;
  onDelete: () => void;
}

const PlantDetailHeader: React.FC<PlantDetailHeaderProps> = ({ plant, onBack, onDelete }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mr-3"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to guides
        </Button>
        <h2 className="text-2xl font-bold text-plant-dark">{plant.name} Care Guide</h2>
      </div>
      
      {plant.isExternal && (
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete Guide
        </Button>
      )}
    </div>
  );
};

export default PlantDetailHeader;
