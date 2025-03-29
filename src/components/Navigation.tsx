
import { Link, useLocation } from "react-router-dom";
import { Book, Users, Map, Settings, Home, Sprout, Menu, X, Leaf, LogIn, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // Determine which settings/login item to show based on auth state
  const settingsOrLoginItem = isAuthenticated
    ? { label: "Settings", path: "/settings", icon: Settings, id: "settings" }
    : { label: "Login", path: "/login", icon: LogIn, id: "login" };
  
  const navItems = [
    { label: "Home", path: "/", icon: Home, id: "home" },
    { label: "Plant Checker", path: "/plant-checker", icon: Leaf, id: "plant-checker" },
    { label: "Community", path: "/community", icon: Users, id: "community" },
    { label: "Plant Guides", path: "/guides", icon: Book, id: "guides" },
    { label: "Store Locator", path: "/stores", icon: Map, id: "stores" },
    settingsOrLoginItem, // Add the dynamic item
  ];

  // Core navigation items for mobile bottom nav
  const coreNavItems = navItems.slice(0, 5);
  
  // Additional items for the "more" menu
  const moreNavItems = navItems.slice(5);

  // Set active tab based on location path
  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = navItems.find(item => item.path === currentPath);
    if (matchingItem) {
      setActiveTabId(matchingItem.id);
    }
  }, [location.pathname]);

  const handleLinkClick = (id: string) => {
    setActiveTabId(id);
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
          onClick={() => handleLinkClick(item.id)}
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
          onClick={() => handleLinkClick(item.id)}
          className={`flex flex-col items-center justify-center px-1 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
            isActive 
              ? "text-plant-primary scale-110" 
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <div className={`p-2 rounded-full mb-1 transition-all duration-200 ${isActive ? "bg-plant-light/30 dark:bg-plant-dark/30" : ""}`}>
            <Icon className={`h-5 w-5 ${isActive ? "text-plant-primary" : "text-gray-500 dark:text-gray-400"}`} />
          </div>
          <span className="transition-all duration-200">{item.label}</span>
        </Link>
      );
    })
  );

  return (
    <>
      <nav className="bg-white shadow-md dark:bg-gray-900 dark:border-b dark:border-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Leaf className="h-8 w-8 text-plant-primary" />
                <span className="ml-2 text-xl font-bold text-plant-dark dark:text-white">ArgoMind</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {renderNavLinks()}
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="ml-2 text-gray-700 dark:text-gray-300"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            
            {/* Mobile - we'll hide this since we're using bottom nav */}
            <div className="block md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="mr-2 text-gray-700 dark:text-gray-300"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-plant-dark hover:text-plant-primary dark:text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="flex flex-col p-4 pt-0 space-y-2">
                    <h2 className="text-lg font-semibold py-2 border-b dark:border-gray-700">More options</h2>
                    {moreNavItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => handleLinkClick(item.id)}
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
          <div className="flex justify-around items-center py-2">
            {renderBottomNavLinks()}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
