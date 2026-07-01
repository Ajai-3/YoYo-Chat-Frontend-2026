import React, { useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { VenetianMask } from "lucide-react"
import { Sidebar } from "../components/Sidebar"
import { ConversationList } from "../components/ConversationList"
import { ChatWindow } from "../components/ChatWindow"
import { SettingsPanel } from "@/features/user/components/SettingsPanel"
import { ChatInfoPanel } from "../components/ChatInfoPanel"
import { CreateGroupModal } from "../components/CreateGroupModal"
import { AnonymousList } from "../components/AnonymousList"
import { AnonymousWindow } from "../components/AnonymousWindow"
import { getSelectedTheme, setSelectedTheme } from "../data/themeConfig"
import { 
  mockConversationView, 
  mockMessages, 
  type ConversationView, 
  type Message, 
  type Attachment,
  currentUser 
} from "../data/mockData"
import { 
  mockAnonymousConversations, 
  mockAnonymousMessages,
  type AnonymousConversationView
} from "../data/mockAnonymousData"
import logo from "@/assets/logo.png"

export const ChatPage: React.FC = () => {
  const { conversationId, chatId } = useParams<{ conversationId?: string; chatId?: string }>()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  
  const [showChatInfo, setShowChatInfo] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  
  // Standard Local states
  const [conversations, setConversations] = useState<ConversationView[]>(mockConversationView)
  const [allMessages, setAllMessages] = useState<Message[]>(mockMessages)

  // Anonymous Local states
  const [anonConversations, setAnonConversations] = useState<AnonymousConversationView[]>(mockAnonymousConversations)
  const [anonMessages, setAnonMessages] = useState<Message[]>(mockAnonymousMessages)

  // Derive settings and activeTab from route
  const showSettings = pathname === "/settings"
  
  let activeTab = "chats"
  const isAnonymousRoute = pathname.startsWith("/anonymous")

  if (isAnonymousRoute) activeTab = "anonymous"
  else if (pathname.startsWith("/contacts")) activeTab = "contacts"
  else if (pathname.startsWith("/calls")) activeTab = "calls"
  else if (pathname.startsWith("/bookmarks")) activeTab = "bookmarks"
  else if (pathname.startsWith("/groups")) activeTab = "groups"
  else if (pathname.startsWith("/notifications")) activeTab = "notifications"

  const activeConversationId = isAnonymousRoute ? null : (conversationId || null)
  const activeAnonChatId = isAnonymousRoute ? (chatId || null) : null

  const [selectedThemeId, setSelectedThemeId] = useState('');
  const chatTheme = selectedThemeId ? getSelectedTheme(activeConversationId || '') : getSelectedTheme(activeConversationId || '');

  // Find active conversation view
  const activeConversation = conversations.find(c => c._id === activeConversationId)
  const activeAnonChat = anonConversations.find(c => c._id === activeAnonChatId)

  // Filter messages for active conversation
  const activeMessages = allMessages.filter(
    (msg) => msg.conversationId === activeConversationId
  )
  const activeAnonMessages = anonMessages.filter(
    (msg) => msg.conversationId === activeAnonChatId
  )

  const handleDeleteMessage = (msgId: string) => {
    setAllMessages((prev) => prev.filter((m) => m._id !== msgId));
  };

  const handleSendMessage = (
    content: string, 
    type: "text" | "file", 
    attachments?: Attachment[],
    replyToContent?: string
  ) => {
    if (!activeConversationId) return

    const newMessage: Message = {
      _id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      type,
      content,
      attachments,
      replyToContent,
      status: "sent",
      createdAt: new Date().toISOString()
    }

    // Append to messages list
    setAllMessages((prev) => [...prev, newMessage])

    // Update conversation view lastMessage preview & lastMessageAt timestamp
    setConversations((prevConvs) =>
      prevConvs.map((c) => {
        if (c._id === activeConversationId) {
          return {
            ...c,
            lastMessagePreview: type === "file" ? content : content,
            lastMessageAt: newMessage.createdAt,
            unreadCount: 0 // Reset unread
          }
        }
        return c
      })
    )
  }

  const handleSendAnonymousMessage = (
    content: string,
    type: "text" | "file",
    attachments?: Attachment[]
  ) => {
    if (!activeAnonChatId) return

    const newMessage: Message = {
      _id: `msg-${Date.now()}`,
      conversationId: activeAnonChatId,
      senderId: currentUser.id,
      type,
      content,
      attachments,
      status: "sent",
      createdAt: new Date().toISOString()
    }

    setAnonMessages((prev) => [...prev, newMessage])

    // Update anonymous conversation view
    setAnonConversations((prevConvs) =>
      prevConvs.map((c) => {
        if (c._id === activeAnonChatId) {
          return {
            ...c,
            lastMessagePreview: type === "file" ? content : content,
            lastMessageAt: newMessage.createdAt,
          }
        }
        return c
      })
    )

    // Simulate reply from stranger
    setTimeout(() => {
      const replyMessage: Message = {
        _id: `msg-reply-${Date.now()}`,
        conversationId: activeAnonChatId,
        senderId: 'stranger',
        type: 'text',
        content: 'This is an anonymous mock reply! Stay safe 🎭',
        status: 'read',
        createdAt: new Date().toISOString(),
      };
      setAnonMessages((prev) => [...prev, replyMessage]);
      setAnonConversations((prevConvs) =>
        prevConvs.map((c) => {
          if (c._id === activeAnonChatId) {
            return {
              ...c,
              lastMessagePreview: 'This is an anonymous mock reply! Stay safe 🎭',
              lastMessageAt: replyMessage.createdAt,
            }
          }
          return c
        })
      )
    }, 2000);
  }

  const handleSelectConversation = (id: string) => {
    navigate(`/chat/${id}`)
    setConversations((prevConvs) =>
      prevConvs.map((c) => (c._id === id ? { ...c, unreadCount: 0 } : c))
    )
  }

  const handleStartAnonymousChat = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const colorList = ['#3b82f6', '#a855f7', '#f97316', '#ec4899', '#84cc16', '#06b6d4', '#f43f5e'];
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

    const newChat: AnonymousConversationView = {
      _id: `anon-${randomNum}`,
      type: 'direct',
      name: `Anonymous #${randomNum}`,
      avatar_url: 'mask',
      maskColor: randomColor,
      participants: [],
      lastMessageAt: new Date().toISOString(),
      lastMessagePreview: 'Say hi! Connected with a stranger.',
      unreadCount: 0,
    };

    setAnonConversations((prev) => [newChat, ...prev]);
    navigate(`/anonymous/${newChat._id}`);
  }

  const handleEndAnonymousChat = (id: string) => {
    setAnonConversations((prev) => prev.filter((c) => c._id !== id));
    navigate('/anonymous');
  }

  const handleCloseSettings = () => {
    navigate("/chat")
  }

  const handleToggleChatInfo = () => {
    setShowChatInfo((prev) => !prev)
  }

  const handleCloseChatInfo = () => {
    setShowChatInfo(false)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-background text-foreground transition-colors duration-500 p-0 md:p-2 gap-0 md:gap-4 overflow-hidden">

      {/* Create Group Modal */}
      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}
      
      {/* 1. Sidebar Panel Wrapper */}
      <div className={`${(activeConversationId || activeAnonChatId) && (activeTab === "chats" || activeTab === "anonymous") ? "hidden md:flex" : "flex"} order-2 md:order-1 flex-shrink-0 rounded-none md:rounded-3xl border-0 md:border border-border bg-card shadow-lg overflow-hidden flex flex-col md:h-full`}>
        <Sidebar activeTab={activeTab} />
      </div>

      {/* Main body: split into middle panel + chat area */}
      <div className="order-1 md:order-2 flex-1 flex h-full gap-0 md:gap-4 overflow-hidden">
        
        {/* 2. Middle Panel: ConversationList OR SettingsPanel OR AnonymousList */}
        <div className={`${(activeConversationId || activeAnonChatId) && (activeTab === "chats" || activeTab === "anonymous") && !showSettings ? "hidden md:flex" : showSettings ? "flex" : "flex"} flex-col w-full md:w-80 flex-shrink-0 h-full rounded-none md:rounded-3xl border-0 md:border border-border bg-card shadow-lg overflow-hidden`}>
          {showSettings ? (
            <SettingsPanel onClose={handleCloseSettings} />
          ) : activeTab === "anonymous" ? (
            <AnonymousList
              conversations={anonConversations}
              activeChatId={activeAnonChatId}
              onSelectChat={(id) => navigate(`/anonymous/${id}`)}
              onStartNewChat={handleStartAnonymousChat}
              onEndChat={handleEndAnonymousChat}
            />
          ) : (
            <ConversationList
              activeTab={activeTab}
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              onCreateGroup={() => setShowCreateGroup(true)}
              onStartAnonymous={() => {
                navigate('/anonymous');
                handleStartAnonymousChat();
              }}
            />
          )}
        </div>

        {/* 3. Right Area: Chat Window / AnonymousWindow + optional ChatInfoPanel */}
        <div className={`${(activeConversationId || activeAnonChatId) && (activeTab === "chats" || activeTab === "anonymous") ? "flex" : "hidden md:flex"} relative flex-1 h-full gap-0 md:gap-4 overflow-hidden`}>

          {/* 3a. Chat Window */}
          <div className="flex-1 h-full rounded-none md:rounded-3xl border-0 md:border border-border bg-card shadow-lg overflow-hidden">
            {activeTab === "anonymous" ? (
              activeAnonChat ? (
                <AnonymousWindow
                  chatName={activeAnonChat.name || ""}
                  maskColor={activeAnonChat.maskColor}
                  messages={activeAnonMessages}
                  onSendMessage={handleSendAnonymousMessage}
                  onBack={() => navigate("/anonymous")}
                  onReport={() => alert('User reported successfully!')}
                />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground p-8 bg-card h-full text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent pointer-events-none z-0" />
                  
                  {/* Website Logo */}
                  <div className="z-10 mb-6 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="YoYo Chat Logo"
                      className="h-20 w-20 object-contain drop-shadow-md"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-foreground z-10 mb-2 tracking-tight flex items-center gap-2">
                    <VenetianMask className="size-6 text-purple-400" />
                    <span>Anonymous Chat Room</span>
                  </h3>
                  
                  <div className="max-w-md z-10 space-y-4 my-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <strong>What is it?</strong> A secure workspace allowing you to connect randomly with users worldwide without exposing username or personal profile data.
                    </p>
                    <p>
                      <strong>Why?</strong> To encourage genuine conversation, networking, and creative sharing anonymously and hassle-free.
                    </p>
                  </div>

                  <button
                    onClick={handleStartAnonymousChat}
                    className="z-10 mt-4 px-6 h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl active:scale-95 transition-all shadow-lg border-none"
                  >
                    Start Anonymous Chat
                  </button>
                </div>
              )
            ) : activeConversation && (activeTab === "chats" || activeTab === "groups") ? (
              <ChatWindow
                messages={activeMessages}
                activeConversationName={activeConversation.name || ""}
                activeConversationAvatar={activeConversation.avatar_url || ""}
                onSendMessage={handleSendMessage}
                onBack={() => navigate(activeTab === "groups" ? "/groups" : "/chat")}
                onToggleInfo={handleToggleChatInfo}
                activeTheme={activeConversation.type === 'direct' ? chatTheme : undefined}
                onDeleteMessage={handleDeleteMessage}
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground p-8 bg-card h-full text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-brand/5 to-transparent pointer-events-none z-0" />

                {/* Logo */}
                <div className="z-10 mb-6 flex items-center justify-center">
                  <img
                    src={logo}
                    alt="YoYo Chat Logo"
                    className="h-24 w-24 object-contain drop-shadow-lg"
                  />
                </div>

                {/* Heading */}
                <h3 className="text-3xl font-bold text-foreground z-10 mb-2 tracking-tight">
                  Welcome to YoYo Chat
                </h3>

                {/* Subtext */}
                <p className="text-sm max-w-xs z-10 text-muted-foreground leading-relaxed">
                  Select a conversation or start a new one to begin messaging.
                </p>
              </div>
            )}
          </div>

          {/* 3b. Chat Info Panel */}
          {showChatInfo && activeConversation && activeTab !== "anonymous" && (
            <div className="absolute inset-0 z-30 md:relative md:inset-auto md:z-auto md:w-80 md:flex-shrink-0 h-full rounded-none md:rounded-3xl border-0 md:border border-border bg-card shadow-lg overflow-hidden flex flex-col">
              <ChatInfoPanel
                conversation={activeConversation}
                onClose={handleCloseChatInfo}
                activeThemeId={chatTheme.id}
                onThemeChange={(themeId) => {
                  setSelectedTheme(activeConversationId || '', themeId);
                  setSelectedThemeId(themeId);
                }}
              />
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
