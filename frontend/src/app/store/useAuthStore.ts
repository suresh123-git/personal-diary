import { create } from 'zustand';

export type HouseType = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' | 'unassigned';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  house: HouseType;
  profileImage?: string;
  timezone?: string;
  preferences?: Record<string, any>;
  theme?: Record<string, any>;
  notificationSettings?: Record<string, any>;
  aiSettings?: Record<string, any>;
}

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile, accessToken: string, refreshToken: string) => void;
  setHouse: (house: HouseType) => void;
  setUser: (user: UserProfile) => void;
  logout: () => void;
  initTheme: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: localStorage.getItem('hp_access_token'),
  refreshToken: localStorage.getItem('hp_refresh_token'),
  isAuthenticated: !!localStorage.getItem('hp_access_token'),

  setAuth: (user, accessToken, refreshToken) => {
    localStorage.setItem('hp_access_token', accessToken);
    localStorage.setItem('hp_refresh_token', refreshToken);
    set({ user, accessToken, refreshToken, isAuthenticated: true });
    get().initTheme();
  },

  setHouse: (house) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, house };
      set({ user: updatedUser });
      get().initTheme();
    }
  },

  setUser: (user) => {
    set({ user });
    get().initTheme();
  },

  logout: () => {
    localStorage.removeItem('hp_access_token');
    localStorage.removeItem('hp_refresh_token');
    document.documentElement.className = 'dark';
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  initTheme: () => {
    const { user } = get();
    const house = user?.house || 'unassigned';
    document.documentElement.classList.remove(
      'theme-gryffindor',
      'theme-slytherin',
      'theme-ravenclaw',
      'theme-hufflepuff',
    );
    if (house !== 'unassigned') {
      document.documentElement.classList.add(`theme-${house}`);
    }
  },
}));
