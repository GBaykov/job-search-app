'use client';

import React from 'react';
import './index.css';
import logo from '../../assets/logo.svg';

import Link from 'next/link';
import { APP_ROUTES } from '@/constants/app';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const isVacancies = pathname.split('/').includes('vacancies');

  return (
    <header className="header">
      <div className="header__content content">
        <p className="content-logo">
          <img src={logo.src} /> NoSponger
        </p>
        <nav className="content-nav nav">
          <ul className="nav-list list">
            <li className="list-item">
              <Link
                href={`${APP_ROUTES.VACANCIES}`}
                className={isVacancies ? 'header-link header__active-link' : 'header-link'}
              >
                Поиск Вакансий
              </Link>
            </li>
            <li className="list-item">
              <Link
                href={`${APP_ROUTES.CHOSEN}`}
                className={
                  APP_ROUTES.CHOSEN === pathname ? 'header-link header__active-link' : 'header-link'
                }
              >
                Избранное
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
