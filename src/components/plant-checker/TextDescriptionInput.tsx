
import { Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextDescriptionInputProps {
  description: string;
  isAnalyzing: boolean;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextSubmit: (e: React.FormEvent) => void;
}

const TextDescriptionInput = ({ 
  description, 
  isAnalyzing, 
  onDescriptionChange, 
  onTextSubmit 
}: TextDescriptionInputProps) => {
  return (
    <form onSubmit={onTextSubmit}>
      <div className="mb-6">
        <Textarea
          placeholder="Example: My fiddle leaf fig has yellowing leaves and brown spots. The soil has been kept moist, and it's near a south-facing window."
          className="plant-input h-64 resize-none"
          value={description}
          onChange={onDescriptionChange}
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
  );
};

export default TextDescriptionInput;
