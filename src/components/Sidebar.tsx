
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Settings, Menu, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConversationItem from "./ConversationItem";
import { fetchContacts } from "@/utils/whatsappApi";
import { Contact } from "@/types";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onSelectContact: (contact: Contact) => void;
  selectedContactId: string | null;
}

const Sidebar = ({ onSelectContact, selectedContactId }: SidebarProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const loadedContacts = await fetchContacts();
      setContacts(loadedContacts);
    } catch (error) {
      console.error("Failed to load contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.phoneNumber.includes(searchQuery)
  );

  const handleSelectContact = (contact: Contact) => {
    onSelectContact(contact);
    setIsMobileMenuOpen(false);
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || true) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className={`fixed lg:relative top-0 left-0 z-40 h-full w-80 border-r 
                        shadow-lg lg:shadow-none bg-card overflow-hidden
                        ${isMobileMenuOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 flex items-center justify-between bg-card">
                <h1 className="text-xl font-semibold">WhatsApp Connect</h1>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToSettings}
                    className="rounded-full hover:bg-accent/50"
                  >
                    <Settings size={20} />
                  </Button>
                </div>
              </div>
              
              {/* Search */}
              <div className="p-4 border-y">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar ou começar nova conversa"
                    className="pl-9 bg-muted/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Contacts list */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1 scroll-hidden">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-whatsapp"></div>
                  </div>
                ) : filteredContacts.length > 0 ? (
                  filteredContacts.map(contact => (
                    <ConversationItem
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedContactId === contact.id}
                      onClick={() => handleSelectContact(contact)}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full p-6">
                    <div className="text-muted-foreground text-sm">
                      {searchQuery ? "Nenhum contato encontrado" : "Nenhum contato disponível"}
                    </div>
                  </div>
                )}
              </div>
              
              {/* New contact */}
              <div className="p-4 border-t">
                <Button className="w-full gap-2" variant="outline">
                  <Plus size={16} />
                  Novo Contato
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
