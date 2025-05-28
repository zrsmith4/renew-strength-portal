
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

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

interface Conversation {
  id: string;
  participant_one_id: string;
  participant_two_id: string;
  created_at: string;
  updated_at: string;
  other_participant?: Profile;
}

interface MessageAreaProps {
  selectedConversation: string | null;
  conversations: Conversation[] | undefined;
  messages: Message[] | undefined;
  messagesLoading: boolean;
  currentUserId: string | undefined;
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  sendDisabled: boolean;
  bubbleColor?: string;
}

export const MessageArea: React.FC<MessageAreaProps> = ({
  selectedConversation,
  conversations,
  messages,
  messagesLoading,
  currentUserId,
  newMessage,
  onMessageChange,
  onSendMessage,
  sendDisabled,
  bubbleColor
}) => {
  const selectedConversationData = conversations?.find(c => c.id === selectedConversation);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {selectedConversation 
            ? `Chat with ${selectedConversationData?.other_participant?.username || 'Unknown'}`
            : 'Select a conversation'
          }
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col h-[500px]">
        {selectedConversation ? (
          <>
            <ScrollArea className="flex-1 mb-4">
              {messagesLoading ? (
                <div className="p-4">Loading messages...</div>
              ) : messages?.length === 0 ? (
                <div className="p-4 text-gray-500">No messages yet</div>
              ) : (
                <div className="space-y-4 p-4">
                  {messages?.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      currentUserId={currentUserId}
                      bubbleColor={bubbleColor}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>

            <MessageInput
              value={newMessage}
              onChange={onMessageChange}
              onSend={onSendMessage}
              disabled={sendDisabled}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </CardContent>
    </Card>
  );
};
