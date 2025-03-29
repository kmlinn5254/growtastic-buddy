
import React, { useState } from 'react';

type MessageProps = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatMessage: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Check if the message contains an image URL
  const containsImage = (message: string) => {
    const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;
    return urlRegex.test(message);
  };

  // Extract image URLs from message
  const extractImageUrls = (message: string) => {
    const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/gi;
    return message.match(urlRegex) || [];
  };

  // Format message with images rendered
  const renderMessage = (message: string) => {
    if (!containsImage(message)) {
      return <p className="text-sm">{message}</p>;
    }

    const imageUrls = extractImageUrls(message);
    let formattedMessage = message;

    // Replace image URLs with placeholders
    imageUrls.forEach((url, index) => {
      formattedMessage = formattedMessage.replace(url, `[image-${index}]`);
    });

    // Split message by image placeholders
    const parts = formattedMessage.split(/(\[image-\d+\])/);

    return (
      <>
        {parts.map((part, index) => {
          const imageMatch = part.match(/\[image-(\d+)\]/);
          if (imageMatch) {
            const imageIndex = parseInt(imageMatch[1]);
            const imageUrl = imageUrls[imageIndex];
            
            return imageError[imageUrl] ? (
              <div key={index} className="text-xs text-red-500 italic my-1">
                [Image could not be loaded]
              </div>
            ) : (
              <div key={index} className="my-2 max-w-full overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Message attachment"
                  className="max-w-full rounded-md"
                  onError={() => {
                    setImageError(prev => ({ ...prev, [imageUrl]: true }));
                  }}
                  loading="lazy"
                />
              </div>
            );
          }
          return part ? <span key={index}>{part}</span> : null;
        })}
      </>
    );
  };

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
        {renderMessage(text)}
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
