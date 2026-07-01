import React, { useState } from 'react';
import { VenetianMask, Plus, Info, ShieldCheck } from 'lucide-react';
import { type AnonymousConversationView } from '../data/mockAnonymousData';
import { AnonymousInfoModal } from './AnonymousInfoModal';

interface AnonymousListProps {
  conversations: AnonymousConversationView[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onStartNewChat: () => void;
  onEndChat: (id: string) => void;
}

export const AnonymousList: React.FC<AnonymousListProps> = ({
  conversations,
  activeChatId,
  onSelectChat,
  onStartNewChat,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const activeConversation = conversations.find((c) => c._id === activeChatId);

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-card text-card-foreground transition-colors duration-500 relative">
      
      {/* Explanation Info Modal */}
      {showInfo && <AnonymousInfoModal onClose={() => setShowInfo(false)} />}

      {/* FIXED TOP HEADER */}
      <div className="h-16 px-6 flex items-center justify-between shrink-0 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-foreground">Anonymous Chat</h2>
          <span className="text-[10px] bg-purple-600/20 text-purple-400 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90">
            Beta
          </span>
        </div>
        <button
          onClick={() => setShowInfo(true)}
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Info"
        >
          <Info className="size-5" />
        </button>
      </div>

      {/* FIXED TOP BANNER INFO CARD */}
      <div className="p-4 pb-0 flex flex-col gap-3 shrink-0">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/60 to-brand/35 border border-purple-500/20 p-4 shadow-md flex items-center justify-between gap-3">
          <div className="absolute right-[-15px] bottom-[-15px] opacity-15 text-purple-300">
            <VenetianMask className="size-20" />
          </div>
          <div className="z-10">
            <div className="flex items-center gap-2 mb-1.5 text-purple-300">
              <ShieldCheck className="size-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">You are anonymous</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              Your identity is hidden. Be kind and respect others.
            </p>
          </div>
        </div>

        {/* Connected state (Status Badge ONLY, End button moved to chat header) */}
        {activeConversation && (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-500/5 border border-green-500/10">
            <div className="h-6 w-6 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center flex-shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Chat - Connected</p>
            </div>
          </div>
        )}
      </div>

      {/* SCROLLABLE HISTORIC CHATS LIST CONTAINER */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {conversations.map((conv) => {
          const isActive = activeChatId === conv._id;
          return (
            <button
              key={conv._id}
              onClick={() => onSelectChat(conv._id)}
              className={`w-full p-3 rounded-2xl flex gap-3 text-left transition-all duration-300 relative ${
                isActive
                  ? 'bg-purple-600/15 border border-purple-500/20 shadow-sm'
                  : 'hover:bg-accent/10 border border-transparent'
              }`}
            >
              {/* Mask icon as avatar */}
              <div
                style={{ backgroundColor: `${conv.maskColor}15`, color: conv.maskColor }}
                className="h-11 w-11 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <VenetianMask className="size-6" />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-semibold truncate ${
                      isActive ? 'text-purple-400' : 'text-foreground'
                    }`}
                  >
                    {conv.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground/80 flex-shrink-0">
                    {formatTime(conv.lastMessageAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground truncate pr-2">
                    {conv.lastMessagePreview}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
        {conversations.length === 0 && (
          <div className="text-center py-12 text-xs text-muted-foreground">
            No active anonymous chats. Start a new one!
          </div>
        )}
      </div>

      {/* FIXED FOOTER WITH BUTTON */}
      <div className="p-4 pt-0 border-t border-border/30 bg-card shrink-0">
        <button
          onClick={onStartNewChat}
          className="w-full h-12 rounded-xl border border-purple-500/30 hover:border-purple-500/50 bg-purple-600/10 hover:bg-purple-600/15 text-purple-400 font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <Plus className="size-4" />
          Start New Chat
        </button>
      </div>
    </div>
  );
};
