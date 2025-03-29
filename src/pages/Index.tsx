
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Upload, Users, BookOpen, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const features = [
  {
    title: "AI Plant Checker",
    description: "Upload photos of your plants to get AI-powered health analysis and care recommendations.",
    icon: Leaf,
    link: "/plant-checker",
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Plant Community",
    description: "Connect with fellow plant enthusiasts, share your garden, and exchange tips.",
    icon: Users,
    link: "/community",
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Growing Guides",
    description: "Get personalized step-by-step growing guides for your favorite plants.",
    icon: BookOpen,
    link: "/guides",
    color: "bg-amber-100 text-amber-700"
  },
  {
    title: "Fertilizer Store Locator",
    description: "Find the best garden stores and fertilizers near you based on your plant needs.",
    icon: MapPin,
    link: "/stores",
    color: "bg-red-100 text-red-700"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center plant-section">
          <h1 className="text-4xl md:text-6xl font-bold text-plant-dark mb-6">
            <span className="relative">
              GrowTastic
              <span className="absolute -top-6 -right-8">
                <Sparkles className="h-8 w-8 text-plant-accent animate-pulse" />
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
            Your AI-powered plant care companion. Diagnose problems, get personalized recommendations, and connect with other plant lovers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-plant-primary hover:bg-plant-dark">
              <Link to="/plant-checker">
                <Upload className="mr-2 h-5 w-5" />
                Check Your Plant
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-plant-primary text-plant-primary hover:bg-plant-light/20">
              <Link to="/guides">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Plant Guides
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 plant-section">
          <h2 className="text-3xl font-bold text-center mb-12 text-plant-dark">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="text-plant-primary hover:text-plant-dark hover:bg-plant-light/20">
                    <Link to={feature.link}>
                      Try it now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 plant-section">
          <h2 className="text-3xl font-bold text-center mb-12 text-plant-dark">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-plant-light/30 flex items-center justify-center mb-4">
                <Upload className="h-10 w-10 text-plant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-gray-600">Take a photo of your plant or describe the issue you're experiencing.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-plant-light/30 flex items-center justify-center mb-4">
                <Sparkles className="h-10 w-10 text-plant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600">Our AI analyzes the plant's condition and identifies potential issues.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-plant-light/30 flex items-center justify-center mb-4">
                <Leaf className="h-10 w-10 text-plant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow</h3>
              <p className="text-gray-600">Get personalized care recommendations and watch your plants thrive.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-plant-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Leaf className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">GrowTastic</span>
            </div>
            <div className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} GrowTastic. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
