
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plant } from "@/types/plants";
import { Camera, Calendar, Leaf, Sprout, ArrowLeft, ArrowRight, Film, ImagePlus } from "lucide-react";

interface GrowthEntry {
  id: string;
  date: string;
  image: string;
  notes: string;
  aiAnalysis?: {
    growth: string;
    health: string;
    suggestions: string[];
  };
}

interface GrowthTrackerProps {
  plant: Plant;
}

const GrowthTracker = ({ plant }: GrowthTrackerProps) => {
  const [entries, setEntries] = useState<GrowthEntry[]>(() => {
    const savedEntries = localStorage.getItem(`plant-growth-${plant.id}`);
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(`plant-growth-${plant.id}`, JSON.stringify(entries));
  }, [entries, plant.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
        return;
      }
      
      setCurrentImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast({
        title: "Image required",
        description: "Please upload an image of your plant.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEntry: GrowthEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        image: imagePreview,
        notes: notes,
      };
      
      // If we want to add AI analysis
      if (true) {
        setIsAnalyzing(true);
        
        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock AI analysis results
        newEntry.aiAnalysis = {
          growth: getRandomGrowthStatus(),
          health: getRandomHealthStatus(),
          suggestions: getRandomSuggestions(),
        };
        
        setIsAnalyzing(false);
      }
      
      setEntries(prev => [...prev, newEntry]);
      setCurrentEntryIndex(entries.length);
      
      setCurrentImage(null);
      setImagePreview(null);
      setNotes("");
      
      toast({
        title: "Growth update saved!",
        description: "Your plant's progress has been recorded.",
      });
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: "There was a problem saving your entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const navigateEntries = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentEntryIndex < entries.length - 1) {
      setCurrentEntryIndex(currentEntryIndex + 1);
    } else if (direction === 'prev' && currentEntryIndex > 0) {
      setCurrentEntryIndex(currentEntryIndex - 1);
    }
  };

  const createTimelapseVideo = () => {
    // This would actually create a video in a real implementation
    // For now, we'll just show a toast message
    toast({
      title: "Creating timelapse video",
      description: "Your plant growth timelapse is being generated and will be available soon!",
    });
  };

  // Helper functions for mock AI analysis
  const getRandomGrowthStatus = () => {
    const statuses = ["Excellent growth rate", "Moderate growth", "Slow but steady growth", "Rapid growth"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomHealthStatus = () => {
    const statuses = ["Very healthy", "Healthy with minor issues", "Some stress signs", "Needs attention"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomSuggestions = () => {
    const allSuggestions = [
      "Increase watering frequency slightly",
      "Reduce direct sunlight exposure",
      "Add a balanced fertilizer",
      "Check for signs of pests",
      "Increase humidity around the plant",
      "Prune older leaves to encourage new growth",
      "Consider repotting to a larger container",
      "Ensure good air circulation",
      "Add mulch to retain soil moisture",
      "Rotate the plant regularly for even growth"
    ];
    
    // Return 2-3 random suggestions
    const count = Math.floor(Math.random() * 2) + 2;
    const suggestions = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * allSuggestions.length);
      suggestions.push(allSuggestions[randomIndex]);
      allSuggestions.splice(randomIndex, 1);
    }
    
    return suggestions;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sprout className="h-5 w-5 mr-2 text-plant-primary" />
            Track {plant.name} Growth
          </CardTitle>
          <CardDescription>
            Upload photos of your plant regularly to track its progress and get AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigateEntries('prev')} 
                  disabled={currentEntryIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentEntryIndex + 1} of {entries.length}
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => navigateEntries('next')} 
                  disabled={currentEntryIndex === entries.length - 1}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <Card>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={entries[currentEntryIndex].image} 
                    alt={`${plant.name} growth day ${currentEntryIndex + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Day {currentEntryIndex + 1} - {new Date(entries[currentEntryIndex].date).toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {entries[currentEntryIndex].notes && (
                    <div>
                      <h4 className="font-medium mb-1">Notes:</h4>
                      <p className="text-gray-700">{entries[currentEntryIndex].notes}</p>
                    </div>
                  )}
                  
                  {entries[currentEntryIndex].aiAnalysis && (
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-3 text-plant-dark">AI Analysis:</h4>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Growth:</span> {entries[currentEntryIndex].aiAnalysis.growth}
                        </p>
                        <p>
                          <span className="font-medium">Plant Health:</span> {entries[currentEntryIndex].aiAnalysis.health}
                        </p>
                        {entries[currentEntryIndex].aiAnalysis.suggestions.length > 0 && (
                          <div>
                            <p className="font-medium">Suggestions:</p>
                            <ul className="list-disc pl-5 mt-1">
                              {entries[currentEntryIndex].aiAnalysis.suggestions.map((suggestion, idx) => (
                                <li key={idx}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {entries.length >= 3 && (
                <Button className="w-full" onClick={createTimelapseVideo}>
                  <Film className="h-4 w-4 mr-2" />
                  Create Growth Timelapse
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              <Leaf className="h-8 w-8 mx-auto mb-3 text-plant-primary opacity-50" />
              <p>No growth entries yet. Upload your first plant photo!</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Growth Entry</CardTitle>
          <CardDescription>
            Upload a new photo of your {plant.name} to track its progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="growth-image-upload" 
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                  ${imagePreview ? 'border-plant-primary bg-plant-light/10' : 'border-gray-300 hover:border-plant-light bg-gray-50'}`}
              >
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Plant preview" 
                    className="h-full object-contain" 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
                  </div>
                )}
                <Input 
                  id="growth-image-upload" 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <Textarea
                id="notes"
                placeholder="Any observations about your plant's growth, health, or care..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-plant-primary hover:bg-plant-primary/90"
              disabled={isUploading || isAnalyzing || !imagePreview}
            >
              {isUploading ? (
                "Uploading..."
              ) : isAnalyzing ? (
                "Analyzing with AI..."
              ) : (
                <>
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Save Growth Update
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthTracker;
