
import { Contact } from "@/types";
import { formatTimestamp } from "@/utils/whatsappApi";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ConversationItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ConversationItem = ({ contact, isSelected, onClick }: ConversationItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-center p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-accent/50",
        isSelected ? "bg-accent" : ""
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {contact.profileImage ? (
            <img 
              src={contact.profileImage} 
              alt={contact.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              {contact.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {contact.unreadCount && contact.unreadCount > 0 ? (
          <div className="absolute -top-1 -right-1 bg-whatsapp text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {contact.unreadCount}
          </div>
        ) : null}
      </div>
      
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm truncate">{contact.name}</h3>
          <span className="text-xs text-muted-foreground">
            {contact.lastMessage ? formatTimestamp(contact.lastMessage.timestamp) : ""}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground truncate">
            {contact.lastMessage ? contact.lastMessage.content : "Iniciar conversa"}
          </p>
          {contact.lastMessage && contact.lastMessage.status === "sent" && (
            <svg 
              className="w-4 h-4 text-whatsapp"
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
  );
};

export default ConversationItem;
