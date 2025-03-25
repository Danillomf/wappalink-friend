
import React, { useEffect, useRef, useState } from "react";
import { Contact, Message } from "@/types";
import { fetchMessages, formatTimestamp, sendMessage } from "@/utils/whatsappApi";
import { cn } from "@/lib/utils";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageInput from "./MessageInput";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ChatAreaProps {
  selectedContact: Contact | null;
  onBackClick?: () => void;
  isMobile?: boolean;
}

const ChatArea = ({ selectedContact, onBackClick, isMobile = false }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedContact) {
      setIsLoading(true);
      loadMessages(selectedContact.id);
    } else {
      setMessages([]);
    }
  }, [selectedContact]);

  const loadMessages = async (contactId: string) => {
    try {
      const fetchedMessages = await fetchMessages(contactId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error("Falha ao carregar mensagens");
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedContact) return;
    
    setIsSending(true);
    try {
      const newMessage = await sendMessage(selectedContact.id, content);
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Falha ao enviar mensagem");
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Group messages by date for better visualization
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  if (!selectedContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 chat-bg">
        <div className="text-center max-w-md p-6 rounded-lg bg-card/80 backdrop-blur-sm shadow-glass">
          <h2 className="text-2xl font-semibold mb-2">WhatsApp Connect</h2>
          <p className="text-muted-foreground">
            Selecione um contato para iniciar uma conversa ou configure a API do WhatsApp nas configurações.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Chat header */}
      <div className="p-3 flex items-center gap-3 bg-card border-b">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onBackClick}
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          {selectedContact.profileImage ? (
            <img 
              src={selectedContact.profileImage} 
              alt={selectedContact.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              {selectedContact.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h2 className="font-medium">{selectedContact.name}</h2>
          <p className="text-xs text-muted-foreground">
            {selectedContact.lastSeen ? `Visto por último ${formatTimestamp(selectedContact.lastSeen)}` : "Online"}
          </p>
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-bg">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-whatsapp"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-muted-foreground">
              Envie uma mensagem para iniciar a conversa
            </div>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="space-y-3">
              <div className="flex justify-center">
                <div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                  {formatDateHeader(date)}
                </div>
              </div>
              
              {dateMessages.map((message, index) => (
                <AnimatePresence key={message.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={cn(
                      "flex",
                      message.status === "sent" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-3 py-2 rounded-lg shadow-sm",
                        message.status === "sent" 
                          ? "message-bubble sent bg-whatsapp/10" 
                          : "message-bubble received"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words text-sm">{message.content}</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.status === "sent" && (
                          <svg 
                            className="w-3 h-3 text-whatsapp"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              d="M20 6L9 17L4 12" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isSending} />
    </div>
  );
};

function formatDateHeader(dateString: string): string {
  const messageDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (messageDate.toDateString() === today.toDateString()) {
    return "Hoje";
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Ontem";
  } else {
    return messageDate.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      year: '2-digit'
    });
  }
}

export default ChatArea;
