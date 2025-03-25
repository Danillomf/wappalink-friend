
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ApiSetup from "@/components/ApiSetup";
import DatabaseSetup from "@/components/DatabaseSetup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("whatsapp");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 flex flex-col"
    >
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-semibold">Configurações</h1>
      </div>
      
      <div className="max-w-lg mx-auto w-full">
        <Tabs
          defaultValue="whatsapp"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-6"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="whatsapp">WhatsApp API</TabsTrigger>
            <TabsTrigger value="database">Banco de Dados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp" className="mt-4">
            <ApiSetup />
          </TabsContent>
          
          <TabsContent value="database" className="mt-4">
            <DatabaseSetup />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-4 bg-muted rounded-lg text-muted-foreground text-sm">
          <h3 className="font-medium mb-2">
            {activeTab === "whatsapp" ? "Sobre o WhatsApp API Connect" : "Sobre o PostgreSQL"}
          </h3>
          {activeTab === "whatsapp" ? (
            <>
              <p>
                Este aplicativo permite que você se conecte à API oficial do WhatsApp Business
                para enviar e receber mensagens de forma programática.
              </p>
              <p className="mt-2">
                Para utilizar todas as funcionalidades, você precisará ter uma conta
                no WhatsApp Business API e as credenciais de acesso apropriadas.
              </p>
            </>
          ) : (
            <>
              <p>
                O PostgreSQL é um poderoso sistema de banco de dados relacional de código aberto.
                A integração local permite armazenar e gerenciar suas conversas e contatos.
              </p>
              <p className="mt-2">
                Certifique-se de que o PostgreSQL esteja instalado e rodando em seu sistema
                antes de configurar a conexão.
              </p>
            </>
          )}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={() => navigate("/chat")} className="bg-whatsapp hover:bg-whatsapp/90">
            Ir para o Chat
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
