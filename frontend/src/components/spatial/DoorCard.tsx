import { cn } from "@/lib/utils";
import { useSpatial, RoomData } from "./SpatialProvider";

interface DoorCardProps {
  room: RoomData;
  className?: string;
}

export function DoorCard({ room, className }: DoorCardProps) {
  const { enterRoom } = useSpatial();
  const Icon = room.icon;

  return (
    <button
      onClick={() => enterRoom(room)}
      className={cn(
        "holo-card holo-glow group w-full text-left cursor-pointer",
        "transition-all duration-300",
        "hover:-translate-y-1",
        className
      )}
    >
      <div className="relative z-[2] p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {room.title}
              </h3>
            </div>
            <span className="holo-pill inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium text-muted-foreground mb-2">
              {room.category}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {room.description}
            </p>
          </div>
          <svg
            className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
