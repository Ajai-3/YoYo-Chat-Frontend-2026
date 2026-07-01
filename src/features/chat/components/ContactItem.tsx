import React from 'react';
import { type User } from '../data/mockData';

interface ContactItemProps {
  user: User;
}

export const ContactItem: React.FC<ContactItemProps> = ({ user }) => {
  return (
    <div className="p-3 rounded-2xl flex gap-3 text-left border border-transparent hover:bg-accent/10 transition-all duration-300">
      <img
        src={user.avatar_url}
        alt={user.display_name}
        className="h-11 w-11 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-foreground truncate">
          {user.display_name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          @{user.username}
        </p>
      </div>
    </div>
  );
};
