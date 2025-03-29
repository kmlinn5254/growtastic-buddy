
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const CommunityChallenge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleJoinClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to participate in challenges.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    // Get post form element and set focus
    const postFormElement = document.querySelector('textarea[placeholder*="Share your plant journey"]');
    
    if (postFormElement) {
      // Set value to hashtag and place cursor at beginning
      const hashTag = "#PlantSpace ";
      (postFormElement as HTMLTextAreaElement).value = hashTag;
      (postFormElement as HTMLTextAreaElement).focus();
      
      // Trigger a change event to update state
      const event = new Event('change', { bubbles: true });
      postFormElement.dispatchEvent(event);
      
      // Scroll to post form
      postFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      toast({
        title: "Challenge joined!",
        description: "Start posting with the #PlantSpace hashtag."
      });
    } else {
      // If the form element isn't found
      toast({
        title: "Ready to participate!",
        description: "Share your plant arrangement with the #PlantSpace hashtag."
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center">
          <Sparkles className="h-5 w-5 mr-2" />
          Weekly Challenge
        </h3>
        <p>Show us your most creative plant arrangement! Use #PlantSpace to participate.</p>
      </div>
      <Button 
        variant="secondary" 
        className="bg-white text-green-600 hover:bg-gray-100"
        onClick={handleJoinClick}
      >
        Join
      </Button>
    </div>
  );
};

export default CommunityChallenge;
