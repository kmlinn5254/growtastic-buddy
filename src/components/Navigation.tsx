
import { Link, useLocation } from "react-router-dom";
import { Brain, Book, Users, Map, Settings, Home, Sprout, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Plant Checker", path: "/plant-checker", icon: Sprout },
    { label: "My Garden", path: "/my-garden", icon: Sprout },
    { label: "Community", path: "/community", icon: Users },
    { label: "Plant Guides", path: "/guides", icon: Book },
    { label: "Store Locator", path: "/stores", icon: Map },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  // Core navigation items for mobile bottom nav
  const coreNavItems = navItems.slice(0, 5);
  
  // Additional items for the "more" menu
  const moreNavItems = navItems.slice(5);

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

  const renderBottomNavLinks = () => (
    coreNavItems.map((item) => {
      const isActive = location.pathname === item.path;
      const Icon = item.icon;
      
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center px-1 py-2 rounded-md text-xs font-medium transition-colors ${
            isActive 
              ? "text-plant-primary" 
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <Icon className={`h-5 w-5 mb-1 ${isActive ? "text-plant-primary" : "text-gray-500 dark:text-gray-400"}`} />
          <span>{item.label.split(' ')[0]}</span>
        </Link>
      );
    })
  );

  return (
    <>
      <nav className="bg-white shadow-md dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Brain className="h-8 w-8 text-plant-primary" />
                <span className="ml-2 text-xl font-bold text-plant-dark">ArgoMind</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {renderNavLinks()}
              </div>
            </div>
            
            {/* Mobile - we'll hide this since we're using bottom nav */}
            <div className="block md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-plant-dark hover:text-plant-primary">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="flex flex-col p-4 pt-0 space-y-2">
                    <h2 className="text-lg font-semibold py-2 border-b">More options</h2>
                    {moreNavItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors ${
                            isActive 
                              ? "bg-plant-primary text-white" 
                              : "text-gray-700 hover:bg-plant-light/20 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-2" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 z-50">
          <div className="flex justify-around items-center h-16">
            {renderBottomNavLinks()}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
