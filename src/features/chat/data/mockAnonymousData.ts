import { type ConversationView, type Message } from './mockData';

export interface AnonymousConversationView extends ConversationView {
  maskColor: string;
}

export const mockAnonymousConversations: AnonymousConversationView[] = [
  {
    _id: 'anon-4821',
    type: 'direct',
    name: 'Anonymous #4821',
    avatar_url: 'mask',
    maskColor: '#3b82f6', // blue
    participants: [],
    lastMessageAt: '2026-07-01T02:34:00Z',
    lastMessagePreview: "Hey! How's your day going?",
    unreadCount: 0,
  },
  {
    _id: 'anon-7392',
    type: 'direct',
    name: 'Anonymous #7392',
    avatar_url: 'mask',
    maskColor: '#a855f7', // purple
    participants: [],
    lastMessageAt: '2026-07-01T02:21:00Z',
    lastMessagePreview: "That's interesting!",
    unreadCount: 0,
  },
  {
    _id: 'anon-9103',
    type: 'direct',
    name: 'Anonymous #9103',
    avatar_url: 'mask',
    maskColor: '#f97316', // orange
    participants: [],
    lastMessageAt: '2026-07-01T01:47:00Z',
    lastMessagePreview: 'Nice to meet you 😊',
    unreadCount: 0,
  },
  {
    _id: 'anon-2718',
    type: 'direct',
    name: 'Anonymous #2718',
    avatar_url: 'mask',
    maskColor: '#ec4899', // pink
    participants: [],
    lastMessageAt: '2026-07-01T01:15:00Z',
    lastMessagePreview: 'Where are you from?',
    unreadCount: 0,
  },
  {
    _id: 'anon-5310',
    type: 'direct',
    name: 'Anonymous #5310',
    avatar_url: 'mask',
    maskColor: '#84cc16', // lime
    participants: [],
    lastMessageAt: '2026-07-01T00:58:00Z',
    lastMessagePreview: 'What do you do for fun?',
    unreadCount: 0,
  },
  {
    _id: 'anon-8641',
    type: 'direct',
    name: 'Anonymous #8641',
    avatar_url: 'mask',
    maskColor: '#06b6d4', // cyan
    participants: [],
    lastMessageAt: '2026-07-01T00:32:00Z',
    lastMessagePreview: 'Oh cool!',
    unreadCount: 0,
  },
  {
    _id: 'anon-1209',
    type: 'direct',
    name: 'Anonymous #1209',
    avatar_url: 'mask',
    maskColor: '#f43f5e', // rose
    participants: [],
    lastMessageAt: '2026-07-01T00:10:00Z',
    lastMessagePreview: 'Good night!',
    unreadCount: 0,
  },
];

export const mockAnonymousMessages: Message[] = [
  // anon-4821 chat history
  {
    _id: 'anon-m1',
    conversationId: 'anon-4821',
    senderId: 'stranger',
    type: 'text',
    content: "Hey! How's your day going?",
    status: 'read',
    createdAt: '2026-07-01T02:34:00Z',
  },
  {
    _id: 'anon-m2',
    conversationId: 'anon-4821',
    senderId: 'user-alex',
    type: 'text',
    content: 'Pretty good! Just working on some designs.',
    status: 'read',
    createdAt: '2026-07-01T02:35:00Z',
  },
  {
    _id: 'anon-m3',
    conversationId: 'anon-4821',
    senderId: 'user-alex',
    type: 'text',
    content: 'What about you?',
    status: 'read',
    createdAt: '2026-07-01T02:35:10Z',
  },
  {
    _id: 'anon-m4',
    conversationId: 'anon-4821',
    senderId: 'stranger',
    type: 'text',
    content: 'Same here! I love designing too 🎨',
    status: 'read',
    createdAt: '2026-07-01T02:36:00Z',
  },
  {
    _id: 'anon-m5',
    conversationId: 'anon-4821',
    senderId: 'stranger',
    type: 'text',
    content: 'UI/UX mostly. What about you?',
    status: 'read',
    createdAt: '2026-07-01T02:37:00Z',
  },
  {
    _id: 'anon-m6',
    conversationId: 'anon-4821',
    senderId: 'user-alex',
    type: 'text',
    content: "That's awesome! What kind of designs?",
    status: 'read',
    createdAt: '2026-07-01T02:36:30Z',
  },
  {
    _id: 'anon-m7',
    conversationId: 'anon-4821',
    senderId: 'user-alex',
    type: 'text',
    content: "Nice! I'm into product design.",
    status: 'read',
    createdAt: '2026-07-01T02:37:20Z',
  },
  {
    _id: 'anon-m8',
    conversationId: 'anon-4821',
    senderId: 'stranger',
    type: 'text',
    content: 'Cool! Do you use Figma?',
    status: 'read',
    createdAt: '2026-07-01T02:38:00Z',
  },
  {
    _id: 'anon-m9',
    conversationId: 'anon-4821',
    senderId: 'user-alex',
    type: 'text',
    content: 'Yup! Figma is the best 🔥',
    status: 'read',
    createdAt: '2026-07-01T02:38:40Z',
  },
  {
    _id: 'anon-m10',
    conversationId: 'anon-4821',
    senderId: 'stranger',
    type: 'text',
    content: 'Totally agree! Anyway, it was nice talking to you 😊',
    status: 'read',
    createdAt: '2026-07-01T02:39:00Z',
  },
];
