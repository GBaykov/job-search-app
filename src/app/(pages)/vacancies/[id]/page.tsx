'use client';

import '@/styles/vacancy.css';

import { Card } from '@/components/card';
import { AppContext } from '@/store/context';
import { TypographyStylesProvider } from '@mantine/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ActionType } from '@/types';
import { fetchVacancy } from '@/services/Api';
import { Spinner } from '@/components/spinner';

const VacancyPage = ({ params }: { params: { id: string } }) => {
  const { state, dispatch } = useContext(AppContext);
  const [description, setDescription] = useState(state.currentVacancy?.vacancyRichText);
  const id = params.id;
  // const getVacancy = async (id: string) => {
  //   const vacancy = await fetchVacancy(id);
  //   return vacancy;
  // };
  // useEffect(() => {
  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: true },
  //   });

  //   const vacancy = getVacancy(id);

  //   dispatch({
  //     type: ActionType.SetCurrentVacancy,
  //     payload: { currentVacancy: vacancy },
  //   });

  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: false },
  //   });
  // }, []);

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

  const onVacancyClick = () => {};

  // useEffect(() => {

  //   if (state.currentVacancy?.vacancyRichText) {
  //     setDescription(state.currentVacancy?.vacancyRichText);
  //   }
  // }, []);

  return (
    <main className="main vacancy-page">
      {!state.isLoading && (
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
      )}
      {state.isLoading && <Spinner />}
    </main>
  );
};

export default VacancyPage;
