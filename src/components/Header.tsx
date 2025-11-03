// components/Header.tsx
'use client';

import Link from 'next/link';
import { I18nextProvider, useTranslation } from "react-i18next";
import LanguageSwitcher from '@/src/components/languageSwitcher'
import { useTransition } from 'react';

export default function Header() {
    const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-container">
        
        {/* Logo */}
        <div className="logo-section">
          <Link href="/" className="logo">Cliltutors</Link>
        </div>

        {/* Navegación */}
        <nav className="nav-main">
          <Link href="/" className="nav-link active">
            {t('header.home')}
          </Link>
          <Link href="/courses" className="nav-link">
            {t('header.courses')}
          </Link>
          <Link href="/teachers" className="nav-link">
            {t('header.teachers')}
          </Link>
          <Link href="/about" className="nav-link">
            {t('header.about')}
          </Link>
        </nav>

        {/* Botones de acción */}
        <div className="header-actions">
          <Link href="/contact" className="auth-btn primary">
            {t('header.contact')}
          </Link>
        </div>

      </div>
    </header>
  );
}