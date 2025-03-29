
import { useState, useEffect } from "react";
import { Plant } from "@/types/plants";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fromTable } from "@/lib/supabaseHelpers";
import { useLocation } from "react-router-dom";

interface UsePlantAnalysesOptions {
  itemsPerPage?: number;
}

export function usePlantAnalyses({ itemsPerPage = 5 }: UsePlantAnalysesOptions = {}) {
  const [analyses, setAnalyses] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const location = useLocation();
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
  }, [currentPage, itemsPerPage, toast, isFaqsPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  return {
    analyses,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
    extractCondition,
    isFaqsPage
  };
}
