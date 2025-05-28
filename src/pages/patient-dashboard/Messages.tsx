
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageArea } from "@/components/messaging/MessageArea";
import { PatientNewConversationDialog } from "@/components/messaging/PatientNewConversationDialog";
import { usePatientMessaging } from "@/hooks/usePatientMessaging";

const Messages = () => {
  const {
    selectedConversation,
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
    // New conversation specific
    isNewConversationOpen,
    setIsNewConversationOpen,
    selectedTherapist,
    setSelectedTherapist,
    newConversationMessage,
    setNewConversationMessage,
    eligibleTherapists,
    therapistsLoading,
    handleCreateConversation,
    createConversationMutation,
  } = usePatientMessaging();

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-3xl text-brand-green">
              Messages
            </h1>
            <PatientNewConversationDialog
              isOpen={isNewConversationOpen}
              onOpenChange={setIsNewConversationOpen}
              eligibleTherapists={eligibleTherapists}
              therapistsLoading={therapistsLoading}
              selectedTherapist={selectedTherapist}
              onTherapistSelect={setSelectedTherapist}
              message={newConversationMessage}
              onMessageChange={setNewConversationMessage}
              onCreateConversation={handleCreateConversation}
              isCreating={createConversationMutation.isPending}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
            <ConversationList
              conversations={conversations}
              isLoading={conversationsLoading}
              selectedConversation={selectedConversation}
              onConversationSelect={handleConversationSelect}
              title="Conversations"
            />

            <MessageArea
              selectedConversation={selectedConversation}
              conversations={conversations}
              messages={messages}
              messagesLoading={messagesLoading}
              currentUserId={currentUser?.id}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              sendDisabled={!newMessage.trim() || sendMessageMutation.isPending}
              bubbleColor="bg-brand-green"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
