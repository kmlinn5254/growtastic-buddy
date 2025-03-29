
import { Plant } from "@/types/plants";
import AnalysisTable from "./AnalysisTable";

interface AnalysisHistoryTableProps {
  analyses: Plant[];
  onSelectAnalysis: (plant: Plant) => void;
}

const AnalysisHistoryTable = ({ analyses, onSelectAnalysis }: AnalysisHistoryTableProps) => {
  // Extract condition from description
  const extractCondition = (description?: string): { text: string, isHealthy: boolean } => {
    if (!description) return { text: "Unknown", isHealthy: false };
    
    const conditionPhrases = [
      "Healthy with minor issues", "Healthy", "Mildly distressed", "Stressed", 
      "Needs attention", "Minor problems", "Showing minor stress",
      "Needs care adjustments"
    ];
    
    for (const phrase of conditionPhrases) {
      if (description.includes(phrase)) {
        return { 
          text: phrase, 
          isHealthy: phrase.includes("Healthy")
        };
      }
    }
    
    return { text: "Unknown", isHealthy: false };
  };

  return (
    <AnalysisTable 
      analyses={analyses} 
      extractCondition={extractCondition}
      onSelectAnalysis={onSelectAnalysis}
    />
  );
};

export default AnalysisHistoryTable;
