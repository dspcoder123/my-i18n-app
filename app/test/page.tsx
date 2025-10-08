'use client';

import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function TestPage() {
  const { t } = useTranslation('common');

  return (
    <div className="test-page">
      <div className="container">
        {/* Header Section */}
        <section className="hero">
          <h1>{t('testPageTitle')}</h1>
          <p className="subtitle">{t('testPageSubtitle')}</p>
          <p>{t('testPageDescription')}</p>
        </section>

        {/* Test Content Section */}
        <section className="test-content">
          <h2>{t('testFeatures')}</h2>
          <div className="test-grid">
            <div className="test-card">
              <span className="test-icon">🧪</span>
              <h3>{t('testing')}</h3>
              <p>{t('testingDesc')}</p>
            </div>
            <div className="test-card">
              <span className="test-icon">🔧</span>
              <h3>{t('development')}</h3>
              <p>{t('developmentDesc')}</p>
            </div>
            <div className="test-card">
              <span className="test-icon">📊</span>
              <h3>{t('analytics')}</h3>
              <p>{t('analyticsDesc')}</p>
            </div>
          </div>
        </section>

        {/* Interactive Test Section */}
        <section className="interactive-test">
          <h2>{t('interactiveTest')}</h2>
          <div className="test-buttons">
            <button className="btn btn-primary" onClick={() => alert(t('testAlert'))}>
              {t('testButton')}
            </button>
            <button className="btn btn-secondary" onClick={() => console.log('Test log:', t('testLog'))}>
              {t('consoleTest')}
            </button>
          </div>
        </section>

        {/* Navigation Back */}
        <section className="navigation">
          <Link href="/" className="btn btn-outline">
            {t('backToHome')}
          </Link>
        </section>
      </div>
    </div>
  );
}
