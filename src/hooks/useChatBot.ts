
import { useState, useRef, useEffect } from 'react';
import { setupSpeechSynthesis, speakText } from '@/utils/speechUtils';
import plantFAQ, { allPlants } from '@/data/plantFAQ';

export type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export const useChatBot = () => {
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
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    speechSynthesisRef.current = setupSpeechSynthesis();
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Speak the bot response if voice is enabled
      speakText(botResponse, isVoiceEnabled, speechSynthesisRef.current);
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
    
    // Check if user is asking about a specific plant
    const plantMentioned = allPlants.find(plant => 
      lowercaseQuery.includes(plant.name.toLowerCase())
    );
    
    if (plantMentioned) {
      return `${plantMentioned.name} is a ${plantMentioned.difficulty.toLowerCase()} plant to care for. It prefers ${plantMentioned.light.toLowerCase()} light and should be watered ${plantMentioned.water.toLowerCase()}. The ideal temperature range is ${plantMentioned.temperature}.`;
    }
    
    // Default response
    return "I'm not sure about that specific question. Would you like to know about watering, light requirements, fertilizing, repotting, or dealing with pests?";
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const toggleVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // If turning off voice, cancel any ongoing speech
      if (isVoiceEnabled) {
        window.speechSynthesis.cancel();
      }
      
      setIsVoiceEnabled(!isVoiceEnabled);
    }
  };

  return {
    isOpen,
    isMinimized,
    messages,
    inputValue,
    isVoiceEnabled,
    messagesEndRef,
    setInputValue,
    handleSendMessage,
    toggleChat,
    minimizeChat,
    toggleVoice,
  };
};
