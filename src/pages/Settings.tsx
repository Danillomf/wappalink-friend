
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ApiSetup from "@/components/ApiSetup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Settings = () => {
  const navigate = useNavigate();

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
        <ApiSetup />
        
        <div className="mt-6 p-4 bg-muted rounded-lg text-muted-foreground text-sm">
          <h3 className="font-medium mb-2">Sobre o WhatsApp API Connect</h3>
          <p>
            Este aplicativo permite que você se conecte à API oficial do WhatsApp Business
            para enviar e receber mensagens de forma programática.
          </p>
          <p className="mt-2">
            Para utilizar todas as funcionalidades, você precisará ter uma conta
            no WhatsApp Business API e as credenciais de acesso apropriadas.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
