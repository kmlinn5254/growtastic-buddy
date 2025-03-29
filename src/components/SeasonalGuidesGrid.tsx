
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SeasonalGuide {
  id: number;
  season: string;
  title: string;
  description: string;
  image: string;
  content: Array<{
    heading: string;
    text: string;
  }>;
}

interface SeasonalGuidesGridProps {
  guides: SeasonalGuide[];
  onSelectGuide: (guide: SeasonalGuide) => void;
}

const SeasonalGuidesGrid: React.FC<SeasonalGuidesGridProps> = ({ guides, onSelectGuide }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {guides.map((guide) => (
        <Card 
          key={guide.id} 
          className="hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
          onClick={() => onSelectGuide(guide)}
        >
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/3">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-plant-light/30 text-plant-dark">
                  {guide.season}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{guide.description}</p>
              <Button variant="ghost" className="mt-2 self-start text-plant-primary">
                Read Guide
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SeasonalGuidesGrid;
