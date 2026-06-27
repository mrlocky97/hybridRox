import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export const I18nProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure i18n is fully initialized before rendering children
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on('initialized', () => {
        setIsInitialized(true);
      });
    }
    
    // Update document lang attribute for accessibility and CSS targeting
    const handleLanguageChange = (lng) => {
      document.documentElement.lang = lng;
      document.documentElement.setAttribute('data-lang', lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    handleLanguageChange(i18n.language || 'en');
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  if (!isInitialized) {
    return null; // Or a minimal loading state
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};