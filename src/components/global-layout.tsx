import Link from 'next/link';
import React, { ReactNode } from 'react';
import style from '@/styles/global-layout.module.css';

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <header>
        <Link
          className={style.logo}
          href={'/'}
          style={{
            color: 'rgb(229,9,20)',
          }}
        >
          ONEBITE CINEMA
        </Link>
      </header>
      {children}
    </div>
  );
};

export default GlobalLayout;
