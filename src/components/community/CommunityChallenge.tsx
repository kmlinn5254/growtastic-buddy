
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CommunityChallenge = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center">
          <Sparkles className="h-5 w-5 mr-2" />
          Weekly Challenge
        </h3>
        <p>Show us your most creative plant arrangement! Use #PlantSpace to participate.</p>
      </div>
      <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
        Join
      </Button>
    </div>
  );
};

export default CommunityChallenge;
