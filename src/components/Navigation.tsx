
import { Link, useLocation } from "react-router-dom";
import { Leaf, Book, Users, Map, Settings, Home, Sprout, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Plant Checker", path: "/plant-checker", icon: Leaf },
    { label: "My Garden", path: "/my-garden", icon: Sprout },
    { label: "Community", path: "/community", icon: Users },
    { label: "Plant Guides", path: "/guides", icon: Book },
    { label: "Store Locator", path: "/stores", icon: Map },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const renderNavLinks = (mobile = false) => (
    navItems.map((item) => {
      const isActive = location.pathname === item.path;
      const Icon = item.icon;
      
      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={handleLinkClick}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive 
              ? "bg-plant-primary text-white" 
              : "text-gray-700 hover:bg-plant-light/20 dark:text-gray-300 dark:hover:bg-gray-800"
          } ${mobile ? "w-full" : ""}`}
        >
          <Icon className="h-5 w-5 mr-1" />
          {item.label}
        </Link>
      );
    })
  );

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-plant-primary" />
              <span className="ml-2 text-xl font-bold text-plant-dark">ArgoMind</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {renderNavLinks()}
            </div>
          </div>
          
          {/* Mobile navigation */}
          <div className="block md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-plant-dark hover:text-plant-primary">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] py-6">
                <div className="flex flex-col space-y-4 mt-4">
                  {renderNavLinks(true)}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
