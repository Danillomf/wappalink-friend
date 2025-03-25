
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { Contact } from "@/types";
import { getApiConfig } from "@/utils/whatsappApi";
import { getDatabaseConfig } from "@/utils/databaseService";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Database, Settings } from "lucide-react";

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const apiConfig = getApiConfig();
  const dbConfig = getDatabaseConfig();

  // Verificações de configuração
  const isApiConfigured = apiConfig.isConfigured;
  const isDbConfigured = dbConfig?.isConfigured || false;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-screen"
    >
      {!selectedContact && (
        <div className="p-6 flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">WhatsApp Connect</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Conecte-se à API oficial do WhatsApp Business e gerencie suas conversas com banco de dados PostgreSQL local.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-card p-6 rounded-lg shadow-glass border"
            >
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-whatsapp/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare size={28} className="text-whatsapp" />
                </div>
                <h2 className="text-xl font-semibold mb-2">WhatsApp API</h2>
                <p className="text-muted-foreground text-sm mb-4 text-center">
                  {isApiConfigured 
                    ? "API do WhatsApp configurada." 
                    : "Configure suas credenciais da API do WhatsApp Business."}
                </p>
                <Button 
                  className={isApiConfigured ? "bg-whatsapp hover:bg-whatsapp/90" : ""}
                  variant={isApiConfigured ? "default" : "outline"}
                  onClick={() => isApiConfigured ? navigate("/chat") : navigate("/settings")}
                >
                  {isApiConfigured ? "Ir para Chat" : "Configurar API"}
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-card p-6 rounded-lg shadow-glass border"
            >
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Database size={28} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">PostgreSQL</h2>
                <p className="text-muted-foreground text-sm mb-4 text-center">
                  {isDbConfigured 
                    ? "Banco de dados PostgreSQL configurado." 
                    : "Configure sua conexão local com o PostgreSQL."}
                </p>
                <Button 
                  className={isDbConfigured ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" : ""}
                  variant={isDbConfigured ? "default" : "outline"}
                  onClick={() => navigate("/settings", { state: { activeTab: "database" } })}
                >
                  {isDbConfigured ? "Gerenciar Banco" : "Configurar Banco"}
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2"
            >
              <Settings size={16} />
              Todas as Configurações
            </Button>
          </div>
        </div>
      )}
      
      {selectedContact && (
        <div className="flex h-full overflow-hidden">
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
      )}
    </motion.div>
  );
};

export default Index;
