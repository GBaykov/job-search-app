'use client';

import '@/styles/vacancy.css';
import { Card } from '@/components/card';
import { AppContext } from '@/store/context';
import { TypographyStylesProvider } from '@mantine/core';
import { useCallback, useContext, useEffect } from 'react';
import { ActionType } from '@/types';
import { fetchVacancy } from '@/services/Api';
import { Spinner } from '@/components/spinner';
import { EmptyMessage } from '@/components/emptyMessage';

const VacancyPage = ({ params }: { params: { id: string } }) => {
  const { state, dispatch } = useContext(AppContext);
  const id = params.id;

  const getVacancy = useCallback(async () => {
    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: true },
    });

    const vacancy = await fetchVacancy(id);

    dispatch({
      type: ActionType.SetCurrentVacancy,
      payload: { currentVacancy: vacancy },
    });

    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: false },
    });
  }, [params]);

  useEffect(() => {
    getVacancy();
  }, []);

  if (state.isLoading) return <Spinner />;

  return (
    <main className="main vacancy-page">
      {state.currentVacancy?.id ? (
        <div className="vacancy-page__content">
          {state.currentVacancy !== null && <Card vacancy={state.currentVacancy} isBlack={true} />}
          <section className="vacancy-page__text">
            <TypographyStylesProvider>
              <div
                dangerouslySetInnerHTML={{ __html: `${state.currentVacancy?.vacancyRichText}` }}
              />
            </TypographyStylesProvider>
          </section>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </main>
  );
};

export default VacancyPage;
