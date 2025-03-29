
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlantAnalyses } from "@/hooks/usePlantAnalyses";
import AnalysisTable from "./analysis-history/AnalysisTable";
import AnalysisEmpty from "./analysis-history/AnalysisEmpty";

const PlantAnalysisList = () => {
  const navigate = useNavigate();
  const { 
    analyses, 
    isLoading, 
    currentPage, 
    totalPages, 
    handlePageChange,
    extractCondition,
    isFaqsPage
  } = usePlantAnalyses();

  const handleSelectAnalysis = (plant: any) => {
    navigate('/plant-checker', { state: { selectedPlant: plant } });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analysis History</CardTitle>
          <CardDescription>Loading your previous plant analyses...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-plant-primary" />
          Plant Analysis History
        </CardTitle>
        <CardDescription>
          View plant analyses and their results
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <>
            <AnalysisTable 
              analyses={analyses} 
              extractCondition={extractCondition}
              onSelectAnalysis={handleSelectAnalysis}
              showDate={!isFaqsPage}
            />
            
            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <AnalysisEmpty />
        )}
      </CardContent>
    </Card>
  );
};

export default PlantAnalysisList;
