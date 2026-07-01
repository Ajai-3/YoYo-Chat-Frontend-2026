import React, { useState, useRef } from 'react';
import { Smile, Paperclip, Mic, Send, FileText, Image as ImageIcon, Crop, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type Attachment, type Message } from '../data/mockData';
import { type ChatTheme } from '../data/themeConfig';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  attachments: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
  onSubmit: (e: React.FormEvent) => void;
  onTriggerCrop: (index: number) => void;
  replyingTo?: Message | null;
  onCancelReply?: () => void;
  activeTheme?: ChatTheme;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  attachments,
  setAttachments,
  onSubmit,
  onTriggerCrop,
  replyingTo,
  onCancelReply,
  activeTheme,
}) => {
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'doc') => {
    setShowAttachMenu(false);
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newAttachment: Attachment = {
          name: file.name,
          url: reader.result as string,
          mimeType: file.type || (type === 'image' ? 'image/jpeg' : 'application/octet-stream'),
          size: file.size,
        };
        setAttachments((prev) => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-2 sm:p-4 border-t border-border z-10 bg-card/65 backdrop-blur-md flex flex-col gap-3 relative">
      {/* Replying message preview banner */}
      {replyingTo && (
        <div className="flex items-center justify-between px-4 py-2 bg-brand/10 border-l-4 border-brand rounded-xl text-xs text-muted-foreground z-10 shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <span className="font-semibold text-foreground block mb-0.5 text-[11px] uppercase tracking-wider">Replying to message</span>
            <p className="truncate text-foreground/80 font-medium">{replyingTo.content}</p>
          </div>
          <button
            type="button"
            onClick={onCancelReply}
            className="h-5 w-5 rounded-md hover:bg-accent/25 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'image')}
      />
      <input
        ref={docInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'doc')}
      />

      {/* Horizontal Previews */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-3 px-2 py-1 max-h-32 overflow-y-auto bg-accent/5 rounded-2xl p-2 border border-border/30">
          {attachments.map((att, index) => {
            const isImage = att.mimeType.startsWith('image/');
            return (
              <div
                key={index}
                className="relative group h-20 w-20 rounded-xl overflow-hidden border border-border bg-background flex flex-col items-center justify-center text-center shadow-sm"
              >
                {isImage ? (
                  <>
                    <img
                      src={att.url}
                      alt={att.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity">
                      <button
                        type="button"
                        onClick={() => onTriggerCrop(index)}
                        className="p-1 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors"
                        aria-label="Crop image"
                      >
                        <Crop className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-1.5 h-full w-full flex flex-col justify-between items-center relative">
                    <FileText className="size-8 text-brand/80" />
                    <span className="text-[10px] font-medium truncate w-full px-1 text-foreground">
                      {att.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="absolute top-1 right-1 h-5 w-5 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* WhatsApp-style Attachment Menu Popover */}
      {showAttachMenu && (
        <div className="absolute bottom-16 right-16 sm:right-28 bg-popover text-popover-foreground rounded-2xl shadow-xl border border-border p-2 flex flex-col gap-1 z-30 min-w-[140px] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            type="button"
            onClick={() => { fileInputRef.current?.click(); setShowAttachMenu(false); }}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-accent/15 rounded-xl text-left transition-colors w-full"
          >
            <ImageIcon className="size-4 text-purple-500" />
            <span>Photos</span>
          </button>
          <button
            type="button"
            onClick={() => { docInputRef.current?.click(); setShowAttachMenu(false); }}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-accent/15 rounded-xl text-left transition-colors w-full"
          >
            <FileText className="size-4 text-blue-500" />
            <span>Document</span>
          </button>
        </div>
      )}

      <form onSubmit={onSubmit} className="w-full flex items-center gap-1 sm:gap-3">
        <button
          type="button"
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all"
          aria-label="Choose emoji"
        >
          <Smile className="size-5" />
        </button>

        <div className="flex-1 relative flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-11 pl-4 pr-32 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand/40 text-sm transition-all duration-300"
          />

          <div className="absolute right-2.5 flex items-center gap-2 text-muted-foreground">
            <button
              type="button"
              onClick={() => setShowAttachMenu((prev) => !prev)}
              className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all ${
                showAttachMenu ? 'bg-brand/10 text-brand' : 'hover:bg-accent/20 hover:text-foreground'
              }`}
              aria-label="Attach menu"
            >
              <Paperclip className="size-5" />
            </button>
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 hover:text-foreground transition-all"
              aria-label="Record voice note"
            >
              <Mic className="size-5" />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          size="icon"
          style={activeTheme ? { backgroundImage: activeTheme.bubbleGradient, color: activeTheme.textColor } : undefined}
          className="h-11 w-11 flex items-center justify-center bg-brand text-brand-foreground rounded-full hover:bg-brand/90 hover:scale-105 active:scale-95 transition-all shadow-lg flex-shrink-0 border-none"
          aria-label="Send message"
        >
          <Send className="size-5 fill-current ml-0.5" />
        </Button>
      </form>
    </div>
  );
};
