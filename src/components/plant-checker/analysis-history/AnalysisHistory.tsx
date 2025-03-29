
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Plant } from "@/types/plants";
import { usePlantAnalyses } from "@/hooks/usePlantAnalyses";
import AnalysisHistoryTable from "./AnalysisHistoryTable";
import AnalysisPagination from "./AnalysisPagination";
import EmptyAnalysisState from "./EmptyAnalysisState";

interface AnalysisHistoryProps {
  onSelectAnalysis: (plant: Plant) => void;
}

const AnalysisHistory = ({ onSelectAnalysis }: AnalysisHistoryProps) => {
  const { 
    analyses, 
    isLoading, 
    currentPage, 
    totalPages, 
    handlePageChange 
  } = usePlantAnalyses({ itemsPerPage: 5 });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Analysis History</CardTitle>
          <CardDescription>Loading your previous plant analyses...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-plant-primary" />
          Your Analysis History
        </CardTitle>
        <CardDescription>
          View your previous plant analyses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <>
            <AnalysisHistoryTable 
              analyses={analyses} 
              onSelectAnalysis={onSelectAnalysis} 
            />
            
            <AnalysisPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyAnalysisState />
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
