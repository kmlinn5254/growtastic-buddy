
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface SeasonalGuideViewProps {
  guide: {
    id: number;
    season: string;
    title: string;
    description: string;
    image: string;
    content: Array<{
      heading: string;
      text: string;
    }>;
  };
  onBack: () => void;
}

const SeasonalGuideView: React.FC<SeasonalGuideViewProps> = ({ guide, onBack }) => {
  return (
    <div className="plant-section">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mr-3"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to guides
        </Button>
        <h2 className="text-2xl font-bold text-plant-dark">{guide.title}</h2>
      </div>
      
      <div className="flex flex-col gap-8 mb-8">
        <div className="w-full rounded-lg overflow-hidden shadow-md h-64">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{guide.title}</CardTitle>
            <CardDescription>
              {guide.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {guide.content.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-3 text-plant-dark">{section.heading}</h3>
                  <p className="text-gray-700">{section.text}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-plant-light/20 rounded-lg border border-plant-light">
              <h4 className="text-lg font-semibold flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-plant-primary mr-2" />
                Seasonal Tips
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Plan your garden on paper before planting to optimize space and plant compatibility.</li>
                <li>Keep a garden journal to track what works well in your specific climate and conditions.</li>
                <li>Consider your local climate zone when choosing plants for the best success rate.</li>
                <li>Incorporate native plants which are often better adapted to local conditions and support wildlife.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeasonalGuideView;
