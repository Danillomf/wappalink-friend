
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { Contact } from "@/types";
import { getApiConfig } from "@/utils/whatsappApi";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const apiConfig = getApiConfig();

  // Check if API is configured on component mount
  React.useEffect(() => {
    if (!apiConfig.isConfigured) {
      // If API is not configured, redirect to settings page
      navigate("/settings");
    }
  }, [apiConfig.isConfigured, navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full overflow-hidden"
    >
      <Sidebar 
        onSelectContact={setSelectedContact} 
        selectedContactId={selectedContact?.id || null} 
      />
      
      <div className="flex-1 overflow-hidden">
        <ChatArea 
          selectedContact={selectedContact} 
          onBackClick={() => setSelectedContact(null)}
          isMobile={isMobile}
        />
      </div>
    </motion.div>
  );
};

export default Index;
