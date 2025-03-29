
import Navigation from "@/components/Navigation";
import CommunityContent from "@/components/community/CommunityContent";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <CommunityContent />
      </main>
    </div>
  );
};

export default Community;
