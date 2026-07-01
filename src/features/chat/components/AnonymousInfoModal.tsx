import React from 'react';
import { X, VenetianMask } from 'lucide-react';

interface AnonymousInfoModalProps {
  onClose: () => void;
}

export const AnonymousInfoModal: React.FC<AnonymousInfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-card rounded-3xl shadow-2xl border border-border p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-400">
            <VenetianMask className="size-6" />
            <h3 className="font-bold text-lg">Anonymous Chat</h3>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Anonymous Chat connects you randomly with people around the world. No usernames or personal profile details are shared.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          To keep the platform safe, please be respectful and avoid sharing sensitive personal information. Report any inappropriate messages instantly using the red flag inside the chat window.
        </p>

        <button
          onClick={onClose}
          className="mt-2 w-full h-10 bg-brand text-brand-foreground hover:bg-brand/90 font-semibold rounded-xl text-xs active:scale-95 transition-all border-none"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
