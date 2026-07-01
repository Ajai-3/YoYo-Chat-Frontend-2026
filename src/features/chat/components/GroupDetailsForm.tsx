import React, { useRef, useState } from 'react';
import { Camera, Users, Lock, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageCropper } from '@/components/ImageCropper';

interface GroupDetailsFormProps {
  groupName: string;
  setGroupName: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  imagePreview: string;
  setImagePreview: (val: string) => void;
  isPrivate: boolean;
  setIsPrivate: (val: boolean) => void;
  onNext: () => void;
  canProceed: boolean;
}

export const GroupDetailsForm: React.FC<GroupDetailsFormProps> = ({
  groupName,
  setGroupName,
  bio,
  setBio,
  imagePreview,
  setImagePreview,
  isPrivate,
  setIsPrivate,
  onNext,
  canProceed,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [cropperImage, setCropperImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCropperImage(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <>
      {cropperImage && (
        <ImageCropper
          imageSrc={cropperImage}
          cropShape="round"
          onCropComplete={(croppedImage) => {
            setImagePreview(croppedImage);
            setCropperImage(null);
          }}
          onClose={() => setCropperImage(null)}
        />
      )}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {/* Group image */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Group"
                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-brand/10 text-brand flex items-center justify-center border-4 border-background shadow-lg">
                <Users className="size-10" />
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 h-8 w-8 bg-brand text-brand-foreground rounded-full flex items-center justify-center border-2 border-background shadow-md hover:bg-brand/90 active:scale-95 transition-all"
              aria-label="Upload group photo"
            >
              <Camera className="size-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="text-xs text-brand font-medium hover:underline"
          >
            {imagePreview ? 'Change photo' : 'Add group photo'}
          </button>
        </div>

        {/* Group name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Group Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g. Design Team"
            maxLength={50}
            className="h-11 rounded-xl border-border bg-background focus:border-brand/40 text-sm"
          />
          <p className="text-[10px] text-muted-foreground/60 text-right">{groupName.length}/50</p>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Description <span className="normal-case text-muted-foreground/60">(optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="What's this group about?"
            rows={3}
            maxLength={200}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-brand/40 transition-colors"
          />
          <p className="text-[10px] text-muted-foreground/60 text-right">{bio.length}/200</p>
        </div>

        {/* Privacy toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/5 border border-border/60">
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center ${
                isPrivate ? 'bg-brand/10 text-brand' : 'bg-green-500/10 text-green-500'
              }`}
            >
              {isPrivate ? <Lock className="size-4" /> : <Globe className="size-4" />}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {isPrivate ? 'Private Group' : 'Public Group'}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isPrivate ? 'Only invited members can join' : 'Anyone can find and join'}
              </p>
            </div>
          </div>
          {/* Toggle switch */}
          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-300 flex-shrink-0 ${
              isPrivate ? 'bg-brand' : 'bg-muted-foreground/30'
            }`}
            aria-label="Toggle private"
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                isPrivate ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Fixed footer for button */}
      <div className="px-6 py-4 border-t border-border flex-shrink-0">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full h-11 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 border-none shadow-lg shadow-brand/20 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Next — Add Members
        </Button>
      </div>
    </>
  );
};
