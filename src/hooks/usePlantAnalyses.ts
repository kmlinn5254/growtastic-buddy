
import { useState, useEffect, useCallback } from "react";
import { Plant } from "@/types/plants";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fromTable } from "@/lib/supabaseHelpers";
import { useLocation } from "react-router-dom";

interface UsePlantAnalysesOptions {
  itemsPerPage?: number;
}

/**
 * Custom hook to fetch and manage plant analyses data
 */
export function usePlantAnalyses({ itemsPerPage = 5 }: UsePlantAnalysesOptions = {}) {
  const [analyses, setAnalyses] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const location = useLocation();
  const isFaqsPage = location.pathname === "/faqs";

  /**
   * Extract plant condition from description
   */
  const extractCondition = useCallback((description?: string): { text: string, isHealthy: boolean } => {
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
  }, []);

  /**
   * Handle pagination changes
   */
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  /**
   * Fetch data from Supabase database
   */
  const fetchFromDatabase = useCallback(async (userId: string, start: number, end: number) => {
    try {
      const { data, error, count } = await fromTable('plants')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) throw error;
      if (!data) return { plantData: [], totalCount: 0 };

      // Map Supabase data to Plant type
      const plantData = data.map((item: any) => ({
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
      
      return { plantData, totalCount: count || 0 };
    } catch (error) {
      console.error("Error fetching from database:", error);
      return { plantData: [], totalCount: 0 };
    }
  }, []);

  /**
   * Fetch data from localStorage
   */
  const fetchFromLocalStorage = useCallback((start: number, end: number) => {
    try {
      const storedPlants = localStorage.getItem('external_plants');
      if (!storedPlants) return { plantData: [], totalCount: 0 };

      const parsedPlants: Plant[] = JSON.parse(storedPlants);
      return { 
        plantData: parsedPlants.slice(start, end), 
        totalCount: parsedPlants.length 
      };
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return { plantData: [], totalCount: 0 };
    }
  }, []);

  // Main effect for fetching analyses
  useEffect(() => {
    const fetchAnalyses = async () => {
      setIsLoading(true);
      try {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage - 1;
        let plantData: Plant[] = [];
        let totalCount = 0;

        // Try to fetch from Supabase first
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (userId) {
          // Fetch from database if user is authenticated
          const dbResult = await fetchFromDatabase(userId, start, end);
          plantData = dbResult.plantData;
          totalCount = dbResult.totalCount;
        }
        
        // If no data from database, try localStorage
        if (plantData.length === 0) {
          const localResult = await fetchFromLocalStorage(start, end);
          plantData = localResult.plantData;
          totalCount = localResult.totalCount;
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyses();
  }, [currentPage, itemsPerPage, toast, isFaqsPage, fetchFromDatabase, fetchFromLocalStorage]);

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
