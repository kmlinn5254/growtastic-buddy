
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlantChecker from "./pages/PlantChecker";
import Community from "./pages/Community";
import PlantGuides from "./pages/PlantGuides";
import StoreLocator from "./pages/StoreLocator";
import Settings from "./pages/Settings";
import MyGarden from "./pages/MyGarden";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ChatBot from "./components/ChatBot";
import { LanguageProvider } from "./hooks/useLanguage";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/useTheme";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance for each app render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <ThemeProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/plant-checker" element={<PlantChecker />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/guides" element={<PlantGuides />} />
                  <Route path="/stores" element={<StoreLocator />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/my-garden" element={<MyGarden />} />
                  <Route path="/login" element={<Login />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatBot />
              </BrowserRouter>
            </ThemeProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
