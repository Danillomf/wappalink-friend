
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getDatabaseConfig, initializeDatabase } from "@/utils/databaseService";
import { DatabaseConfig } from "@/types";
import { Check, Database, Info } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const DatabaseSetup = () => {
  const [config, setConfig] = useState<DatabaseConfig>({
    host: "localhost",
    port: 5432,
    username: "",
    password: "",
    database: "whatsapp_connect",
    isConfigured: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedConfig = getDatabaseConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ 
      ...prev, 
      [name]: name === "port" ? parseInt(value) || 5432 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await initializeDatabase(config);
      if (success) {
        toast.success("Banco de dados PostgreSQL configurado com sucesso!");
        setConfig(prev => ({ ...prev, isConfigured: true }));
      }
    } catch (error) {
      console.error("Failed to initialize database:", error);
      toast.error("Falha ao configurar o banco de dados PostgreSQL");
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
          <CardTitle>Configuração do Banco de Dados PostgreSQL</CardTitle>
          <CardDescription>
            Configure sua conexão com o PostgreSQL para armazenar mensagens e contatos localmente.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                name="host"
                value={config.host}
                onChange={handleChange}
                placeholder="localhost"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="port">Porta</Label>
              <Input
                id="port"
                name="port"
                type="number"
                value={config.port}
                onChange={handleChange}
                placeholder="5432"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                value={config.username}
                onChange={handleChange}
                placeholder="postgres"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={config.password}
                onChange={handleChange}
                placeholder="Senha do banco de dados"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database">Nome do Banco</Label>
              <Input
                id="database"
                name="database"
                value={config.database}
                onChange={handleChange}
                placeholder="whatsapp_connect"
                required
              />
            </div>
            
            {config.isConfigured && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 text-green-500">
                <Check size={16} />
                <span className="text-sm">Banco de dados configurado com sucesso</span>
              </div>
            )}
            
            <div className="flex items-start gap-2 p-2 rounded-lg bg-muted text-muted-foreground">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <p>Certifique-se de que o banco de dados PostgreSQL esteja instalado e rodando na porta especificada.</p>
                <p className="mt-1">Para instalação local do PostgreSQL:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><a href="https://www.postgresql.org/download/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Download PostgreSQL</a></li>
                </ul>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
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
              "Configurar Banco de Dados"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DatabaseSetup;
