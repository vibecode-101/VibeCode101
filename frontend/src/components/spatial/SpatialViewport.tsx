import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpatial } from "./SpatialProvider";

interface SpatialViewportProps {
  directory: React.ReactNode;
  className?: string;
}

export function SpatialViewport({ directory, className }: SpatialViewportProps) {
  const { currentView, currentRoom, exitRoom, viewportRef } = useSpatial();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentView === "content") {
        exitRoom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView, exitRoom]);

  return (
    <div ref={viewportRef} className={cn("relative w-full", className)}>
      {currentView === "directory" ? (
        <div
          key="directory"
          className={cn(
            "w-full",
            currentRoom === null ? "" : "spatial-enter"
          )}
        >
          {directory}
        </div>
      ) : currentRoom ? (
        <div
          key={`room-${currentRoom.slug}`}
          className="w-full min-h-screen spatial-enter"
        >
          <div className={cn(
            "sticky top-0 z-40 border-b transition-all duration-300",
            "bg-background/60 backdrop-blur-2xl backdrop-saturate-[1.8] border-border/50 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]"
          )}>
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <button
                onClick={exitRoom}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Directory</span>
              </button>
              <div className="flex items-center gap-2">
                <currentRoom.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{currentRoom.title}</span>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-6 py-12">
            <currentRoom.component />
          </div>
        </div>
      ) : null}
    </div>
  );
}
