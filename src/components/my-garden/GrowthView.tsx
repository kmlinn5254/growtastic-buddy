
import { Plant } from "@/types/plants";
import GrowthTracker from "@/components/GrowthTracker";

interface GrowthViewProps {
  plant: Plant;
  onBack: () => void;
}

const GrowthView: React.FC<GrowthViewProps> = ({ plant, onBack }) => {
  return (
    <div className="space-y-4">
      <button 
        onClick={onBack}
        className="text-plant-primary hover:text-plant-dark flex items-center"
      >
        ← Back to my plants
      </button>
      <GrowthTracker plant={plant} />
    </div>
  );
};

export default GrowthView;
