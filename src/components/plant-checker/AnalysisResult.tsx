
import { AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisResultProps {
  result: any;
  preview: string | null;
  isSaving: boolean;
  onSaveResults: () => void;
  onResetAnalysis: () => void;
}

const AnalysisResult = ({ 
  result, 
  preview, 
  isSaving, 
  onSaveResults, 
  onResetAnalysis 
}: AnalysisResultProps) => {
  return (
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
          onClick={onResetAnalysis}
        >
          Check Another Plant
        </Button>
        <Button 
          className="bg-plant-primary hover:bg-plant-dark"
          onClick={onSaveResults}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Results"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisResult;
