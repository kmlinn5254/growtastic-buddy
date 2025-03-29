
import { Leaf } from "lucide-react";

const EmptyAnalysisState = () => {
  return (
    <div className="text-center py-8">
      <Leaf className="mx-auto h-12 w-12 text-muted-foreground/50" />
      <p className="mt-4 text-lg font-medium">No analyses yet</p>
      <p className="text-muted-foreground">
        Upload a plant image or describe your plant to get started
      </p>
    </div>
  );
};

export default EmptyAnalysisState;
