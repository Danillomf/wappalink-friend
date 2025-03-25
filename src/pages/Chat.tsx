
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { Contact } from "@/types";
import { getApiConfig } from "@/utils/whatsappApi";
import { getDatabaseConfig, syncDataWithDatabase } from "@/utils/databaseService";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const apiConfig = getApiConfig();
  const dbConfig = getDatabaseConfig();

  useEffect(() => {
    if (!apiConfig.isConfigured) {
      toast.error("API do WhatsApp não configurada");
      navigate("/settings");
    }
  }, [apiConfig.isConfigured, navigate]);

  const handleSync = async () => {
    if (!dbConfig?.isConfigured) {
      toast.error("Configure o banco de dados PostgreSQL primeiro");
      navigate("/settings");
      return;
    }
    
    setIsSyncing(true);
    try {
      await syncDataWithDatabase();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-screen"
    >
      <div className="flex items-center bg-card border-b p-2 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">WhatsApp Connect</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => navigate("/settings")}
          >
            <Database size={16} />
            <span className="hidden sm:inline">Banco de Dados</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleSync}
            disabled={isSyncing || !dbConfig?.isConfigured}
          >
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Sincronizar</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
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
      </div>
    </motion.div>
  );
};

export default Chat;
