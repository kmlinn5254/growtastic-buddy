
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, MapPinned, Phone, Clock, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock data for stores
const stores = [
  {
    id: 1,
    name: "Green Thumb Garden Center",
    address: "123 Plant St, Greenville, CA 95023",
    phone: "(555) 123-4567",
    rating: 4.8,
    reviews: 245,
    hours: "9:00 AM - 6:00 PM",
    distance: "1.2 miles",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    specialties: ["Organic Fertilizers", "Rare Plants", "Garden Tools"]
  },
  {
    id: 2,
    name: "Urban Jungle Plant Shop",
    address: "456 Garden Ave, San Francisco, CA 94107",
    phone: "(555) 987-6543",
    rating: 4.6,
    reviews: 189,
    hours: "10:00 AM - 7:00 PM",
    distance: "2.5 miles",
    image: "https://images.unsplash.com/photo-1581281665906-999deb497ad6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    specialties: ["Indoor Plants", "Pottery", "Plant Care Products"]
  },
  {
    id: 3,
    name: "Blooming Acres Nursery",
    address: "789 Bloom Blvd, Oakland, CA 94612",
    phone: "(555) 456-7890",
    rating: 4.9,
    reviews: 312,
    hours: "8:00 AM - 5:00 PM",
    distance: "4.8 miles",
    image: "https://images.unsplash.com/photo-1467043198406-dc953a3defa0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    specialties: ["Trees & Shrubs", "Landscaping", "Bulk Soil & Mulch"]
  },
  {
    id: 4,
    name: "Plant Paradise",
    address: "101 Fern Lane, Berkeley, CA 94720",
    phone: "(555) 789-0123",
    rating: 4.5,
    reviews: 178,
    hours: "9:00 AM - 6:00 PM",
    distance: "5.3 miles",
    image: "https://images.unsplash.com/photo-1603561564579-92413b7049c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    specialties: ["Succulents", "Air Plants", "Organic Pest Control"]
  }
];

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<typeof stores[0] | null>(null);
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Set first store as selected when component mounts or when filtered stores change
  useEffect(() => {
    if (filteredStores.length > 0) {
      setSelectedStore(filteredStores[0]);
    } else {
      setSelectedStore(null);
    }
  }, [filteredStores]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 plant-section">
            <h1 className="text-4xl font-bold text-plant-dark mb-4">Fertilizer Store Locator</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find garden centers and plant shops near you that offer the fertilizers and supplies you need.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 plant-section">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, location, or product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 plant-input"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[70vh] pr-2 space-y-4">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <Card 
                      key={store.id}
                      className={`hover:shadow-md transition-shadow cursor-pointer ${
                        selectedStore?.id === store.id ? 'ring-2 ring-plant-primary' : ''
                      }`}
                      onClick={() => setSelectedStore(store)}
                    >
                      <CardContent className="p-0">
                        <div className="flex h-24">
                          <div className="w-1/3 h-full">
                            <img
                              src={store.image}
                              alt={store.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-3">
                            <h3 className="font-medium text-sm mb-1 truncate">{store.name}</h3>
                            <div className="flex items-center text-xs text-gray-600 mb-1">
                              <MapPin className="h-3 w-3 mr-1 text-plant-primary" />
                              <span className="truncate">{store.distance}</span>
                            </div>
                            <div className="flex items-center text-xs">
                              <Star className="h-3 w-3 text-amber-400 mr-1" />
                              <span>{store.rating}</span>
                              <span className="text-gray-400 ml-1">({store.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No stores found matching "{searchQuery}"</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-plant-primary border-plant-primary"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 plant-section">
              {selectedStore ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="h-64 relative">
                      <img
                        src={selectedStore.image}
                        alt={selectedStore.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h2 className="text-white text-2xl font-bold">{selectedStore.name}</h2>
                        <div className="flex items-center text-white/90">
                          <Star className="h-4 w-4 text-amber-400 mr-1" />
                          <span>{selectedStore.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{selectedStore.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Store Information</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <MapPinned className="h-5 w-5 text-plant-primary mr-3 mt-1" />
                              <div>
                                <p className="text-sm font-medium">Address</p>
                                <p className="text-gray-600">{selectedStore.address}</p>
                                <Button variant="link" className="h-auto p-0 text-plant-primary">
                                  Get Directions
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Phone className="h-5 w-5 text-plant-primary mr-3 mt-1" />
                              <div>
                                <p className="text-sm font-medium">Phone</p>
                                <p className="text-gray-600">{selectedStore.phone}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Clock className="h-5 w-5 text-plant-primary mr-3 mt-1" />
                              <div>
                                <p className="text-sm font-medium">Hours</p>
                                <p className="text-gray-600">{selectedStore.hours}</p>
                                <p className="text-xs text-green-600 font-medium">Open Now</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Specialties</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedStore.specialties.map((specialty, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 bg-plant-light/30 text-plant-dark rounded-full text-sm"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                              <li>Organic Plant Food</li>
                              <li>Neem Oil Spray</li>
                              <li>Premium Potting Soil</li>
                              <li>Ceramic Planters</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <Button variant="outline" className="border-plant-primary text-plant-primary hover:bg-plant-light/20">
                          Call Store
                        </Button>
                        <Button asChild className="bg-plant-primary hover:bg-plant-dark">
                          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Visit Website
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg p-8">
                  <div className="text-center max-w-md">
                    <MapPin className="h-16 w-16 text-plant-primary/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Stores Found</h3>
                    <p className="text-gray-600">
                      No stores match your search criteria. Please try adjusting your search or browse our complete directory.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoreLocator;
