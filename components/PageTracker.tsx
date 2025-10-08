'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();
  const lastTrackedRef = useRef<string>('');

  const trackPageView = (path: string, language: string) => {
    const trackKey = `${path}:${language}`;
    
    if (lastTrackedRef.current === trackKey) {
      return;
    }
    
    lastTrackedRef.current = trackKey;
    
    const pathWithLanguage = path.includes('?') 
      ? `${path}&lang=${language}`
      : `${path}?lang=${language}`;
    
    const trackingData = {
      path: pathWithLanguage,
      language: language,
      timestamp: new Date().toISOString()
    };
    
    fetch(`https://backend-gydk.onrender.com/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackingData),
      credentials: 'omit'
    }).catch(() => {});
  };

  useEffect(() => {
    const path = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    const language = i18n.language || 'en';
    
    const timeoutId = setTimeout(() => {
      trackPageView(path, language);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams, i18n.language]);

  return null;
}