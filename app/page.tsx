'use client';

import { useTranslation } from "react-i18next";
import "./custom.css";

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>{t('welcome')}</h1>
          <p className="subtitle">{t('subtitle')}</p>
          <p>{t('description')}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>{t('features')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3>{t('multilingual')}</h3>
              <p>{t('multilingualDesc')}</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3>{t('responsive')}</h3>
              <p>{t('responsiveDesc')}</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">✨</span>
              <h3>{t('modern')}</h3>
              <p>{t('modernDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaDescription')}</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">{t('getStarted')}</a>
            <a href="#" className="btn btn-secondary">{t('learnMore')}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>{t('footerText')}</p>
        </div>
      </footer>
    </div>
  );
}
