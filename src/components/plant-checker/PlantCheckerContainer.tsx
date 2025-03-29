
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { savePlant } from "@/services/plants";
import { Plant } from "@/types/plants";
import { getPlantAnalysis, getTextAnalysis } from "@/utils/plantAnalysisData";

interface PlantCheckerContainerProps {
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
  }) => React.ReactNode;
}

const PlantCheckerContainer = ({ children }: PlantCheckerContainerProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

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

  // Text analysis with variety
  const analyzeText = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get analysis based on text description
      const analysisResult = getTextAnalysis(description);
      setResult(analysisResult);
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your plant description!",
      });
    }, 2000);
  };

  // Image analysis with variety
  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get a random analysis result for the image
      const analysisResult = getPlantAnalysis(file || undefined);
      setResult(analysisResult);
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your plant image!",
      });
    }, 2000);
  };

  // Function to save analysis results
  const saveResults = async () => {
    if (!result) return;
    
    setIsSaving(true);
    
    try {
      // Format the recommendations and issues into care steps
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
      
      // Create plant object from analysis result
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
      
      // Save plant using the plantSaveService
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

  // Reset analysis
  const resetAnalysis = () => {
    setFile(null);
    setPreview(null);
    setDescription("");
    setResult(null);
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
    resetAnalysis
  });
};

export default PlantCheckerContainer;
