
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, FileText, Sparkles, Leaf, Info, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import { savePlant } from "@/services/plants";
import { Plant } from "@/types/plants";

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

  // Mock function for text analysis
  const analyzeText = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is a mock response
      setResult({
        plantName: "Fiddle Leaf Fig",
        condition: "Stressed",
        issues: [
          "Yellowing leaves indicate overwatering",
          "Brown spots suggest sunburn",
          "Leaves drooping may indicate low humidity"
        ],
        recommendations: [
          "Water only when top 2 inches of soil are dry",
          "Move to a location with bright, indirect light",
          "Increase humidity with a humidifier or pebble tray",
          "Apply a balanced fertilizer once a month during growing season"
        ]
      });
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your plant description!",
      });
    }, 2000);
  };

  // Mock function for image analysis
  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is a mock response
      setResult({
        plantName: "Monstera Deliciosa",
        condition: "Healthy with minor issues",
        issues: [
          "Some leaf edges showing brown tips",
          "Minor pest infestation (spider mites)"
        ],
        recommendations: [
          "Increase humidity around the plant",
          "Wipe leaves with neem oil solution to treat mites",
          "Ensure good air circulation around the plant",
          "Maintain consistent watering schedule"
        ]
      });
      
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
                    <form onSubmit={handleImageSubmit}>
                      <div className="mb-6">
                        <label 
                          htmlFor="image-upload" 
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
                            ${preview ? 'border-plant-primary bg-plant-light/10' : 'border-gray-300 hover:border-plant-light bg-gray-50'}`}
                        >
                          {preview ? (
                            <img 
                              src={preview} 
                              alt="Plant preview" 
                              className="h-full object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 10MB)</p>
                            </div>
                          )}
                          <Input 
                            id="image-upload" 
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-plant-primary hover:bg-plant-dark"
                        disabled={isAnalyzing || !file}
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Leaf className="mr-2 h-4 w-4" />
                            Analyze Plant
                          </>
                        )}
                      </Button>
                    </form>
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
                    <form onSubmit={handleTextSubmit}>
                      <div className="mb-6">
                        <Textarea
                          placeholder="Example: My fiddle leaf fig has yellowing leaves and brown spots. The soil has been kept moist, and it's near a south-facing window."
                          className="plant-input h-64 resize-none"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-plant-primary hover:bg-plant-dark"
                        disabled={isAnalyzing || !description.trim()}
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Leaf className="mr-2 h-4 w-4" />
                            Analyze Description
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="plant-section">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{result.plantName}</CardTitle>
                      <CardDescription className="text-lg">
                        Condition: {result.condition}
                      </CardDescription>
                    </div>
                    {preview && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img 
                          src={preview} 
                          alt="Plant" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold flex items-center mb-3 text-amber-600">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Identified Issues
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {result.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-gray-700">{issue}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3 text-plant-primary">
                      <Info className="mr-2 h-5 w-5" />
                      Recommendations
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {result.recommendations.map((recommendation: string, index: number) => (
                        <li key={index} className="text-gray-700">{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetAnalysis}
                  >
                    Check Another Plant
                  </Button>
                  <Button 
                    className="bg-plant-primary hover:bg-plant-dark"
                    onClick={saveResults}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Results"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlantChecker;
