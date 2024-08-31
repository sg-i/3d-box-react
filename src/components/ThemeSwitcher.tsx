import React from 'react';
import { Switch } from 'antd';
import { useTheme } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <Switch
      onChange={toggleTheme}
      checkedChildren="Light mode"
      unCheckedChildren="Dark mode"
      defaultChecked
    />
  );
};
