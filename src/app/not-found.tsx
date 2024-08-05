'use client';

import { FC } from 'react';

import { EmptyMessage } from '@/components/emptyMessage';

const NotFound: FC = () => {
  return (
    <main className="main">
      <div className="main__chosen-field">
        <EmptyMessage />
      </div>
    </main>
  );
};

export default NotFound;
