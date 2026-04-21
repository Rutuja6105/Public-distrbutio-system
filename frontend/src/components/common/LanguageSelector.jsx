import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-selector">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
        onClick={() => changeLanguage('hi')}
      >
        हिं
      </button>
      <button
        className={`lang-btn ${language === 'mr' ? 'active' : ''}`}
        onClick={() => changeLanguage('mr')}
      >
        मर
      </button>
    </div>
  );
};

export default LanguageSelector;