
import { useState, useEffect } from "react";
import { Plant } from "@/types/plants";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fromTable } from "@/lib/supabaseHelpers";
import { useLocation } from "react-router-dom";

interface UsePlantAnalysesOptions {
  itemsPerPage: number;
}

export function usePlantAnalyses({ itemsPerPage = 5 }: UsePlantAnalysesOptions) {
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

        if (userId) {
          // Use fromTable helper to avoid TypeScript errors
          const { data, error, count } = await fromTable('plants')
            .select('*', { count: 'exact' })
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

          if (error) {
            console.error("Supabase error:", error);
            // Continue to localStorage fallback without throwing
          } else if (data && data.length > 0) {
            // Map Supabase data to Plant type with proper type assertions and null checking
            const plants: Plant[] = data.map((item: any) => ({
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
            
            setAnalyses(plants);
            setTotalPages(Math.ceil((count || 0) / itemsPerPage));
            setIsLoading(false);
            return; // Exit early if we have data
          }
        }
        
        // If no user is logged in or no DB results, try localStorage
        const storedPlants = localStorage.getItem('external_plants');
        if (storedPlants) {
          try {
            const parsedPlants: Plant[] = JSON.parse(storedPlants);
            const start = (currentPage - 1) * itemsPerPage;
            const end = Math.min(start + itemsPerPage, parsedPlants.length);
            setAnalyses(parsedPlants.slice(start, end));
            setTotalPages(Math.ceil(parsedPlants.length / itemsPerPage));
          } catch (e) {
            console.error("Error parsing localStorage data:", e);
            setAnalyses([]);
            setTotalPages(1);
          }
        } else {
          setAnalyses([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching plant analyses:", error);
        
        // Don't show toast on FAQs page
        if (!isFaqsPage) {
          toast({
            title: "Error",
            description: "Failed to load your previous analyses.",
            variant: "destructive"
          });
        }
        
        // Try localStorage as fallback
        const storedPlants = localStorage.getItem('external_plants');
        if (storedPlants) {
          try {
            const parsedPlants: Plant[] = JSON.parse(storedPlants);
            const start = (currentPage - 1) * itemsPerPage;
            const end = Math.min(start + itemsPerPage, parsedPlants.length);
            setAnalyses(parsedPlants.slice(start, end));
            setTotalPages(Math.ceil(parsedPlants.length / itemsPerPage));
          } catch (e) {
            console.error("Error parsing localStorage data:", e);
            setAnalyses([]);
            setTotalPages(1);
          }
        } else {
          setAnalyses([]);
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

  return {
    analyses,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange
  };
}
