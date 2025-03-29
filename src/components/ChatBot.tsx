
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChatMessage from "./ChatMessage";
import { useChatBot } from "@/hooks/useChatBot";

const ChatBot = () => {
  const {
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
  } = useChatBot();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
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
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVoice();
                          }}
                        >
                          {isVoiceEnabled ? (
                            <Volume2 className="h-4 w-4 text-plant-primary" />
                          ) : (
                            <VolumeX className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {isVoiceEnabled ? "Disable voice" : "Enable voice"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeChat();
                    }}
                  >
                    <Minimize className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  if (!isMinimized) e.stopPropagation();
                  toggleChat();
                }}
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
                    <ChatMessage
                      key={index}
                      text={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
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
