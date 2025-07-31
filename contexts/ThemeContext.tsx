import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  gradient: string[];
  shadow: string;
}

export interface Theme {
  colors: Colors;
  isDark: boolean;
}

const lightColors: Colors = {
  primary: '#4F46E5',
  secondary: '#7C3AED',
  accent: '#06B6D4',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  card: '#FFFFFF',
  gradient: ['#4F46E5', '#7C3AED'],
  shadow: '#000000',
};

const darkColors: Colors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#06B6D4',
  background: '#0F0F23',
  surface: '#1A1A2E',
  surfaceSecondary: '#16213E',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  border: '#374151',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  card: '#1A1A2E',
  gradient: ['#6366F1', '#8B5CF6'],
  shadow: '#000000',
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsDark(colorScheme === 'dark');

    const subscription = Appearance.addChangeListener((preferences: any) => {
      setIsDark(preferences.colorScheme === 'dark');
    });

    return () => subscription?.remove();
  }, []);

  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
