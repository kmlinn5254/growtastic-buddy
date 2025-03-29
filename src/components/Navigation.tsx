
import { Link, useLocation } from "react-router-dom";
import { Leaf, Book, Users, Map, Settings, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Plant Checker", path: "/plant-checker", icon: Leaf },
    { label: "Community", path: "/community", icon: Users },
    { label: "Plant Guides", path: "/guides", icon: Book },
    { label: "Store Locator", path: "/stores", icon: Map },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

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
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-plant-primary text-white" 
                        : "text-gray-700 hover:bg-plant-light/20 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-1" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Mobile navigation - will be implemented in the future */}
          <div className="block md:hidden">
            <button className="text-plant-dark hover:text-plant-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
