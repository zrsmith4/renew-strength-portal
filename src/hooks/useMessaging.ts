
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sanitizeTextInput } from "@/lib/security";

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

export const useMessaging = () => {
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
      
      // Validate and sanitize message
      const sanitizedMessage = sanitizeTextInput(messageText, 2000);
      if (!sanitizedMessage.trim()) {
        throw new Error("Message cannot be empty");
      }

      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.id,
          recipient_id: recipientId,
          message_text: sanitizedMessage,
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

  return {
    selectedConversation,
    setSelectedConversation,
    newMessage,
    setNewMessage,
    currentUser,
    conversations,
    conversationsLoading,
    messages,
    messagesLoading,
    handleConversationSelect,
    handleSendMessage,
    sendMessageMutation,
    markAsReadMutation
  };
};
