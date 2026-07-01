import React from 'react';
import { Search, Plus, Check, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type User } from '../data/mockData';

interface GroupMembersFormProps {
  selectedMembers: User[];
  toggleMember: (user: User) => void;
  memberSearch: string;
  setMemberSearch: (val: string) => void;
  filteredUsers: User[];
  isSelected: (user: User) => boolean;
  onCreate: () => void;
}

export const GroupMembersForm: React.FC<GroupMembersFormProps> = ({
  selectedMembers,
  toggleMember,
  memberSearch,
  setMemberSearch,
  filteredUsers,
  isSelected,
  onCreate,
}) => {
  return (
    <>
      {/* Selected members pills */}
      {selectedMembers.length > 0 && (
        <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 border-b border-border flex-shrink-0">
          {selectedMembers.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-1.5 bg-brand/10 text-brand rounded-full px-2.5 py-1"
            >
              <img
                src={m.avatar_url}
                alt={m.display_name}
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="text-xs font-medium">{m.display_name.split(' ')[0]}</span>
              <button
                onClick={() => toggleMember(m)}
                className="text-brand/60 hover:text-brand transition-colors"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-border flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
            placeholder="Search people..."
            className="h-10 pl-9 rounded-xl border-border bg-background focus:border-brand/40 text-sm"
            autoFocus
          />
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {filteredUsers.length === 0 ? (
          <p className="text-center py-8 text-xs text-muted-foreground">No users found.</p>
        ) : (
          filteredUsers.map((user) => {
            const selected = isSelected(user);
            return (
              <button
                key={user.id}
                onClick={() => toggleMember(user)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/10 transition-all group"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatar_url}
                    alt={user.display_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {/* Online status dot */}
                  {['user-emma', 'user-olivia', 'user-noah'].includes(user.id) && (
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.display_name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">@{user.username}</p>
                </div>
                {/* Check indicator */}
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    selected
                      ? 'bg-brand text-brand-foreground'
                      : 'border-2 border-border group-hover:border-brand/40'
                  }`}
                >
                  {selected && <Check className="size-3.5" />}
                  {!selected && (
                    <Plus className="size-3 text-muted-foreground/40 group-hover:text-brand/50" />
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Create button */}
      <div className="px-6 py-4 border-t border-border flex-shrink-0">
        <Button
          onClick={onCreate}
          className="w-full h-11 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 border-none shadow-lg shadow-brand/20 active:scale-95 transition-all gap-2"
        >
          <Users className="size-4" />
          Create Group
          {selectedMembers.length > 0 && (
            <span className="ml-1 h-5 min-w-5 px-1.5 rounded-full bg-brand-foreground/20 text-[10px] font-bold flex items-center justify-center">
              {selectedMembers.length}
            </span>
          )}
        </Button>
      </div>
    </>
  );
};
