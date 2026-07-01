import React from 'react';
import { PhoneCall, PhoneMissed, Bookmark, Radio, Bell } from 'lucide-react';

export const CallItem: React.FC<{ type: 'incoming' | 'missed'; name: string; time: string }> = ({
  type,
  name,
  time,
}) => {
  const isIncoming = type === 'incoming';
  return (
    <div className="p-3 rounded-2xl border border-transparent hover:bg-accent/10 flex items-center gap-3 transition-all duration-300">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${isIncoming ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {isIncoming ? <PhoneCall className="size-4" /> : <PhoneMissed className="size-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground truncate">{name}</h4>
        <p className="text-[10px] text-muted-foreground">
          {isIncoming ? 'Incoming' : 'Missed'} • {time}
        </p>
      </div>
    </div>
  );
};

export const BookmarkItem: React.FC<{ filename: string; source: string }> = ({
  filename,
  source,
}) => {
  return (
    <div className="p-3.5 rounded-2xl border border-border/50 bg-background flex gap-3 text-left">
      <Bookmark className="size-5 text-brand flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="text-xs font-semibold text-foreground">{filename}</h4>
        <p className="text-[10px] text-muted-foreground mt-1">Saved from {source}</p>
      </div>
    </div>
  );
};

export const ChannelItem: React.FC<{ channel: string }> = ({ channel }) => {
  return (
    <div className="p-3 rounded-2xl border border-transparent hover:bg-accent/10 flex items-center gap-3 cursor-pointer transition-all duration-300">
      <div className="h-10 w-10 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
        <Radio className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground truncate">#{channel}</h4>
        <p className="text-[10px] text-muted-foreground">Public Channel</p>
      </div>
    </div>
  );
};

export const NotificationItem: React.FC<{ title: string; desc: string }> = ({
  title,
  desc,
}) => {
  return (
    <div className="p-3 rounded-2xl border border-transparent hover:bg-accent/10 flex items-center gap-3 transition-all duration-300">
      <div className="h-10 w-10 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
        <Bell className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-foreground">{title}</h4>
        <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
};
