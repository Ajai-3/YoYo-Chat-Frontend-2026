import React, { useState } from 'react';
import { CheckCheck, Users, Sparkles, Film, Home, FolderDot, MoreVertical } from 'lucide-react';
import { type ConversationView } from '../data/mockData';

interface ConversationItemProps {
  conv: ConversationView;
  isActive: boolean;
  onSelect: (id: string) => void;
  onZoomImage: (url: string) => void;
  formatTime: (timeStr: string) => string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conv,
  isActive,
  onSelect,
  onZoomImage,
  formatTime,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderAvatar = () => {
    if (conv.type === 'group') {
      switch (conv.name) {
        case 'Product Team':
          return (
            <div className="h-11 w-11 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center flex-shrink-0">
              <Users className="size-5" />
            </div>
          );
        case 'Design Squad':
          return (
            <div className="h-11 w-11 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="size-5" />
            </div>
          );
        case 'Movie Night':
          return (
            <div className="h-11 w-11 rounded-full bg-yellow-600/20 text-yellow-500 flex items-center justify-center flex-shrink-0">
              <Film className="size-5" />
            </div>
          );
        case 'Family Group':
          return (
            <div className="h-11 w-11 rounded-full bg-rose-600/20 text-rose-500 flex items-center justify-center flex-shrink-0">
              <Home className="size-5" />
            </div>
          );
        default:
          return (
            <div className="h-11 w-11 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
              <FolderDot className="size-5" />
            </div>
          );
      }
    }

    return (
      <div className="relative flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (conv.avatar_url) onZoomImage(conv.avatar_url);
          }}
          className="rounded-full ring-2 ring-transparent hover:ring-brand/40 transition-all duration-200 active:scale-95 block"
          aria-label={`View ${conv.name}'s photo`}
        >
          <img
            src={conv.avatar_url}
            alt={conv.name}
            className="h-11 w-11 rounded-full object-cover"
          />
        </button>
        {conv.name === 'Emma Thompsonsdfffffffffffffsd' && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background pointer-events-none" />
        )}
      </div>
    );
  };

  const renderMessageTicks = () => {
    if (
      conv.type === 'direct' &&
      conv.unreadCount === 0 &&
      conv._id !== 'conv-emma'
    ) {
      return (
        <CheckCheck className="size-4 text-brand mr-1 inline flex-shrink-0" />
      );
    }
    if (conv.name === 'Sophia Lee' || conv.name === 'Noah Williams') {
      return (
        <CheckCheck className="size-4 text-brand mr-1 inline flex-shrink-0" />
      );
    }
    return null;
  };

  return (
    <div className="relative group w-full">
      <button
        onClick={() => onSelect(conv._id)}
        className={`w-full p-3 rounded-2xl flex gap-3 text-left transition-all duration-300 relative ${
          isActive
            ? 'bg-brand/10 dark:bg-brand/20 shadow-sm border border-brand/10'
            : 'hover:bg-accent/10 border border-transparent'
        }`}
      >
        {renderAvatar()}

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 pr-6">
          <div className="flex items-center justify-between">
            <h3
              className={`text-sm font-semibold truncate pr-2 ${
                isActive ? 'text-brand dark:text-foreground' : 'text-foreground'
              }`}
            >
              {conv.name}
            </h3>
            <span className="text-[10px] md:text-xs text-muted-foreground/80 flex-shrink-0">
              {formatTime(conv.lastMessageAt)}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground truncate flex items-center pr-2">
              {renderMessageTicks()}
              <span className="truncate">{conv.lastMessagePreview}</span>
            </p>

            {conv.unreadCount > 0 && (
              <span className="h-5 min-w-5 px-1.5 rounded-full bg-brand text-brand-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {conv.unreadCount}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* 3-dot Menu Action button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
        className="absolute right-3 top-4 h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground z-10 transition-colors"
        aria-label="More options"
      >
        <MoreVertical className="size-4" />
      </button>

      {/* Dropdown container */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-3 top-11 bg-popover text-popover-foreground border border-border rounded-xl shadow-lg p-1.5 min-w-[130px] flex flex-col gap-0.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                alert('Chat deleted successfully!');
              }}
              className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-red-500 w-full"
            >
              Delete Chat
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                alert('User blocked successfully!');
              }}
              className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-foreground/80 w-full"
            >
              Block User
            </button>
          </div>
        </>
      )}
    </div>
  );
};
