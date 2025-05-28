
import React from "react";

interface Profile {
  id: string;
  username: string;
  role: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  message_text: string;
  sent_at: string;
  is_read: boolean;
  sender?: Profile;
}

interface MessageBubbleProps {
  message: Message;
  currentUserId: string | undefined;
  bubbleColor?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  currentUserId,
  bubbleColor = "bg-brand-green"
}) => {
  const isCurrentUser = message.sender_id === currentUserId;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isCurrentUser
            ? `${bubbleColor} text-white`
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <div className="text-sm">{message.message_text}</div>
        <div className="text-xs mt-1 opacity-70">
          {new Date(message.sent_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
