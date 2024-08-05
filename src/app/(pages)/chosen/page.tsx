'use client';

import PaginatedChosen from '@/components/paginationChosen';
import { EmptyMessage } from '@/components/emptyMessage';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/store/context';
import '@/styles/chosen.css';
import { getFromStorage } from '@/utils/localstorage';
import { ActionType } from '@/types';
import { Vacancy } from '@/types/vacancies';

const ChosenPage = () => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      dispatch({
        type: ActionType.SetChosen,
        payload: { chosen: vacsArr },
      });
    }
  }, []);
  return (
    <main className="main">
      <div className="main__chosen-field">
        {state.chosen?.length ? <PaginatedChosen /> : <EmptyMessage />}
      </div>
    </main>
  );
};

export default ChosenPage;
