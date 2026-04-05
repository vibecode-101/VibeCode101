import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type ChatMessage = { role: "user" | "assistant"; content: string; toolsUsed?: string[] };

type ChatAction = { type: string; target: string };

export type LoadingStatus = {
  phase: "thinking" | "researching" | "composing";
  detail?: string;
};

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  loadingStatus: LoadingStatus | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sendMessage: (content: string) => Promise<{ message: string; action?: ChatAction | null; toolsUsed?: string[] }>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)/;

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const workspaceIdRef = useRef<string | null>(null);

  const sendMessage = useCallback(async (content: string): Promise<{ message: string; action?: ChatAction | null; toolsUsed?: string[] }> => {
    const userMsg: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const urlMatch = content.match(URL_REGEX);
    const mentionsDomain = urlMatch ? urlMatch[1] : null;

    setLoadingStatus({ phase: "thinking" });

    const phaseTimer = setTimeout(() => {
      if (mentionsDomain) {
        setLoadingStatus({ phase: "researching", detail: mentionsDomain });
      } else {
        setLoadingStatus({ phase: "composing" });
      }
    }, 2200);

    const researchTimer = mentionsDomain ? setTimeout(() => {
      setLoadingStatus({ phase: "composing" });
    }, 6000) : null;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          workspaceId: workspaceIdRef.current,
        }),
      });

      clearTimeout(phaseTimer);
      if (researchTimer) clearTimeout(researchTimer);

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();

      if (data.workspaceId) {
        workspaceIdRef.current = data.workspaceId;
      }

      if (data.toolsUsed?.length) {
        const domain = data.toolsUsed[0].replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        setLoadingStatus({ phase: "composing", detail: domain });
        await new Promise(r => setTimeout(r, 400));
      }

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.message,
        toolsUsed: data.toolsUsed,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
      setLoadingStatus(null);
      return data;
    } catch (err) {
      clearTimeout(phaseTimer);
      if (researchTimer) clearTimeout(researchTimer);
      const errorMsg: ChatMessage = { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again!" };
      setMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
      setLoadingStatus(null);
      return { message: errorMsg.content, action: null };
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    workspaceIdRef.current = null;
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, loadingStatus, isOpen, setIsOpen, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}
