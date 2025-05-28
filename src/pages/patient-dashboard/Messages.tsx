
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

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

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        if (profile) {
          setCurrentUser(profile);
        }
      }
    };
    getCurrentUser();
  }, []);

  // Fetch conversations
  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!currentUser) return [];
      
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          participant_one:profiles!conversations_participant_one_id_fkey(*),
          participant_two:profiles!conversations_participant_two_id_fkey(*)
        `)
        .or(`participant_one_id.eq.${currentUser.id},participant_two_id.eq.${currentUser.id}`);

      if (error) throw error;

      return data?.map(conv => ({
        ...conv,
        other_participant: conv.participant_one_id === currentUser.id 
          ? conv.participant_two 
          : conv.participant_one
      })) || [];
    },
    enabled: !!currentUser,
  });

  // Fetch messages for selected conversation
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", selectedConversation],
    queryFn: async () => {
      if (!selectedConversation) return [];
      
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(*)
        `)
        .eq("conversation_id", selectedConversation)
        .order("sent_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedConversation,
  });

  // Mark messages as read
  const markAsReadMutation = useMutation({
    mutationFn: async (conversationId: string) => {
      if (!currentUser) return;
      
      const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("conversation_id", conversationId)
        .eq("recipient_id", currentUser.id)
        .eq("is_read", false);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ conversationId, recipientId, messageText }: {
      conversationId: string;
      recipientId: string;
      messageText: string;
    }) => {
      if (!currentUser) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.id,
          recipient_id: recipientId,
          message_text: messageText,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Send message error:", error);
    },
  });

  // Handle conversation selection
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation.id);
    markAsReadMutation.mutate(conversation.id);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    const conversation = conversations?.find(c => c.id === selectedConversation);
    if (!conversation) return;

    const recipientId = conversation.participant_one_id === currentUser.id 
      ? conversation.participant_two_id 
      : conversation.participant_one_id;

    sendMessageMutation.mutate({
      conversationId: selectedConversation,
      recipientId,
      messageText: newMessage.trim(),
    });
  };

  // Real-time subscription for messages
  useEffect(() => {
    if (!selectedConversation) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages", selectedConversation] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation, queryClient]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="font-serif text-3xl text-brand-green mb-6 text-center">
            Messages
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <h2 className="text-lg font-semibold">Conversations</h2>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {conversationsLoading ? (
                    <div className="p-4">Loading conversations...</div>
                  ) : conversations?.length === 0 ? (
                    <div className="p-4 text-gray-500">No conversations yet</div>
                  ) : (
                    conversations?.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedConversation === conversation.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <div className="font-medium">
                          {conversation.other_participant?.username || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {conversation.other_participant?.role || 'staff'}
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Messages Area */}
            <Card className="md:col-span-2">
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  {selectedConversation 
                    ? `Chat with ${conversations?.find(c => c.id === selectedConversation)?.other_participant?.username || 'Unknown'}`
                    : 'Select a conversation'
                  }
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col h-[500px]">
                {selectedConversation ? (
                  <>
                    {/* Messages */}
                    <ScrollArea className="flex-1 mb-4">
                      {messagesLoading ? (
                        <div className="p-4">Loading messages...</div>
                      ) : messages?.length === 0 ? (
                        <div className="p-4 text-gray-500">No messages yet</div>
                      ) : (
                        <div className="space-y-4 p-4">
                          {messages?.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                  message.sender_id === currentUser?.id
                                    ? 'bg-brand-green text-white'
                                    : 'bg-gray-200 text-gray-800'
                                }`}
                              >
                                <div className="text-sm">{message.message_text}</div>
                                <div className="text-xs mt-1 opacity-70">
                                  {new Date(message.sent_at).toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a conversation to start messaging
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
