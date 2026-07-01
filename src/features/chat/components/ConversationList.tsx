import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import logoIcon from '@/assets/logo-icon.png';
import { type ConversationView } from '../data/mockData';
import { ImageZoomLightbox } from '@/components/ImageZoomLightbox';
import { ConversationItem } from './ConversationItem';
import { CallItem, BookmarkItem, ChannelItem, NotificationItem } from './TabItems';

interface ConversationListProps {
  activeTab: string;
  conversations: ConversationView[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onCreateGroup: () => void;
  onStartAnonymous?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  activeTab,
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateGroup,
  onStartAnonymous,
}) => {
  const [showTeaser, setShowTeaser] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Close zoom on Escape
  useEffect(() => {
    if (!zoomedImage) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedImage(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomedImage]);

  // Filter conversations for the "chats" tab
  const filteredConversations = conversations.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessagePreview.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chats': {
        const directConversations = filteredConversations.filter((c) => c.type === 'direct');
        return (
          <div className="flex-1 overflow-y-auto px-3 space-y-1.5 pb-4">
            {directConversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                conv={conv}
                isActive={activeConversationId === conv._id}
                onSelect={onSelectConversation}
                onZoomImage={setZoomedImage}
                formatTime={formatTime}
              />
            ))}
            {directConversations.length === 0 && (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No active direct conversations.
              </div>
            )}
          </div>
        );
      }

      case 'groups': {
        const groupConversations = filteredConversations.filter((c) => c.type === 'group');
        return (
          <div className="flex-1 overflow-y-auto px-3 space-y-1.5 pb-4">
            {groupConversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                conv={conv}
                isActive={activeConversationId === conv._id}
                onSelect={onSelectConversation}
                onZoomImage={setZoomedImage}
                formatTime={formatTime}
              />
            ))}
            {groupConversations.length === 0 && (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No active group conversations.
              </div>
            )}
          </div>
        );
      }

      case 'calls':
        return (
          <div className="flex-1 overflow-y-auto px-3 space-y-3 pb-4">
            <CallItem type="incoming" name="Emma Thompson" time="2 hours ago" />
            <CallItem type="missed" name="Noah Williams" time="Yesterday, 4:15 PM" />
          </div>
        );

      case 'bookmarks':
        return (
          <div className="flex-1 overflow-y-auto px-3 space-y-3 pb-4">
            <BookmarkItem filename="Figma-Design-System.fig" source="Emma Thompson chat" />
          </div>
        );

      case 'channels':
        return (
          <div className="flex-1 overflow-y-auto px-3 space-y-2 pb-4">
            {['announcements', 'general-discussion', 'tech-stack', 'random'].map((channel) => (
              <ChannelItem key={channel} channel={channel} />
            ))}
          </div>
        );

      case 'notifications':
        return (
          <div className="flex-1 overflow-y-auto px-3 space-y-3 pb-4">
            <NotificationItem
              title="Security Alert"
              desc="New login detected from Safari on macOS."
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-card text-card-foreground transition-colors duration-500">
      {zoomedImage && (
        <ImageZoomLightbox imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden p-4 flex items-center justify-between border-b border-border bg-card/60 backdrop-blur-md gap-2">
        <img src={logoIcon} alt="Logo" className="h-8 w-8 object-contain flex-shrink-0" />
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 pl-8 pr-7 rounded-lg border border-border bg-background focus:outline-none focus:border-brand/40 text-xs transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-lg border-border text-muted-foreground hover:text-foreground hover:bg-accent/20 flex-shrink-0"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </Button>
        <Button
          size="icon"
          onClick={onCreateGroup}
          className="h-8 w-8 bg-brand text-brand-foreground rounded-lg border-none flex-shrink-0"
          aria-label="Create new group"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Desktop Search Header */}
      <div className="hidden md:flex p-2 md:p-6 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-9 rounded-xl border border-border bg-background focus:outline-none focus:border-brand/40 text-sm transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Dynamic Content */}
      {renderTabContent()}

      {/* Teaser card at the bottom of the list */}
      {activeTab === 'chats' && showTeaser && (
        <div className="p-3 border-t border-border flex-shrink-0 bg-purple-950/15 m-3 rounded-2xl border border-purple-500/10 flex flex-col gap-2 relative">
          <button
            onClick={() => setShowTeaser(false)}
            className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Dismiss"
          >
            <X className="size-3.5" />
          </button>
          <div className="flex items-center gap-2 pr-6">
            <span className="text-base">🎭</span>
            <h4 className="text-xs font-bold text-foreground">Anonymous Chat</h4>
            <span className="text-[8px] bg-purple-600/20 text-purple-400 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
              Beta
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed pr-2">
            Chat randomly with people around the world. No names, hassle-free.
          </p>
          <button
            onClick={onStartAnonymous}
            className="w-full py-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 bg-purple-600/10 hover:bg-purple-600/20 rounded-xl border border-purple-500/20 active:scale-95 transition-all text-center"
          >
            Start Anonymous Chat
          </button>
        </div>
      )}
    </div>
  );
};
