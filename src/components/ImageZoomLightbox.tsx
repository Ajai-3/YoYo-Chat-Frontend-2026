import React from 'react';
import { X } from 'lucide-react';

interface ImageZoomLightboxProps {
  imageUrl: string;
  onClose: () => void;
  altText?: string;
}

export const ImageZoomLightbox: React.FC<ImageZoomLightboxProps> = ({
  imageUrl,
  onClose,
  altText = 'Zoomed View',
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="size-5" />
      </button>
      <img
        src={imageUrl}
        alt={altText}
        className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
