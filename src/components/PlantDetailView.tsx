
import React from 'react';
import { Plant, deleteExternalPlant } from "@/services/plantService";
import { useToast } from "@/hooks/use-toast";
import PlantDetailHeader from '@/components/plant-detail/PlantDetailHeader';
import PlantImage from '@/components/plant-detail/PlantImage';
import PlantQuickCare from '@/components/plant-detail/PlantQuickCare';
import PlantCareInstructions from '@/components/plant-detail/PlantCareInstructions';

interface PlantDetailProps {
  selectedPlant: Plant;
  onBack: () => void;
}

const PlantDetailView: React.FC<PlantDetailProps> = ({ selectedPlant, onBack }) => {
  const { toast } = useToast();
  
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
      <PlantDetailHeader 
        plant={selectedPlant} 
        onBack={onBack} 
        onDelete={handleDelete} 
      />
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <PlantImage plant={selectedPlant} />
          
          <div className="mt-6">
            <PlantQuickCare plant={selectedPlant} />
          </div>
        </div>
        
        <div className="md:w-2/3">
          <PlantCareInstructions plant={selectedPlant} />
        </div>
      </div>
    </div>
  );
};

export default PlantDetailView;
