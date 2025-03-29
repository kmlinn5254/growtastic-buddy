
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant } from "@/types/plants";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Clock, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface AnalysisHistoryProps {
  onSelectAnalysis: (plant: Plant) => void;
}

const AnalysisHistory = ({ onSelectAnalysis }: AnalysisHistoryProps) => {
  const [analyses, setAnalyses] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAnalyses = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from Supabase first
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (userId) {
          // Fetch user's plant analyses from Supabase
          // Using a more direct approach to avoid type issues
          const { data, error, count } = await supabase
            .from('plants')
            .select('*', { count: 'exact' })
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

          if (error) throw error;
          
          if (data && data.length > 0) {
            // Map Supabase data to Plant type with proper type assertions
            const plants: Plant[] = data.map((item: any) => ({
              id: Number(item.id) || 0, // Convert to number for Plant interface
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
            
            setAnalyses(plants);
            setTotalPages(Math.ceil((count || 0) / itemsPerPage));
          } else {
            // Fallback to localStorage if no database results
            const storedPlants = localStorage.getItem('external_plants');
            if (storedPlants) {
              const parsedPlants: Plant[] = JSON.parse(storedPlants);
              setAnalyses(parsedPlants);
              setTotalPages(Math.ceil(parsedPlants.length / itemsPerPage));
            } else {
              setAnalyses([]);
            }
          }
        } else {
          // If no user is logged in, just check localStorage
          const storedPlants = localStorage.getItem('external_plants');
          if (storedPlants) {
            const parsedPlants: Plant[] = JSON.parse(storedPlants);
            setAnalyses(parsedPlants);
            setTotalPages(Math.ceil(parsedPlants.length / itemsPerPage));
          }
        }
      } catch (error) {
        console.error("Error fetching plant analyses:", error);
        toast({
          title: "Error",
          description: "Failed to load your previous analyses.",
          variant: "destructive"
        });
        
        // Try localStorage as fallback
        const storedPlants = localStorage.getItem('external_plants');
        if (storedPlants) {
          const parsedPlants: Plant[] = JSON.parse(storedPlants);
          setAnalyses(parsedPlants);
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
                    onClick={() => onSelectAnalysis(analysis)}
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
            <Leaf className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No analyses yet</p>
            <p className="text-muted-foreground">
              Upload a plant image or describe your plant to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
