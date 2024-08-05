import React, { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { Card } from '../card';
import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import { getVacancies } from '@/utils/getVacancies';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '../spinner';
import { EmptyMessage } from '../emptyMessage';

export type GetVacanciesProps = {
  keyword: string;
  payment_from: string;
  payment_to: string;
  catalogues: string;
  page: string;
};
export const CardList = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { state, dispatch } = useContext(AppContext);

  const getVacans = useCallback(
    async (data: GetVacanciesProps) => {
      dispatch({
        type: ActionType.SetIsLoading,
        payload: { isLoading: true },
      });

      const vacancies = await getVacancies(data);

      dispatch({
        type: ActionType.SetVacsResp,
        payload: { vacsResp: vacancies },
      });

      dispatch({
        type: ActionType.SetIsLoading,
        payload: { isLoading: false },
      });
    },
    [state.vacsResp],
  );

  useEffect(() => {
    const values = {
      keyword: params.get('keyword') || '',
      payment_from: params.get('payment_from') || '',
      payment_to: params.get('payment_to') || '',
      catalogues: params.get('catalogues') || '',
      page: params.get('page') || '',
    };

    getVacans(values);
  }, [searchParams]);
  if (state.isLoading) return <Spinner />;

  return (
    <section className="card-list">
      {!state.isLoading &&
        state.vacsResp?.objects?.map((vacancy) => {
          return <Card isBlack={false} key={vacancy.id} vacancy={vacancy} />;
        })}
      {!state.isLoading && !state.vacsResp?.objects.length && <EmptyMessage />}
    </section>
  );
};
