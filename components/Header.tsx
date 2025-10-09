'use client';

import { useEffect, useMemo, useState } from 'react';

type StrapiHeaderItem = {
  id: number;
  documentId: string;
  MultiLang?: string; // Use as site title/logo text when available
  Home?: string;
  About?: string;
  Services?: string;
  Portfolio?: string;
  Blog?: string;
  Contact?: string;
  locale?: string;
};

type StrapiResponse<T> = {
  data: T[];
};

export default function Header() {
  const [locale, setLocale] = useState<'en' | 'hi'>('en');
  const [headerItem, setHeaderItem] = useState<StrapiHeaderItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strapiBaseUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const fetchHeader = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `${strapiBaseUrl}/api/headers?locale=${locale}&pagination[pageSize]=1`;
        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Failed to load header (${res.status})`);
        const json: StrapiResponse<StrapiHeaderItem> = await res.json();
        if (!isCancelled) {
          setHeaderItem(json.data?.[0] || null);
        }
      } catch (e: unknown) {
        if (!isCancelled) setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    fetchHeader();
    return () => {
      isCancelled = true;
    };
  }, [locale, strapiBaseUrl]);

  const siteTitle = headerItem?.MultiLang || 'Site';
  const homeLabel = headerItem?.Home || 'Home';
  const aboutLabel = headerItem?.About || 'About';
  const servicesLabel = headerItem?.Services || 'Services';
  const portfolioLabel = headerItem?.Portfolio || 'Portfolio';
  const blogLabel = headerItem?.Blog || 'Blog';
  const contactLabel = headerItem?.Contact || 'Contact';

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">{siteTitle}</span>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link">
                {isLoading && !headerItem ? '…' : homeLabel}
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">
                {isLoading && !headerItem ? '…' : aboutLabel}
              </a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">
                {isLoading && !headerItem ? '…' : servicesLabel}
              </a>
            </li>
            <li className="nav-item">
              <a href="#portfolio" className="nav-link">
                {isLoading && !headerItem ? '…' : portfolioLabel}
              </a>
            </li>
            <li className="nav-item">
              <a href="#blog" className="nav-link">
                {isLoading && !headerItem ? '…' : blogLabel}
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">
                {isLoading && !headerItem ? '…' : contactLabel}
              </a>
            </li>
          </ul>
        </nav>

        <div className="language-section">
          <select
            aria-label="Select language"
            value={locale}
            onChange={(e) => setLocale(e.target.value as 'en' | 'hi')}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <button className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {error ? <div className="error-text">{error}</div> : null}
    </header>
  );
}
