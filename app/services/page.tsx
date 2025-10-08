'use client';

import { useTranslation } from "react-i18next";
import Link from "next/link";
import "../custom.css";

export default function ServicesPage() {
  const { t } = useTranslation('common');

  return (
    <div className="services-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <h1>{t('servicesTitle')}</h1>
          <p className="subtitle">{t('servicesSubtitle')}</p>
          <p>{t('servicesDescription')}</p>
        </section>

        {/* Services Grid */}
        <section className="services-grid">
          <div className="service-card">
            <span className="service-icon">🌐</span>
            <h3>{t('webDevelopment')}</h3>
            <p>{t('webDevelopmentDesc')}</p>
            <ul className="service-features">
              <li>{t('responsiveDesign')}</li>
              <li>{t('seoOptimization')}</li>
              <li>{t('fastLoading')}</li>
              <li>{t('mobileFirst')}</li>
            </ul>
            <div className="service-price">{t('webDevPrice')}</div>
          </div>

          <div className="service-card">
            <span className="service-icon">📱</span>
            <h3>{t('mobileApps')}</h3>
            <p>{t('mobileAppsDesc')}</p>
            <ul className="service-features">
              <li>{t('iosAndroid')}</li>
              <li>{t('nativePerformance')}</li>
              <li>{t('crossPlatform')}</li>
              <li>{t('appStoreOptimization')}</li>
            </ul>
            <div className="service-price">{t('mobileAppsPrice')}</div>
          </div>

          <div className="service-card">
            <span className="service-icon">🎨</span>
            <h3>{t('uiUxDesign')}</h3>
            <p>{t('uiUxDesignDesc')}</p>
            <ul className="service-features">
              <li>{t('userResearch')}</li>
              <li>{t('wireframing')}</li>
              <li>{t('prototyping')}</li>
              <li>{t('usabilityTesting')}</li>
            </ul>
            <div className="service-price">{t('uiUxPrice')}</div>
          </div>

          <div className="service-card">
            <span className="service-icon">🔧</span>
            <h3>{t('maintenance')}</h3>
            <p>{t('maintenanceDesc')}</p>
            <ul className="service-features">
              <li>{t('regularUpdates')}</li>
              <li>{t('securityPatches')}</li>
              <li>{t('performanceMonitoring')}</li>
              <li>{t('technicalSupport')}</li>
            </ul>
            <div className="service-price">{t('maintenancePrice')}</div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process">
          <h2>{t('ourProcess')}</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>{t('discovery')}</h3>
              <p>{t('discoveryDesc')}</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>{t('planning')}</h3>
              <p>{t('planningDesc')}</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>{t('development')}</h3>
              <p>{t('developmentDesc')}</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>{t('launch')}</h3>
              <p>{t('launchDesc')}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>{t('readyToStart')}</h2>
          <p>{t('ctaDescription')}</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">{t('getQuote')}</a>
            <a href="/about" className="btn btn-secondary">{t('learnMore')}</a>
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
