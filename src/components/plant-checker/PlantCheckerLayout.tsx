
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileText } from "lucide-react";
import ImageUploader from "./ImageUploader";
import TextDescriptionInput from "./TextDescriptionInput";
import AnalysisResult from "./AnalysisResult";
import { Plant } from "@/types/plants";
import AnalysisHistory from "./AnalysisHistory";

interface PlantCheckerLayoutProps {
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
}

const PlantCheckerLayout = ({
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
}: PlantCheckerLayoutProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10 plant-section">
        <h1 className="text-4xl font-bold text-plant-dark mb-4">AI Plant Checker</h1>
        <p className="text-lg text-gray-600">
          Upload a photo of your plant or describe its condition to get AI-powered analysis and care recommendations.
        </p>
      </div>
      
      {!result ? (
        <div className="grid grid-cols-1 gap-8">
          <div className="plant-section">
            <Tabs defaultValue="image" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
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
                      onDescriptionChange={handleDescriptionChange}
                      onTextSubmit={handleTextSubmit}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <AnalysisHistory onSelectAnalysis={selectAnalysis} />
          </div>
        </div>
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
  );
};

export default PlantCheckerLayout;
