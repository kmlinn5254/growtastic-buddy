
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
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
