import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Users,
  Phone,
  Bookmark,
  Bell,
  Settings,
  MessageCircle,
  Sun,
  Moon,
  VenetianMask,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import logoIcon from '@/assets/logo-icon.png';
import { currentUser } from '../data/mockData';
import { CreateGroupModal } from './CreateGroupModal';

interface SidebarProps {
  activeTab: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const navItems = [
    { id: 'chats', icon: MessageCircle, label: 'Chats', desktopOnly: false },
    { id: 'groups', icon: Users, label: 'Groups', desktopOnly: false },
    { id: 'calls', icon: Phone, label: 'Calls', desktopOnly: false },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks', desktopOnly: false },
    { id: 'anonymous', icon: VenetianMask, label: 'Anonymous', desktopOnly: false, isSpecial: true },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      desktopOnly: true,
    },
  ];

  return (
    <>
      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}

    <div className="w-full md:w-20 h-16 md:h-full flex flex-row md:flex-col items-center justify-between px-0 py-4 md:py-6 bg-card text-card-foreground transition-colors duration-500 border-t md:border-t-0 md:border-r border-border">
      {/* Top Part (Desktop): Logo & Plus Action */}
      <div className="hidden md:flex flex-col items-center gap-6 w-full">
        <div className="h-12 w-12 relative flex items-center justify-center">
          <img
            src={logoIcon}
            alt="YoYo Chat Logo"
            className="h-12 w-12 object-contain"
          />
        </div>

        <Button
          size="icon"
          onClick={() => setShowCreateGroup(true)}
          className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 flex items-center justify-center transition-all shadow-lg shadow-brand/20 active:scale-95 border-none"
          aria-label="Create new group"
        >
          <Plus className="size-6" />
        </Button>
      </div>

      {/* Middle Part (Desktop) / Center navigation list (Mobile bottom bar) */}
      <div className="flex-1 md:flex-initial flex flex-row md:flex-col items-center justify-around md:justify-center gap-2 md:gap-4 md:w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          const buttonStyles = item.isSpecial
            ? isActive
              ? 'bg-purple-600/25 text-purple-400 border border-purple-500/40 shadow-lg shadow-purple-500/10'
              : 'text-purple-400 border border-purple-500/20 hover:bg-purple-600/15'
            : isActive
            ? 'bg-brand/10 text-brand dark:bg-brand/20'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/20';

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id === 'chats' ? '/chat' : `/${item.id}`)}
              className={`h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group flex-shrink-0 ${
                item.desktopOnly ? 'hidden md:flex' : 'flex'
              } ${buttonStyles}`}
              aria-label={item.label}
            >
              <Icon className="size-5 md:size-6" />
              {isActive && !item.isSpecial && (
                <div className="absolute bottom-0 md:bottom-auto md:left-0 w-6 md:w-1 h-0.5 md:h-6 bg-brand rounded-t-md md:rounded-r-md md:rounded-t-none" />
              )}
              {item.isSpecial && (
                <span className="absolute -bottom-2 md:-bottom-2 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider scale-85 shadow-sm">
                  New
                </span>
              )}
              {/* Tooltip: Hidden on mobile */}
              <span className="absolute left-14 scale-0 md:group-hover:scale-100 transition-all duration-200 bg-popover text-popover-foreground text-xs px-2 py-1 rounded-md shadow-md pointer-events-none whitespace-nowrap z-50 hidden md:inline-block">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Mobile Only: Profile avatar at the end of the navigation bar */}
        <div 
          onClick={() => navigate('/settings')}
          className="md:hidden relative cursor-pointer flex-shrink-0"
        >
          <img
            src={currentUser.avatar_url}
            alt={currentUser.display_name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
        </div>
      </div>

      {/* Bottom Part (Desktop) / Right side options (Mobile) */}
      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-5">
        {/* Theme Toggle Button: Desktop Only */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex h-10 w-10 md:h-12 md:w-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/20 items-center justify-center transition-all shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="size-5 text-brand" />
          ) : (
            <Sun className="size-5 text-yellow-400" />
          )}
        </button>

        {/* User Profile Avatar - Desktop Only */}
        <div 
          onClick={() => navigate('/settings')}
          className="hidden md:block relative group cursor-pointer"
        >
          <img
            src={currentUser.avatar_url}
            alt={currentUser.display_name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-brand/40 transition-all duration-300"
          />
          <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background" />
        </div>

        {/* Settings button - Desktop Only */}
        <button
          onClick={() => navigate('/settings')}
          className="hidden md:flex h-10 w-10 md:h-12 md:w-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/20 items-center justify-center transition-all group"
          aria-label="Settings"
        >
          <Settings className="size-5 md:size-6 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </div>
    </>
  );
};
