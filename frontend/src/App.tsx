import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './app/router';
import { useAuthStore } from './app/store/useAuthStore';
import { apiRequest } from './services/api.client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  const { user, initTheme, setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initTheme();

    if (isAuthenticated) {
      apiRequest('/auth/me')
        .then((u) => {
          if (u) setUser(u);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    document.title = user?.name ? `${user.name}'s Personal Diary` : 'Harry Potter Personal Diary';
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
