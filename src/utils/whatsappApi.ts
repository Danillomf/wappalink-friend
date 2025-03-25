
import { toast } from "sonner";
import { Contact, Message, WhatsAppApiConfig } from "@/types";

// WhatsApp API functions
export async function initializeWhatsAppApi(
  config: WhatsAppApiConfig
): Promise<boolean> {
  try {
    // In a real implementation, this would validate the API token and establish connection
    console.log("Initializing WhatsApp API with config:", config);
    
    // Simulating API validation
    if (!config.token || !config.phoneNumberId || !config.businessAccountId) {
      toast.error("All WhatsApp API configuration fields are required");
      return false;
    }
    
    // Simulate successful connection
    toast.success("WhatsApp API connection established");
    localStorage.setItem("whatsapp-api-config", JSON.stringify({
      ...config,
      isConfigured: true
    }));
    
    return true;
  } catch (error) {
    console.error("Failed to initialize WhatsApp API:", error);
    toast.error("Failed to connect to WhatsApp API");
    return false;
  }
}

export function getApiConfig(): WhatsAppApiConfig {
  const storedConfig = localStorage.getItem("whatsapp-api-config");
  if (storedConfig) {
    return JSON.parse(storedConfig);
  }
  return {
    token: "",
    phoneNumberId: "",
    businessAccountId: "",
    isConfigured: false
  };
}

export async function fetchContacts(): Promise<Contact[]> {
  // In a real implementation, this would fetch contacts from the WhatsApp API
  // For demo purposes, we'll return mock data
  const config = getApiConfig();
  if (!config.isConfigured) {
    toast.error("Please configure WhatsApp API first");
    return [];
  }
  
  // Mock data
  return [
    {
      id: "1",
      name: "João Silva",
      phoneNumber: "+5511987654321",
      profileImage: "https://i.pravatar.cc/150?img=1",
      lastMessage: {
        id: "msg1",
        contactId: "1",
        content: "Olá, tudo bem?",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
        status: "read"
      },
      unreadCount: 0,
      lastSeen: new Date(Date.now() - 3 * 60000).toISOString() // 3 minutes ago
    },
    {
      id: "2",
      name: "Maria Souza",
      phoneNumber: "+5511976543210",
      profileImage: "https://i.pravatar.cc/150?img=5",
      lastMessage: {
        id: "msg2",
        contactId: "2",
        content: "Queria saber sobre o produto",
        timestamp: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
        status: "delivered"
      },
      unreadCount: 2,
      lastSeen: new Date(Date.now() - 40 * 60000).toISOString() // 40 minutes ago
    },
    {
      id: "3",
      name: "Pedro Oliveira",
      phoneNumber: "+5511965432109",
      profileImage: "https://i.pravatar.cc/150?img=8",
      lastMessage: {
        id: "msg3",
        contactId: "3",
        content: "Obrigado pelo atendimento!",
        timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
        status: "read"
      },
      unreadCount: 0,
      lastSeen: new Date(Date.now() - 60 * 60000).toISOString() // 1 hour ago
    },
    {
      id: "4",
      name: "Ana Paula",
      phoneNumber: "+5511954321098",
      profileImage: "https://i.pravatar.cc/150?img=9",
      lastMessage: {
        id: "msg4",
        contactId: "4",
        content: "Qual o horário de funcionamento?",
        timestamp: new Date(Date.now() - 1440 * 60000).toISOString(), // 1 day ago
        status: "sent"
      },
      unreadCount: 1,
      lastSeen: new Date(Date.now() - 1000 * 60000).toISOString() // 16.7 hours ago
    },
    {
      id: "5",
      name: "Carlos Mendes",
      phoneNumber: "+5511943210987",
      profileImage: "https://i.pravatar.cc/150?img=12",
      lastMessage: {
        id: "msg5",
        contactId: "5",
        content: "Preciso de ajuda com meu pedido",
        timestamp: new Date(Date.now() - 10080 * 60000).toISOString(), // 1 week ago
        status: "read"
      },
      unreadCount: 0,
      lastSeen: new Date(Date.now() - 2880 * 60000).toISOString() // 2 days ago
    }
  ];
}

export async function fetchMessages(contactId: string): Promise<Message[]> {
  // In a real implementation, this would fetch messages for a specific contact from the WhatsApp API
  const config = getApiConfig();
  if (!config.isConfigured) {
    toast.error("Please configure WhatsApp API first");
    return [];
  }
  
  // Mock conversation data
  if (contactId === "1") {
    return [
      {
        id: "msg1-1",
        contactId: "1",
        content: "Olá, tudo bem?",
        timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
        status: "received",
      },
      {
        id: "msg1-2",
        contactId: "1",
        content: "Tudo ótimo, obrigado! Como posso ajudar?",
        timestamp: new Date(Date.now() - 24 * 60000).toISOString(), // 24 minutes ago
        status: "sent",
      },
      {
        id: "msg1-3",
        contactId: "1",
        content: "Gostaria de saber mais sobre seus serviços",
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
        status: "received",
      },
      {
        id: "msg1-4",
        contactId: "1",
        content: "Claro! Oferecemos consultoria em marketing digital, desenvolvimento de sites e gestão de redes sociais. O que mais te interessa?",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
        status: "sent",
      },
      {
        id: "msg1-5",
        contactId: "1",
        content: "Desenvolvimento de sites parece interessante. Quais são os preços?",
        timestamp: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
        status: "received",
      },
      {
        id: "msg1-6",
        contactId: "1",
        content: "Os preços variam conforme a complexidade do projeto. Podemos agendar uma reunião para discutir suas necessidades específicas?",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
        status: "sent",
      }
    ];
  } else if (contactId === "2") {
    return [
      {
        id: "msg2-1",
        contactId: "2",
        content: "Queria saber sobre o produto",
        timestamp: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
        status: "received",
      },
      {
        id: "msg2-2",
        contactId: "2",
        content: "Qual produto específico lhe interessa?",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
        status: "sent",
      }
    ];
  }
  
  // Default empty conversation for other contacts
  return [];
}

export async function sendMessage(contactId: string, content: string): Promise<Message | null> {
  const config = getApiConfig();
  if (!config.isConfigured) {
    toast.error("Please configure WhatsApp API first");
    return null;
  }
  
  try {
    // In a real implementation, this would send a message via the WhatsApp API
    console.log(`Sending message to ${contactId}: ${content}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a mock message object
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      contactId,
      content,
      timestamp: new Date().toISOString(),
      status: "sent"
    };
    
    return newMessage;
  } catch (error) {
    console.error("Failed to send message:", error);
    toast.error("Failed to send message");
    return null;
  }
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    // Today, show time only
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    // Yesterday
    return "Ontem";
  } else if (diffInDays < 7) {
    // Within a week, show day name
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    // Older, show date
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
  }
}
