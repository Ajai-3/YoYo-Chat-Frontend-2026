import bg1 from '@/assets/chat/bg_starry_blue.png';
import bg2 from '@/assets/chat/bg_purple_nebula.png';
import bg3 from '@/assets/chat/bg_emerald_forest.png';
import bg4 from '@/assets/chat/bg_sunset_orange.png';
import bg5 from '@/assets/chat/bg_rose_petals.png';
import bg6 from '@/assets/chat/bg_all_mix.png';
import bg7 from '@/assets/chat/bg_devil_red.png';

export interface ChatTheme {
  id: string;
  name: string;
  bg: string;
  bubbleGradient: string;
  textColor: string;
}

export const CHAT_THEMES: ChatTheme[] = [
  { id: 'theme1', name: 'Starry Blue', bg: bg1, bubbleGradient: 'linear-gradient(135deg, #000b39, #000a53)', textColor: '#ffffff' },
  { id: 'theme2', name: 'Purple Nebula', bg: bg2, bubbleGradient: 'linear-gradient(135deg, #18022f, #6827a5)', textColor: '#ffffff' },
  { id: 'theme3', name: 'Emerald Forest', bg: bg3, bubbleGradient: 'linear-gradient(135deg, #2d4000, #556200)', textColor: '#ffffff' },
  { id: 'theme4', name: 'Sunset Orange', bg: bg4, bubbleGradient: 'linear-gradient(135deg, #503300, #e4a704)', textColor: '#ffffff' },
  { id: 'theme5', name: 'Rose Petals', bg: bg5, bubbleGradient: 'linear-gradient(135deg, #500022, #bf0149)', textColor: '#ffffff' },
  { id: 'theme6', name: 'Mix All', bg: bg6, bubbleGradient: 'linear-gradient(135deg, #4b0482, #b77301, #a60c77, #435304, #002462, #760400)', textColor: '#ffffff' },
  { id: 'theme7', name: 'Devil Red', bg: bg7, bubbleGradient: 'linear-gradient(135deg, #810000, #360000)', textColor: '#ffffff' },
];

export const getSelectedTheme = (conversationId: string): ChatTheme => {
  if (!conversationId) return CHAT_THEMES[0];
  const saved = localStorage.getItem(`chat-theme-${conversationId}`);
  if (saved) {
    const found = CHAT_THEMES.find(t => t.id === saved);
    if (found) return found;
  }
  return CHAT_THEMES[0];
};

export const setSelectedTheme = (conversationId: string, themeId: string) => {
  if (!conversationId) return;
  localStorage.setItem(`chat-theme-${conversationId}`, themeId);
};
