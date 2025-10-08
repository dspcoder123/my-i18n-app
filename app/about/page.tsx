'use client';

import { useTranslation } from "react-i18next";
import Link from "next/link";
import "../custom.css";

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <h1>{t('aboutTitle')}</h1>
          <p className="subtitle">{t('aboutSubtitle')}</p>
          <p>{t('aboutDescription')}</p>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <h2>{t('ourMission')}</h2>
          <p>{t('missionDescription')}</p>
        </section>

        {/* Team Section */}
        <section className="team">
          <h2>{t('ourTeam')}</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>{t('ceoName')}</h3>
              <p className="member-role">{t('ceoRole')}</p>
              <p>{t('ceoDescription')}</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>{t('ctoName')}</h3>
              <p className="member-role">{t('ctoRole')}</p>
              <p>{t('ctoDescription')}</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3>{t('designerName')}</h3>
              <p className="member-role">{t('designerRole')}</p>
              <p>{t('designerDescription')}</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values">
          <h2>{t('ourValues')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🎯</span>
              <h3>{t('innovation')}</h3>
              <p>{t('innovationDesc')}</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>{t('collaboration')}</h3>
              <p>{t('collaborationDesc')}</p>
            </div>
            <div className="value-card">
              <span className="value-icon">⭐</span>
              <h3>{t('excellence')}</h3>
              <p>{t('excellenceDesc')}</p>
            </div>
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
