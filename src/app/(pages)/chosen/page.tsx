'use client';

import PaginatedChosen from '@/components/paginationChosen';
import { EmptyMessage } from '@/components/emptyMessage';
import { useContext } from 'react';
import { AppContext } from '@/store/context';
import '@/styles/chosen.css';

const Page = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <main className="main">
      <div className="main__chosen-field">
        {state.chosen?.length ? <PaginatedChosen /> : <EmptyMessage />}
      </div>
    </main>
  );
};

export default Page;
