
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-plant-light/30">
            <Leaf className="h-12 w-12 text-plant-primary" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-plant-dark mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! This page has withered away.</p>
        <Button asChild size="lg" className="bg-plant-primary hover:bg-plant-dark">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
