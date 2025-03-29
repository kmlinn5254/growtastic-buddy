
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant } from "@/types/plants";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Clock, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fromTable } from "@/lib/supabaseHelpers";
import { useNavigate } from "react-router-dom";

const PlantAnalysisList = () => {
  const [analyses, setAnalyses] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const itemsPerPage = 5;

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

          if (error) throw error;
          
          if (data && data.length > 0) {
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
        
        // Also check localStorage for non-authenticated users
        const storedPlants = localStorage.getItem('external_plants');
        if (storedPlants) {
          const parsedPlants: Plant[] = JSON.parse(storedPlants);
          
          if (!userId || plantData.length === 0) {
            // If no user is logged in or no DB data, use localStorage data
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            plantData = parsedPlants.slice(start, end);
            totalCount = parsedPlants.length;
          }
        }
        
        setAnalyses(plantData);
        setTotalPages(Math.max(1, Math.ceil(totalCount / itemsPerPage)));
      } catch (error) {
        console.error("Error fetching plant analyses:", error);
        toast({
          title: "Error",
          description: "Failed to load analysis history.",
          variant: "destructive"
        });
        
        // Try localStorage as fallback
        const storedPlants = localStorage.getItem('external_plants');
        if (storedPlants) {
          const parsedPlants: Plant[] = JSON.parse(storedPlants);
          const start = (currentPage - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          setAnalyses(parsedPlants.slice(start, end));
          setTotalPages(Math.ceil(parsedPlants.length / itemsPerPage));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyses();
  }, [currentPage, toast]);

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
          View your previous plant analyses and their results
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Plant</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => (
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
                      {analysis.description?.includes("Healthy") ? (
                        <span className="text-green-600">Healthy</span>
                      ) : (
                        <span className="text-amber-600">Needs attention</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {analysis.createdAt 
                        ? formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true })
                        : "Unknown date"}
                    </TableCell>
                  </TableRow>
                ))}
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
