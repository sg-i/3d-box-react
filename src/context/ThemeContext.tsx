import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';

// Определяем типы для токенов темы
interface ThemeTokens {
  colorFillContent: string;
  colorPrimary: string;
  colorBgContainer: string;
  colorText: string;
  colorTextPlaceholder?: string;
  colorBorderSecondary?: string;
}

// Определяем тип для контекста
interface ThemeContextType {
  tokens: ThemeTokens;
  toggleTheme: () => void;
}

// Создаем контекст
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Хук для использования контекста
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Компонент провайдера, который управляет темой
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Определяем токены для светлой и темной темы
  const lightThemeTokens: ThemeTokens = {
    colorFillContent: '#19fc73',
    colorPrimary: '#1890ff',
    colorBgContainer: '#ffffff',
    colorText: '#000000',
  };

  const darkThemeTokens: ThemeTokens = {
    colorFillContent: '#15778c',
    colorPrimary: '#4d4c4e',
    colorTextPlaceholder: '#817e7c',
    colorBgContainer: '#222227',
    colorText: 'rgba(255, 255, 245, .66)',
    colorBorderSecondary: '#4e4e4e',
  };

  const tokens = theme === 'light' ? lightThemeTokens : darkThemeTokens;

  // Смена класса body для управления фоном
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme-bg' : 'dark-theme-bg';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ tokens, toggleTheme }}>
      <ConfigProvider
        theme={{
          token: tokens,
          components: {
            Switch: {
              colorTextLightSolid: theme === 'light' ? 'white' : '#b4b4b4',
            },
          },
        }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
