import type React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider } from "./context/ToastContext"
import { LandingPage } from "./features/landing/pages/LandingPage"
import { ChatPage } from "./features/chat/pages/ChatPage"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { ForgotPasswordPage } from "./features/auth/pages/ForgotPasswordPage"
import { ResetPasswordPage } from "./features/auth/pages/ResetPasswordPage"
import { VerifyUserPage } from "./features/auth/pages/VerifyUserPage"
import { AdminLoginPage } from "./features/admin/pages/AdminLoginPage"
import { AdminLayout } from "./features/admin/components/AdminLayout"
import { DashboardOverviewPage } from "./features/admin/pages/DashboardOverviewPage"
import { UserManagementPage } from "./features/admin/pages/UserManagementPage"
import { GroupManagementPage } from "./features/admin/pages/GroupManagementPage"
import { SystemSettingsPage } from "./features/admin/pages/SystemSettingsPage"
import { AdminProfilePage } from "./features/admin/pages/AdminProfilePage"
import { AdminSecurityBestPracticesPage } from "./features/admin/pages/AdminSecurityBestPracticesPage"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:conversationId" element={<ChatPage />} />
            <Route path="/contacts" element={<Navigate to="/groups" replace />} />
            <Route path="/calls" element={<ChatPage />} />
            <Route path="/bookmarks" element={<ChatPage />} />
            <Route path="/groups" element={<ChatPage />} />
            <Route path="/notifications" element={<ChatPage />} />
            <Route path="/anonymous" element={<ChatPage />} />
            <Route path="/anonymous/:chatId" element={<ChatPage />} />
            <Route path="/settings" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-user" element={<VerifyUserPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverviewPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="groups" element={<GroupManagementPage />} />
              <Route path="settings" element={<SystemSettingsPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="security-best-practices" element={<AdminSecurityBestPracticesPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App

