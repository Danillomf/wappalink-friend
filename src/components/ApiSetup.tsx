
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getApiConfig, initializeWhatsAppApi } from "@/utils/whatsappApi";
import { WhatsAppApiConfig } from "@/types";
import { Check, Info } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ApiSetup = () => {
  const [config, setConfig] = useState<WhatsAppApiConfig>({
    token: "",
    phoneNumberId: "",
    businessAccountId: "",
    isConfigured: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedConfig = getApiConfig();
    setConfig(savedConfig);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await initializeWhatsAppApi(config);
      if (success) {
        toast.success("API do WhatsApp configurada com sucesso!");
        setConfig(prev => ({ ...prev, isConfigured: true }));
      }
    } catch (error) {
      console.error("Failed to initialize WhatsApp API:", error);
      toast.error("Falha ao configurar a API do WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-glass">
        <CardHeader>
          <CardTitle>Configuração da API do WhatsApp</CardTitle>
          <CardDescription>
            Insira suas credenciais da API do WhatsApp Business para começar a enviar e receber mensagens.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Token de Acesso</Label>
              <Input
                id="token"
                name="token"
                value={config.token}
                onChange={handleChange}
                placeholder="Insira seu token de acesso"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumberId">ID do Número de Telefone</Label>
              <Input
                id="phoneNumberId"
                name="phoneNumberId"
                value={config.phoneNumberId}
                onChange={handleChange}
                placeholder="Insira o ID do número de telefone"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessAccountId">ID da Conta Business</Label>
              <Input
                id="businessAccountId"
                name="businessAccountId"
                value={config.businessAccountId}
                onChange={handleChange}
                placeholder="Insira o ID da conta business"
                required
              />
            </div>
            
            {config.isConfigured && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-whatsapp/10 text-whatsapp">
                <Check size={16} />
                <span className="text-sm">API configurada com sucesso</span>
              </div>
            )}
            
            <div className="flex items-start gap-2 p-2 rounded-lg bg-muted text-muted-foreground">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <p>Para obter suas credenciais da API do WhatsApp Business:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Acesse o <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-whatsapp hover:underline">Facebook Developers</a></li>
                  <li>Crie ou selecione um aplicativo</li>
                  <li>Configure a API do WhatsApp Business</li>
                  <li>Obtenha as credenciais na seção "API WhatsApp"</li>
                </ol>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            className="w-full bg-whatsapp hover:bg-whatsapp/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Configurando...
              </>
            ) : config.isConfigured ? (
              "Atualizar Configuração"
            ) : (
              "Configurar API"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ApiSetup;
