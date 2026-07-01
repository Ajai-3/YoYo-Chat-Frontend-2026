import React, { useState } from 'react';
import { CheckCheck, FileText, Download, Play, Pause, MoreVertical } from 'lucide-react';
import { type Message } from '../data/mockData';
import { type ChatTheme } from '../data/themeConfig';

interface MessageBubbleProps {
  msg: Message;
  isSelf: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  activeConversationAvatar?: string;
  isPlayingVoice: boolean;
  onPlayVoiceToggle: () => void;
  formatTime: (timeStr: string) => string;
  activeTheme?: ChatTheme;
  onDelete?: (id: string) => void;
  onReply?: (msg: Message) => void;
  onEdit?: (msg: Message) => void;
}

export const MessageStatus: React.FC<{ status: 'sent' | 'delivered' | 'read' }> = ({ status }) => {
  if (status === 'read') {
    return <CheckCheck className="size-4 text-blue-500" />;
  }
  return <CheckCheck className="size-4 text-muted-foreground" />;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  msg,
  isSelf,
  isFirstInGroup,
  isLastInGroup,
  activeConversationAvatar,
  isPlayingVoice,
  onPlayVoiceToggle,
  formatTime,
  activeTheme,
  onDelete,
  onReply,
  onEdit,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarSrc = activeConversationAvatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80';

  return (
    <div
      className={`flex items-end gap-3 w-full group relative ${
        isSelf ? 'flex-row-reverse' : 'flex-row'
      } ${isLastInGroup ? 'mb-4' : 'mb-0.5'}`}
    >
      {/* Avatar — only rendered for other person's messages */}
      {!isSelf && (
        <div className="w-10 flex-shrink-0 flex items-end justify-center">
          {isLastInGroup ? (
            <img
              src={avatarSrc}
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10" /> /* spacer */
          )}
        </div>
      )}

      {/* Bubble Container */}
      <div className="relative group/bubble max-w-[72%] sm:max-w-[60%] flex flex-col">
        {/* Text bubble */}
        {msg.type === 'text' && (
          <>
            <div
              style={isSelf && activeTheme ? { backgroundImage: activeTheme.bubbleGradient, color: activeTheme.textColor } : undefined}
              className={`
                px-5 py-3.5 pr-9 text-[15px] font-medium leading-snug shadow-sm relative break-all
                ${isSelf
                  ? 'bg-brand text-brand-foreground rounded-[22px] rounded-br-[6px]'
                  : 'bg-[#1c1c1e] text-white rounded-[22px] rounded-bl-[6px] border border-white/5'
                }
                ${!isFirstInGroup && isSelf ? 'rounded-tr-[22px]' : ''}
                ${!isFirstInGroup && !isSelf ? 'rounded-tl-[22px]' : ''}
              `}
            >
              {/* Replying quote preview */}
              {msg.replyToContent && (
                <div className="mb-2 p-2 bg-black/20 text-white/80 rounded-lg text-xs border-l-4 border-white/40 max-w-full truncate font-normal leading-normal">
                  {msg.replyToContent}
                </div>
              )}
              
              <span>{msg.content}</span>

              {/* 3-dot trigger absolutely positioned inside the bubble */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="absolute top-2.5 right-2 h-6 w-6 text-white/40 hover:text-white flex items-center justify-center transition-colors z-10"
                aria-label="Message options"
              >
                <MoreVertical className="size-3.5" />
              </button>

              {/* Dropdown Options inside bubble */}
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                  <div className={`absolute bottom-full mb-2 bg-popover text-popover-foreground border border-border rounded-xl shadow-lg p-1.5 min-w-[100px] flex flex-col gap-0.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150 ${isSelf ? 'right-0' : 'left-0'}`}>
                    {isSelf ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(false);
                            onEdit?.(msg);
                          }}
                          className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-foreground/80 w-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(false);
                            onDelete?.(msg._id);
                          }}
                          className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-red-500 w-full"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(false);
                          onReply?.(msg);
                        }}
                        className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-foreground/80 w-full"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            {isLastInGroup && (
              <div className={`flex items-center gap-1 mt-1.5 px-1 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-[11px] text-muted-foreground/60 font-medium">
                  {formatTime(msg.createdAt)}
                </span>
                {isSelf && <MessageStatus status={msg.status} />}
              </div>
            )}
          </>
        )}

        {/* File attachment bubble */}
        {msg.type === 'file' &&
          msg.attachments &&
          msg.attachments[0].mimeType !== 'audio/mpeg' && (
            <>
              <div
                style={isSelf && activeTheme ? { backgroundImage: activeTheme.bubbleGradient, color: activeTheme.textColor } : undefined}
                className="px-4 py-3.5 pr-8 rounded-[22px] rounded-br-[6px] bg-brand text-brand-foreground text-sm flex items-center gap-4 shadow-md min-w-[240px] sm:min-w-[280px] relative"
              >
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate text-[15px]">
                    {msg.attachments[0].name}
                  </h4>
                  <p className="text-xs text-brand-foreground/75 mt-0.5">
                    {(msg.attachments[0].size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
                <button className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all flex-shrink-0 mr-4">
                  <Download className="size-4" />
                </button>

                {/* 3-dot trigger absolutely positioned inside the bubble */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                  className="absolute top-2.5 right-2 h-6 w-6 text-white/40 hover:text-white flex items-center justify-center transition-colors z-10"
                  aria-label="Message options"
                >
                  <MoreVertical className="size-3.5" />
                </button>

                {/* Dropdown Options inside bubble */}
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                    <div className={`absolute bottom-full mb-2 bg-popover text-popover-foreground border border-border rounded-xl shadow-lg p-1.5 min-w-[100px] flex flex-col gap-0.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150 ${isSelf ? 'right-0' : 'left-0'}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(false);
                          onDelete?.(msg._id);
                        }}
                        className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-red-500 w-full"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
              {isLastInGroup && (
                <div className="flex items-center gap-1 mt-1.5 px-1 flex-row-reverse">
                  <span className="text-[11px] text-muted-foreground/60 font-medium">
                    {formatTime(msg.createdAt)}
                  </span>
                  {isSelf && <MessageStatus status={msg.status} />}
                </div>
              )}
            </>
          )}

        {/* Voice message bubble */}
        {msg.type === 'file' &&
          msg.attachments &&
          msg.attachments[0].mimeType === 'audio/mpeg' && (
            <>
              <div
                style={isSelf && activeTheme ? { backgroundImage: activeTheme.bubbleGradient, color: activeTheme.textColor } : undefined}
                className={`px-4 py-3.5 pr-8 rounded-[22px] ${
                  isSelf
                    ? 'rounded-br-[6px] bg-brand text-brand-foreground'
                    : 'rounded-bl-[6px] bg-[#1c1c1e] text-white border border-white/5'
                } text-sm flex items-center gap-3 min-w-[240px] sm:min-w-[280px] shadow-sm relative`}
              >
                <button
                  onClick={onPlayVoiceToggle}
                  style={!isSelf && activeTheme ? { backgroundImage: activeTheme.bubbleGradient, color: activeTheme.textColor } : undefined}
                  className={`h-10 w-10 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all flex-shrink-0 ${
                    isSelf ? 'bg-white/20 text-white' : 'bg-brand text-brand-foreground'
                  }`}
                >
                  {isPlayingVoice ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                </button>

                <div className="flex-1 flex items-center gap-[3px] h-7 px-1">
                  {[35, 60, 45, 75, 55, 30, 65, 80, 50, 70, 40, 85, 60, 40, 70, 90, 50, 60, 30, 45, 65, 50, 35, 75, 45].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className={`w-[3px] rounded-full transition-all duration-300 ${
                        isPlayingVoice ? 'bg-current animate-pulse opacity-80' : 'opacity-40 bg-current'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-semibold opacity-70 flex-shrink-0 mr-4">0:45</span>

                {/* 3-dot trigger absolutely positioned inside the bubble */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                  className="absolute top-2.5 right-2 h-6 w-6 text-white/40 hover:text-white flex items-center justify-center transition-colors z-10"
                  aria-label="Message options"
                >
                  <MoreVertical className="size-3.5" />
                </button>

                {/* Dropdown Options inside bubble */}
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                    <div className={`absolute bottom-full mb-2 bg-popover text-popover-foreground border border-border rounded-xl shadow-lg p-1.5 min-w-[100px] flex flex-col gap-0.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150 ${isSelf ? 'right-0' : 'left-0'}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(false);
                          onDelete?.(msg._id);
                        }}
                        className="text-left px-3 py-1.5 text-xs font-semibold hover:bg-accent/15 rounded-lg text-red-500 w-full"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
              {isLastInGroup && (
                <div className={`flex items-center gap-1 mt-1.5 px-1 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-[11px] text-muted-foreground/60 font-medium">
                    {formatTime(msg.createdAt)}
                  </span>
                  {isSelf && <MessageStatus status={msg.status} />}
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
};

export const TypingIndicator: React.FC<{ activeConversationAvatar?: string }> = ({
  activeConversationAvatar,
}) => {
  const avatarSrc = activeConversationAvatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80';

  return (
    <div className="flex items-end gap-3 mb-4">
      <img
        src={avatarSrc}
        alt="Avatar"
        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="px-5 py-4 rounded-[22px] rounded-bl-[6px] bg-[#1c1c1e] border border-white/5 flex items-center gap-1.5 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};
