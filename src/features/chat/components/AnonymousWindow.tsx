import React, { useState, useRef, useEffect } from 'react';
import { VenetianMask, Flag, ArrowLeft, MoreVertical, ShieldCheck, CheckCheck } from 'lucide-react';
import chatBackground from '@/assets/chat/bg_purple_nebula.png';
import { CHAT_THEMES } from '../data/themeConfig';
import { type Message, type Attachment, currentUser } from '../data/mockData';
import { ImageCropper } from '@/components/ImageCropper';
import { ChatInput } from './ChatInput';

interface AnonymousWindowProps {
  chatName: string;
  maskColor: string;
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'file', attachments?: Attachment[]) => void;
  onBack: () => void;
  onReport: () => void;
}

export const AnonymousWindow: React.FC<AnonymousWindowProps> = ({
  chatName,
  maskColor,
  messages,
  onSendMessage,
  onBack,
  onReport,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isEnded, setIsEnded] = useState(false);
  const [cropperIndex, setCropperIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEnded) return;
    if (!inputValue.trim() && attachments.length === 0) return;
    if (attachments.length > 0) {
      onSendMessage(attachments[0].name, 'file', attachments);
    } else {
      onSendMessage(inputValue, 'text');
    }
    setInputValue('');
    setAttachments([]);
  };

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-card text-card-foreground relative transition-colors duration-500">
      {/* Background Decoration */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-50 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${chatBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Top Header Bar */}
      <div className="h-16 border-b border-border px-0 sm:px-6 flex items-center justify-between z-10 bg-card/65 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="md:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" />
          </button>

          {/* Mask Avatar */}
          <div
            style={{ backgroundColor: `${maskColor}15`, color: maskColor }}
            className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-500/10"
          >
            <VenetianMask className="size-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-foreground leading-tight truncate">
              {chatName}
            </h2>
            <p className={`text-[10px] sm:text-xs font-medium truncate ${isEnded ? 'text-muted-foreground' : 'text-green-500'}`}>
              {isEnded ? '● Disconnected' : '● Online'}
            </p>
          </div>
        </div>

        {/* End/Reconnect toggle and safety badges */}
        <div className="flex items-center gap-2 text-muted-foreground">
          {/* Safety Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/10 border border-purple-500/20 text-[10px] text-purple-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="size-3.5" />
            <span>Your identity is hidden</span>
          </div>

          {/* End Chat/Reconnect button */}
          {isEnded ? (
            <button
              onClick={() => setIsEnded(false)}
              className="px-3 py-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 bg-purple-600/10 hover:bg-purple-600/15 rounded-xl border border-purple-500/20 active:scale-95 transition-all flex-shrink-0"
            >
              Reconnect
            </button>
          ) : (
            <button
              onClick={() => setIsEnded(true)}
              className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/15 rounded-xl border border-red-500/20 active:scale-95 transition-all flex-shrink-0"
            >
              End Chat
            </button>
          )}

          <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all">
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>

      {/* Messages thread */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-1 z-10">
        <div className="flex justify-center mb-5">
          <span className="text-[10px] font-semibold text-muted-foreground/80 bg-accent/25 dark:bg-background/45 backdrop-blur-md px-3 py-1 rounded-full border border-border/30">
            Today
          </span>
        </div>

        {messages.map((msg, index) => {
          const isSelf = msg.senderId === currentUser.id;
          const nextMsg = messages[index + 1];
          const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-3 w-full ${
                isSelf ? 'flex-row-reverse' : 'flex-row'
              } ${isLastInGroup ? 'mb-4' : 'mb-0.5'}`}
            >
              {/* Mask avatar for stranger */}
              {!isSelf && (
                <div className="w-10 flex-shrink-0 flex items-end justify-center">
                  {isLastInGroup ? (
                    <div
                      style={{ backgroundColor: `${maskColor}15`, color: maskColor }}
                      className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-500/10"
                    >
                      <VenetianMask className="size-5" />
                    </div>
                  ) : (
                    <div className="h-10 w-10" />
                  )}
                </div>
              )}

              <div className={`flex flex-col max-w-[72%] sm:max-w-[60%] ${isSelf ? 'items-end' : 'items-start'}`}>
                <div
                  style={isSelf ? { backgroundImage: CHAT_THEMES[1].bubbleGradient, color: CHAT_THEMES[1].textColor } : undefined}
                  className={`
                    px-5 py-3.5 text-[15px] font-medium leading-snug shadow-sm break-all
                    ${
                      isSelf
                        ? 'bg-brand text-brand-foreground rounded-[22px] rounded-br-[6px]'
                        : 'bg-[#1c1c1e] text-white rounded-[22px] rounded-bl-[6px] border border-white/5'
                    }
                  `}
                >
                  {msg.content}
                </div>
                {isLastInGroup && (
                  <div className={`flex items-center gap-1 mt-1.5 px-1 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[11px] text-muted-foreground/60 font-medium">
                      {formatTime(msg.createdAt)}
                    </span>
                    {isSelf && <CheckCheck className="size-4 text-blue-500" />}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input composer with footer footnotes / Reconnect banner */}
      <div className="z-10 flex flex-col bg-card/65 backdrop-blur-md">
        {isEnded ? (
          <div className="p-4 border-t border-border flex flex-col items-center justify-center gap-3 bg-accent/5 z-10 shrink-0">
            <p className="text-xs text-muted-foreground">Chat ended. Reconnect to send messages.</p>
            <button
              onClick={() => setIsEnded(false)}
              className="h-10 px-6 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-semibold text-xs active:scale-95 transition-all border-none"
            >
              Reconnect Chat
            </button>
          </div>
        ) : (
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            attachments={attachments}
            setAttachments={setAttachments}
            onSubmit={handleSend}
            onTriggerCrop={(index) => setCropperIndex(index)}
            activeTheme={CHAT_THEMES[1]}
          />
        )}
        <div className="px-6 py-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground bg-accent/5">
          <span>Remember: Be kind and respectful. Report inappropriate behavior.</span>
          <button
            onClick={onReport}
            className="flex items-center gap-1 text-red-500 hover:text-red-400 font-semibold transition-colors"
          >
            <Flag className="size-3.5" />
            <span>Report User</span>
          </button>
        </div>
      </div>

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
