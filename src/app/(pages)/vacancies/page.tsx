'use client';
import '@/styles/vacancies.css';
import { FilterForm } from '@/components/filter-form';
import PaginatedItems from '@/components/pagination';
import { Searchbar } from '@/components/searchbar';
import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import { getVacancies } from '@/utils/getVacancies';
import { useCallback, useContext, useEffect } from 'react';
import { CardList } from '@/components/card-list';
import { Spinner } from '@/components/spinner';

const Page = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        <section className="main__content-field">
          <Searchbar />
          {/*  <Spinner /> */}
          <CardList />
          {state.vacsResp?.objects.length ? <PaginatedItems /> : <div />}
        </section>
      </div>
    </main>
  );
};

export default Page;
