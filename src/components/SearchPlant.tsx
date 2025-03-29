
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchPlantProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchPlant: React.FC<SearchPlantProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-8 max-w-md mx-auto plant-section">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for any plant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 plant-input"
        />
      </div>
    </div>
  );
};

export default SearchPlant;
