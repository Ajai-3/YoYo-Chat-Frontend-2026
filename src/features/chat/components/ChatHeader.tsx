import React from 'react';
import { ArrowLeft, Search, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  activeConversationName: string;
  avatarSrc: string;
  onBack: () => void;
  onToggleInfo: () => void;
  onZoomImage: (url: string) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeConversationName,
  avatarSrc,
  onBack,
  onToggleInfo,
  onZoomImage,
}) => {
  return (
    <div className="h-16 border-b border-border px-0 sm:px-6 flex items-center justify-between z-10 bg-card/65 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Back button for mobile */}
        <button
          onClick={onBack}
          className="md:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </button>

        {/* Avatar — click to zoom */}
        <button
          onClick={() => onZoomImage(avatarSrc)}
          className="relative shrink-0 rounded-full ring-2 ring-transparent hover:ring-brand/40 transition-all duration-200 active:scale-95"
          aria-label="View profile photo"
        >
          <img
            src={avatarSrc}
            alt={activeConversationName}
            className="h-10 w-10 rounded-full object-cover"
          />
          {activeConversationName === 'Emma Thompsonsdfffffffffffffsd' && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
          )}
        </button>

        {/* Name — click to toggle info panel */}
        <button
          onClick={onToggleInfo}
          className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity active:opacity-60"
          aria-label="Toggle chat info"
        >
          <h2 className="text-sm font-semibold text-foreground leading-tight truncate">
            {activeConversationName}
          </h2>
          <p className="text-[10px] sm:text-xs text-green-500 font-medium truncate">
            {activeConversationName === 'Emma Thompsonsdfffffffffffffsd'
              ? '● Online'
              : 'Group chat'}
          </p>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground">
        <button
          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all"
          aria-label="Search messages"
        >
          <Search className="size-5" />
        </button>
        <button
          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all"
          aria-label="Start voice call"
        >
          <Phone className="size-5" />
        </button>
        <button
          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all"
          aria-label="Start video call"
        >
          <Video className="size-5" />
        </button>
        <button
          onClick={onToggleInfo}
          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all"
          aria-label="More actions"
        >
          <MoreVertical className="size-5" />
        </button>
      </div>
    </div>
  );
};
