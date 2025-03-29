
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant } from "@/types/plants";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fromTable } from "@/lib/supabaseHelpers";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PlantAnalysisList = () => {
  const [analyses, setAnalyses] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 5;
  const isFaqsPage = location.pathname === "/faqs";

  useEffect(() => {
    const fetchAnalyses = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from Supabase first
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        let plantData: Plant[] = [];
        let totalCount = 0;

        if (userId) {
          // Use fromTable helper to avoid TypeScript errors
          const { data, error, count } = await fromTable('plants')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

          if (error) {
            console.error("Supabase error:", error);
            // Don't throw here, just continue to localStorage fallback
          } else if (data && data.length > 0) {
            // Map Supabase data to Plant type with proper type assertions and null checking
            plantData = data.map((item: any) => ({
              id: typeof item.id === 'number' ? item.id : Number(item.id) || 0,
              name: item.name || "",
              image: item.image || "",
              difficulty: item.difficulty || "",
              light: item.light || "",
              water: item.water || "",
              temperature: item.temperature || "",
              description: item.description || "",
              growTime: item.grow_time || "",
              edible: Boolean(item.edible),
              edibleParts: item.edible_parts || "",
              createdAt: item.created_at || new Date().toISOString()
            }));
            
            totalCount = count || 0;
          }
        }
        
        // Also check localStorage for non-authenticated users or if no DB data was found
        if (plantData.length === 0) {
          const storedPlants = localStorage.getItem('external_plants');
          if (storedPlants) {
            try {
              const parsedPlants: Plant[] = JSON.parse(storedPlants);
              const start = (currentPage - 1) * itemsPerPage;
              const end = start + itemsPerPage;
              plantData = parsedPlants.slice(start, end);
              totalCount = parsedPlants.length;
            } catch (e) {
              console.error("Error parsing localStorage data:", e);
            }
          }
        }
        
        setAnalyses(plantData);
        setTotalPages(Math.max(1, Math.ceil(totalCount / itemsPerPage)));
      } catch (error) {
        console.error("Error fetching plant analyses:", error);
        // Don't show toast on FAQs page to avoid the error message
        if (!isFaqsPage) {
          toast({
            title: "Error",
            description: "Failed to load analysis history.",
            variant: "destructive"
          });
        }
        
        // Try localStorage as fallback
        const storedPlants = localStorage.getItem('external_plants');
        if (storedPlants) {
          try {
            const parsedPlants: Plant[] = JSON.parse(storedPlants);
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setAnalyses(parsedPlants.slice(start, end));
            setTotalPages(Math.ceil(parsedPlants.length / itemsPerPage));
          } catch (e) {
            console.error("Error parsing localStorage data:", e);
            setAnalyses([]);
            setTotalPages(1);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyses();
  }, [currentPage, toast, isFaqsPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAnalysis = (plant: Plant) => {
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
          {isFaqsPage ? "View plant analyses and their results" : "View your previous plant analyses and their results"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Plant</TableHead>
                  <TableHead>{isFaqsPage ? "Disease" : "Name"}</TableHead>
                  <TableHead>Condition</TableHead>
                  {!isFaqsPage && <TableHead className="text-right">Date</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => {
                  // Extract condition from description if available
                  let condition = "Unknown";
                  if (analysis.description) {
                    // Look for common condition phrases in the description
                    const conditionPhrases = [
                      "Healthy with minor issues", "Healthy", "Mildly distressed", "Stressed", 
                      "Needs attention", "Minor problems", "Showing minor stress",
                      "Needs care adjustments"
                    ];
                    
                    for (const phrase of conditionPhrases) {
                      if (analysis.description.includes(phrase)) {
                        condition = phrase;
                        break;
                      }
                    }
                  }
                  
                  return (
                    <TableRow 
                      key={analysis.id} 
                      className="cursor-pointer hover:bg-muted/60"
                      onClick={() => handleSelectAnalysis(analysis)}
                    >
                      <TableCell>
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img 
                            src={analysis.image} 
                            alt={analysis.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{analysis.name}</TableCell>
                      <TableCell>
                        {condition.includes("Healthy") ? (
                          <span className="text-green-600">{condition}</span>
                        ) : (
                          <span className="text-amber-600">{condition}</span>
                        )}
                      </TableCell>
                      {!isFaqsPage && (
                        <TableCell className="text-right text-muted-foreground">
                          {analysis.createdAt 
                            ? new Date(analysis.createdAt).toLocaleDateString()
                            : "Unknown date"}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
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
          <div className="text-center py-8">
            <Database className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No analyses yet</p>
            <p className="text-muted-foreground">
              Use the AI Plant Checker to analyze your plants
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlantAnalysisList;
