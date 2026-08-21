import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { AppLayout } from '../../components/layout/AppLayout';
import { WelcomePage } from '../../features/welcome/WelcomePage';
import { LoginPage } from '../../features/auth/LoginPage';
import { RegisterPage } from '../../features/auth/RegisterPage';
import { HouseSelectionPage } from '../../features/onboarding/HouseSelectionPage';
import { DashboardPage } from '../../features/dashboard/DashboardPage';
import { DiaryListPage } from '../../features/diary/DiaryListPage';
import { DiaryEditorPage } from '../../features/diary/DiaryEditorPage';
import { DiaryDetailPage } from '../../features/diary/DiaryDetailPage';
import { PensievePage } from '../../features/pensieve/PensievePage';
import { CalendarPage } from '../../features/calendar/CalendarPage';
import { MemoryVaultPage } from '../../features/memories/MemoryVaultPage';
import { ProfilePage } from '../../features/profile/ProfilePage';
import { ChamberOfSecretsPage } from '../../features/profile/ChamberOfSecretsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Onboarding */}
        <Route
          path="/house-selection"
          element={
            <ProtectedRoute>
              <HouseSelectionPage />
            </ProtectedRoute>
          }
        />

        {/* Main App Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="diary" element={<DiaryListPage />} />
          <Route path="diary/new" element={<DiaryEditorPage />} />
          <Route path="diary/:id" element={<DiaryDetailPage />} />
          <Route path="diary/:id/edit" element={<DiaryEditorPage />} />
          <Route path="pensieve" element={<PensievePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="memories" element={<MemoryVaultPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chamber" element={<ChamberOfSecretsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
