
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import { savePlant } from "@/services/plants";
import { Plant } from "@/types/plants";
import ImageUploader from "@/components/plant-checker/ImageUploader";
import TextDescriptionInput from "@/components/plant-checker/TextDescriptionInput";
import AnalysisResult from "@/components/plant-checker/AnalysisResult";
import { getPlantAnalysis, getTextAnalysis } from "@/utils/plantAnalysisData";

const PlantChecker = () => {
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
      // In a real application, this would analyze the actual image
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 plant-section">
            <h1 className="text-4xl font-bold text-plant-dark mb-4">AI Plant Checker</h1>
            <p className="text-lg text-gray-600">
              Upload a photo of your plant or describe its condition to get AI-powered analysis and care recommendations.
            </p>
          </div>
          
          {!result ? (
            <Tabs defaultValue="image" className="plant-section">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="image" className="flex items-center">
                  <Camera className="mr-2 h-4 w-4" />
                  Image Upload
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Text Description
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="image">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Plant Image</CardTitle>
                    <CardDescription>
                      Take a clear photo of your plant to get the most accurate analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ImageUploader 
                      preview={preview}
                      isAnalyzing={isAnalyzing}
                      onImageSubmit={handleImageSubmit}
                      onFileChange={handleFileChange}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="text">
                <Card>
                  <CardHeader>
                    <CardTitle>Describe Your Plant</CardTitle>
                    <CardDescription>
                      Tell us about your plant's condition, symptoms, and any issues you've noticed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TextDescriptionInput 
                      description={description}
                      isAnalyzing={isAnalyzing}
                      onDescriptionChange={(e) => setDescription(e.target.value)}
                      onTextSubmit={handleTextSubmit}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="plant-section">
              <AnalysisResult 
                result={result}
                preview={preview}
                isSaving={isSaving}
                onSaveResults={saveResults}
                onResetAnalysis={resetAnalysis}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlantChecker;
