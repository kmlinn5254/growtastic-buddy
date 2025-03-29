
import React from 'react';

type MessageProps = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatMessage: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div
      className={`mb-4 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 ${
          isUser
            ? "bg-plant-primary text-white"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <p className="text-sm">{text}</p>
        <p className="text-xs mt-1 opacity-70">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
