
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { savePlant } from "@/services/plants";
import { Plant } from "@/types/plants";
import { getPlantAnalysis, getTextAnalysis } from "@/utils/plantAnalysisData";

interface PlantCheckerContainerProps {
  initialPlant?: Plant;
  children: (props: {
    file: File | null;
    preview: string | null;
    description: string;
    isAnalyzing: boolean;
    isSaving: boolean;
    result: any | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTextSubmit: (e: React.FormEvent) => void;
    handleImageSubmit: (e: React.FormEvent) => void;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    saveResults: () => void;
    resetAnalysis: () => void;
    selectAnalysis: (plant: Plant) => void;
  }) => React.ReactNode;
}

const PlantCheckerContainer = ({ initialPlant, children }: PlantCheckerContainerProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

  // Handle initialPlant if provided (from navigation)
  useEffect(() => {
    if (initialPlant) {
      setPreview(initialPlant.image);
      
      // Convert the plant to the analysis result format
      const analysisResult = {
        plantName: initialPlant.name,
        condition: initialPlant.description?.replace("Plant health check result: ", "") || "Unknown",
        issues: initialPlant.careSteps?.find(step => step.title === "Identified Issues")?.description.split("\n") || [],
        recommendations: initialPlant.careSteps?.find(step => step.title === "Recommendations")?.description.split("\n") || []
      };
      
      setResult(analysisResult);
      
      toast({
        title: "Analysis loaded",
        description: `Viewing analysis for ${initialPlant.name}`,
      });
    }
  }, [initialPlant, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please describe your plant's condition.",
        variant: "destructive"
      });
      return;
    }
    
    analyzeText();
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Image required",
        description: "Please upload an image of your plant.",
        variant: "destructive"
      });
      return;
    }
    
    analyzeImage();
  };

  const analyzeText = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysisResult = getTextAnalysis(description);
      setResult(analysisResult);
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your plant description!",
      });
    }, 2000);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysisResult = getPlantAnalysis(file || undefined);
      setResult(analysisResult);
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your plant image!",
      });
    }, 2000);
  };

  const saveResults = async () => {
    if (!result) return;
    
    setIsSaving(true);
    
    try {
      const careSteps = [
        {
          title: "Identified Issues",
          description: result.issues.join("\n")
        },
        {
          title: "Recommendations",
          description: result.recommendations.join("\n")
        }
      ];
      
      const plantToSave: Omit<Plant, 'id'> = {
        name: result.plantName,
        image: preview || `https://source.unsplash.com/featured/?${encodeURIComponent(result.plantName)},plant`,
        difficulty: "Moderate",
        light: "Indirect light",
        water: "Regular",
        temperature: "65-80°F",
        description: `Plant health check result: ${result.condition}`,
        careSteps: careSteps,
        edible: false,
        edibleParts: ""
      };
      
      const savedPlant = await savePlant(plantToSave);
      
      if (savedPlant) {
        toast({
          title: "Success",
          description: "Plant analysis saved successfully!",
        });
      } else {
        throw new Error("Failed to save plant analysis");
      }
    } catch (error) {
      console.error("Error saving plant analysis:", error);
      toast({
        title: "Error",
        description: "Failed to save plant analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setPreview(null);
    setDescription("");
    setResult(null);
  };

  const selectAnalysis = (plant: Plant) => {
    const analysisResult = {
      plantName: plant.name,
      condition: plant.description?.replace("Plant health check result: ", "") || "Unknown",
      issues: plant.careSteps?.find(step => step.title === "Identified Issues")?.description.split("\n") || [],
      recommendations: plant.careSteps?.find(step => step.title === "Recommendations")?.description.split("\n") || []
    };
    
    setResult(analysisResult);
    setPreview(plant.image);
    
    toast({
      title: "Analysis loaded",
      description: `Viewing analysis for ${plant.name}`,
    });
  };

  return children({
    file,
    preview,
    description,
    isAnalyzing,
    isSaving,
    result,
    handleFileChange,
    handleTextSubmit,
    handleImageSubmit,
    handleDescriptionChange,
    saveResults,
    resetAnalysis,
    selectAnalysis
  });
};

export default PlantCheckerContainer;
