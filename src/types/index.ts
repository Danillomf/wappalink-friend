
export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  lastMessage?: Message;
  profileImage?: string;
  unreadCount?: number;
  lastSeen?: string;
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "received";
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "image" | "video" | "document" | "audio";
  url: string;
  name?: string;
  size?: number;
}

export interface WhatsAppApiConfig {
  token: string;
  phoneNumberId: string;
  businessAccountId: string;
  isConfigured: boolean;
}

// Database interfaces
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  isConfigured: boolean;
}

export interface DatabaseStatus {
  isConnected: boolean;
  lastSync?: string;
  error?: string;
}
