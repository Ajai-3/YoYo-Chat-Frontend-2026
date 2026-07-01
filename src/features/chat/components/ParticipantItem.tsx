import React from 'react';
import { MoreVertical } from 'lucide-react';
import { type User } from '../data/mockData';

interface ParticipantItemProps {
  user: User & { isSelf?: boolean };
  online: boolean;
  isOwner: boolean;
  label: string | null;
  onZoomImage: (url: string) => void;
}

export const ParticipantItem: React.FC<ParticipantItemProps> = ({
  user,
  online,
  isOwner,
  label,
  onZoomImage,
}) => {
  return (
    <div className="flex items-center justify-between group py-1">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative flex-shrink-0">
          <button
            onClick={() => onZoomImage(user.avatar_url)}
            className="rounded-full ring-2 ring-transparent hover:ring-brand/40 transition-all duration-200 active:scale-95 block"
            aria-label={`View ${user.display_name}'s photo`}
          >
            <img
              src={user.avatar_url}
              alt={user.display_name}
              className="h-10 w-10 rounded-full object-cover"
            />
          </button>
          {online && (
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card pointer-events-none" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-foreground truncate">
            {user.isSelf ? 'You' : user.display_name}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {online ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        {label && (
          <span className={`text-xs font-semibold ${isOwner ? 'text-yellow-500' : 'text-brand'}`}>
            {label}
          </span>
        )}
        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
          <MoreVertical className="size-4" />
        </button>
      </div>
    </div>
  );
};
