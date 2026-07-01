import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCropperProps {
  imageSrc: string;
  cropShape?: 'round' | 'rect';
  onCropComplete: (croppedImageBase64: string) => void;
  onClose: () => void;
}

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    resolve(canvas.toDataURL('image/jpeg'));
  });
};

export const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  cropShape = 'round',
  onCropComplete,
  onClose,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // Aspect ratio state. Default is 1 for round/rect 1:1.
  const [aspect, setAspect] = useState<number | undefined>(cropShape === 'round' ? 1 : 1);

  const onCropCompleteHandler = (
    _croppedArea: any,
    croppedAreaPixelsData: any
  ) => {
    setCroppedAreaPixels(croppedAreaPixelsData);
  };

  const handleCropSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      const base64 = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(base64);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col h-[520px] max-h-[90vh]">
        {/* Header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-border flex-shrink-0">
          <h2 className="text-base font-semibold text-foreground">Crop Image</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Cropper Container */}
        <div className="flex-1 relative bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={cropShape === 'rect'}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-border flex flex-col gap-4 bg-card flex-shrink-0">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-brand h-1.5 rounded-full bg-accent cursor-pointer"
            />
          </div>

          {/* Aspect Ratios for square mode */}
          {cropShape === 'rect' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setAspect(1)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                  aspect === 1 ? 'bg-brand text-brand-foreground border-brand' : 'border-border text-foreground hover:bg-accent/15'
                }`}
              >
                1:1 (Square)
              </button>
              <button
                onClick={() => setAspect(4 / 3)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                  aspect === 4 / 3 ? 'bg-brand text-brand-foreground border-brand' : 'border-border text-foreground hover:bg-accent/15'
                }`}
              >
                4:3
              </button>
              <button
                onClick={() => setAspect(16 / 9)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                  aspect === 16 / 9 ? 'bg-brand text-brand-foreground border-brand' : 'border-border text-foreground hover:bg-accent/15'
                }`}
              >
                16:9
              </button>
              <button
                onClick={() => setAspect(undefined)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                  aspect === undefined ? 'bg-brand text-brand-foreground border-brand' : 'border-border text-foreground hover:bg-accent/15'
                }`}
              >
                Free
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCropSave}
              className="h-10 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 border-none shadow-lg shadow-brand/20"
            >
              Apply Crop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
