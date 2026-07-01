import React, { useState, useRef, useEffect } from 'react';
import chatBackground from '@/assets/chat/bg_starry_blue.png';
import { type Message, type Attachment, currentUser } from '../data/mockData';
import { ImageZoomLightbox } from '@/components/ImageZoomLightbox';
import { ImageCropper } from '@/components/ImageCropper';
import { type ChatTheme } from '../data/themeConfig';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { MessageBubble, TypingIndicator } from './MessageBubble';

interface ChatWindowProps {
  activeConversationName: string;
  activeConversationAvatar: string;
  messages: Message[];
  onSendMessage: (
    content: string,
    type: 'text' | 'file',
    attachments?: Attachment[],
    replyToContent?: string,
  ) => void;
  onBack: () => void;
  onToggleInfo: () => void;
  activeTheme?: ChatTheme;
  onDeleteMessage?: (id: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  activeConversationName,
  activeConversationAvatar,
  messages,
  onSendMessage,
  onBack,
  onToggleInfo,
  activeTheme,
  onDeleteMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on load/new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close zoom on Escape key
  useEffect(() => {
    if (!zoomedImage) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedImage(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomedImage]);

  // Mock auto-typing simulation from Emma after sending a message
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].senderId === currentUser.id
    ) {
      const typeTimer = setTimeout(() => setIsTyping(true), 100);
      const replyTimer = setTimeout(() => {
        setIsTyping(false);
        onSendMessage(
          'This is an automated mock response. System is fully functional!',
          'text',
        );
      }, 3000);
      return () => {
        clearTimeout(typeTimer);
        clearTimeout(replyTimer);
      };
    }
  }, [messages.length]);

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [cropperIndex, setCropperIndex] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && attachments.length === 0) return;
    
    if (attachments.length > 0) {
      onSendMessage(attachments[0].name, 'file', attachments);
    } else {
      onSendMessage(inputValue, 'text', undefined, replyingTo?.content);
    }
    setInputValue('');
    setAttachments([]);
    setReplyingTo(null);
  };

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const avatarSrc = activeConversationAvatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80';

  return (
    <div className="flex-1 flex flex-col h-full bg-card text-card-foreground relative transition-colors duration-500">
      {zoomedImage && (
        <ImageZoomLightbox imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}

      {/* Background Decoration */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-50 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${activeTheme?.bg || chatBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Top Header Bar */}
      <ChatHeader
        activeConversationName={activeConversationName}
        avatarSrc={avatarSrc}
        onBack={onBack}
        onToggleInfo={onToggleInfo}
        onZoomImage={setZoomedImage}
      />

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-1 z-10">
        <div className="flex justify-center mb-5">
          <span className="text-[10px] font-semibold text-muted-foreground/80 bg-accent/25 dark:bg-background/45 backdrop-blur-md px-3 py-1 rounded-full border border-border/30">
            Today
          </span>
        </div>

        {/* Message Thread */}
        {messages.map((msg, index) => {
          const isSelf = msg.senderId === currentUser.id;
          const nextMsg = messages[index + 1];
          const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;
          const prevMsg = messages[index - 1];
          const isFirstInGroup = !prevMsg || prevMsg.senderId !== msg.senderId;

          return (
            <MessageBubble
              key={msg._id}
              msg={msg}
              isSelf={isSelf}
              isFirstInGroup={isFirstInGroup}
              isLastInGroup={isLastInGroup}
              activeConversationAvatar={activeConversationAvatar}
              isPlayingVoice={isPlayingVoice}
              onPlayVoiceToggle={() => setIsPlayingVoice(!isPlayingVoice)}
              formatTime={formatTime}
              activeTheme={activeTheme}
              onDelete={onDeleteMessage}
              onReply={(m) => setReplyingTo(m)}
              onEdit={(m) => {
                setInputValue(m.content);
                if (onDeleteMessage) onDeleteMessage(m._id);
              }}
            />
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <TypingIndicator activeConversationAvatar={activeConversationAvatar} />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        attachments={attachments}
        setAttachments={setAttachments}
        onSubmit={handleSend}
        onTriggerCrop={(index) => setCropperIndex(index)}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        activeTheme={activeTheme}
      />

      {/* Cropper Modal Overlay */}
      {cropperIndex !== null && attachments[cropperIndex] && (
        <ImageCropper
          imageSrc={attachments[cropperIndex].url}
          cropShape="rect"
          onCropComplete={(croppedImage) => {
            setAttachments((prev) =>
              prev.map((att, idx) =>
                idx === cropperIndex ? { ...att, url: croppedImage } : att
              )
            );
            setCropperIndex(null);
          }}
          onClose={() => setCropperIndex(null)}
        />
      )}
    </div>
  );
};
