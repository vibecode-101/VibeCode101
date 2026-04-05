import React, { useState, useCallback, useRef, createContext, useContext, ReactNode } from "react";

export interface RoomData {
  slug: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  component: React.ComponentType;
}

interface SpatialContextType {
  currentView: "directory" | "content";
  currentRoom: RoomData | null;
  rooms: RoomData[];
  enterRoom: (room: RoomData) => void;
  exitRoom: () => void;
  navigateToRoom: (slug: string) => void;
  viewportRef: React.RefObject<HTMLDivElement | null>;
}

const SpatialContext = createContext<SpatialContextType | null>(null);

export function useSpatial() {
  const ctx = useContext(SpatialContext);
  if (!ctx) throw new Error("useSpatial must be used within SpatialProvider");
  return ctx;
}

interface SpatialProviderProps {
  children: ReactNode;
  rooms: RoomData[];
}

export function SpatialProvider({ children, rooms }: SpatialProviderProps) {
  const [currentView, setCurrentView] = useState<"directory" | "content">("directory");
  const [currentRoom, setCurrentRoom] = useState<RoomData | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const enterRoom = useCallback((room: RoomData) => {
    setCurrentRoom(room);
    setCurrentView("content");
    requestAnimationFrame(() => {
      if (viewportRef.current) {
        viewportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const exitRoom = useCallback(() => {
    setCurrentView("directory");
    if (viewportRef.current) {
      viewportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => setCurrentRoom(null), 500);
  }, []);

  const navigateToRoom = useCallback((slug: string) => {
    const room = rooms.find((r) => r.slug === slug);
    if (room) {
      enterRoom(room);
    }
  }, [rooms, enterRoom]);

  return (
    <SpatialContext.Provider
      value={{
        currentView,
        currentRoom,
        rooms,
        enterRoom,
        exitRoom,
        navigateToRoom,
        viewportRef,
      }}
    >
      {children}
    </SpatialContext.Provider>
  );
}
