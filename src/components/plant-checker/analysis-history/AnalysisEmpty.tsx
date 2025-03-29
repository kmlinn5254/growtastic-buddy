
import { Database } from "lucide-react";

const AnalysisEmpty = () => {
  return (
    <div className="text-center py-8">
      <Database className="mx-auto h-12 w-12 text-muted-foreground/50" />
      <p className="mt-4 text-lg font-medium">No analyses yet</p>
      <p className="text-muted-foreground">
        Use the AI Plant Checker to analyze your plants
      </p>
    </div>
  );
};

export default AnalysisEmpty;
