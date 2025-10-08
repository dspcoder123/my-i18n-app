'use client';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('common');

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'blog', href: '#blog' },
    { key: 'contactNav', href: '#contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">{t('logo')}</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.key} className="nav-item">
                <a href={item.href} className="nav-link">
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Switcher */}
        <div className="language-section">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
