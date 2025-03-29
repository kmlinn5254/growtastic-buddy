
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

// Sample answers for common plant questions
const plantFAQ = {
  "water": "Most indoor plants should be watered when the top inch of soil feels dry. Frequency depends on the specific plant, humidity, and season.",
  "light": "Different plants have different light requirements. Most houseplants prefer bright, indirect light. Some plants like succulents need direct light, while others like ferns prefer shade.",
  "fertilizer": "Generally, fertilize houseplants every 4-6 weeks during growing season (spring and summer) and reduce or stop during dormant periods (fall and winter).",
  "repot": "Most houseplants need repotting every 1-2 years. Signs it's time to repot include roots growing through drainage holes, water running straight through the pot, or slowed growth.",
  "pest": "Common houseplant pests include spider mites, mealybugs, aphids, and scale. Regularly inspect plants, isolate infected ones, and treat with insecticidal soap or neem oil.",
  "hello": "Hello! I'm ArgoMind's plant assistant. How can I help with your plants today?",
  "hi": "Hi there! What plant questions can I answer for you today?",
  "help": "I can help with questions about plant care, watering schedules, light requirements, pest control, and more. Just ask away!",
};

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your plant assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputValue("");
  };

  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for keywords in the query
    for (const [keyword, answer] of Object.entries(plantFAQ)) {
      if (lowercaseQuery.includes(keyword)) {
        return answer;
      }
    }
    
    // Default response
    return "I'm not sure about that specific question. Would you like to know about watering, light requirements, fertilizing, repotting, or dealing with pests?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-12 h-12 flex items-center justify-center bg-plant-primary hover:bg-plant-primary/90 text-white shadow-lg"
        >
          <MessageCircle />
        </Button>
      )}

      {isOpen && (
        <Card
          className={`w-80 sm:w-96 shadow-xl transition-all duration-300 ${
            isMinimized
              ? "h-12 overflow-hidden"
              : "h-[460px]"
          }`}
        >
          <CardHeader className="px-4 py-2 flex flex-row items-center justify-between border-b cursor-pointer" onClick={isMinimized ? toggleChat : undefined}>
            <CardTitle className="text-sm font-medium flex items-center">
              <Leaf className="h-4 w-4 text-plant-primary mr-2" />
              Plant Assistant
            </CardTitle>
            <div className="flex items-center space-x-1">
              {!isMinimized && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={minimizeChat}
                >
                  <Minimize className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-0">
                <div className="h-[350px] overflow-y-auto p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.isUser
                            ? "bg-plant-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Ask a plant question..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      className="bg-plant-primary hover:bg-plant-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
