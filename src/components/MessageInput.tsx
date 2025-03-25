
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-card border-t flex items-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full flex-shrink-0"
      >
        <Paperclip size={20} />
      </Button>

      <div className="relative flex-grow">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem"
          className="resize-none py-3 min-h-[50px] max-h-[120px] pr-10"
          disabled={isLoading}
        />
        
        {message.trim() ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 bottom-2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSend}
              className="h-8 w-8 rounded-full bg-whatsapp text-white hover:bg-whatsapp/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              ) : (
                <Send size={14} />
              )}
            </Button>
          </motion.div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 h-8 w-8 rounded-full"
          >
            <Mic size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
