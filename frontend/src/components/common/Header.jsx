import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import LanguageSelector from './LanguageSelector';

export const Header = ({ onProfileClick }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <h2>{t('appName')}</h2>
        </div>
        <div className="header-actions">
          <LanguageSelector />
          
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <div className="user-info" onClick={onProfileClick}>
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&color=fff`} 
              alt="Profile" 
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{t(`${user?.role}Role`) || user?.role}</span>
            </div>
          </div>
          
          <Button onClick={logout} variant="secondary">
            {t('logout')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
