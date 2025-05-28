
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Profile {
  id: string;
  username: string;
  role: string;
}

interface Conversation {
  id: string;
  participant_one_id: string;
  participant_two_id: string;
  created_at: string;
  updated_at: string;
  other_participant?: Profile;
}

interface ConversationListProps {
  conversations: Conversation[] | undefined;
  isLoading: boolean;
  selectedConversation: string | null;
  onConversationSelect: (conversation: Conversation) => void;
  title: string;
  emptyMessage?: string;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  isLoading,
  selectedConversation,
  onConversationSelect,
  title,
  emptyMessage = "No conversations yet"
}) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <h2 className="text-lg font-semibold">{title}</h2>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          {isLoading ? (
            <div className="p-4">Loading conversations...</div>
          ) : conversations?.length === 0 ? (
            <div className="p-4 text-gray-500">{emptyMessage}</div>
          ) : (
            conversations?.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => onConversationSelect(conversation)}
              >
                <div className="font-medium">
                  {conversation.other_participant?.username || 'Unknown User'}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {conversation.other_participant?.role || 'user'}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
