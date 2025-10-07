'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    i18n.changeLanguage(locale);
    // Force a page refresh to update the URL and reload translations
    router.refresh();
  };

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="language-select"
        style={{
          padding: '10px 15px',
          borderRadius: '8px',
          border: '2px solid #667eea',
          backgroundColor: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          fontWeight: '500',
          color: '#333',
          minWidth: '150px',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
