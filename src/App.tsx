import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import './App.css';
import { AppContext } from './store/context';
import { AppReducer, initialState } from './store/reducer';

import { Refresh_token, log_in } from './services/Api';
import { ActionType, LogInResponse } from './types';
import useComponentDidMount from './hooks/useComponentDidMount';
import { getFromStorage, setToStorage } from './utils/localstorage';
import { Spinner } from './components/spinner';
import { getVacancies } from './utils/getVacancies';

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  const [isLoading, setIsLoading] = useState(false);
  const isComponentMounted = useComponentDidMount();

  // const getVacans = useCallback(async () => {
  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: true },
  //   });

  //   const vacancies = await getVacancies(state);
  //   dispatch({
  //     type: ActionType.SetVacsResp,
  //     payload: { vacsResp: vacancies },
  //   });

  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: false },
  //   });
  // }, [state.vacsResp]);

  const logInStoraged = getFromStorage('logInResp');

  const setAccessData = async () => {
    try {
      setIsLoading(true);
      if (logInStoraged) {
        const storageData = JSON.parse(logInStoraged) as LogInResponse;
        if (!storageData.access_token) {
          const logInResp = await log_in();
          dispatch({
            type: ActionType.SetlogInData,
            payload: { logInData: logInResp },
          });
          setToStorage('logInResp', JSON.stringify(logInResp));
          setIsLoading(false);
        }
        if (storageData.ttl < Date.now() / 1000) {
          const freshData = await Refresh_token();
          dispatch({
            type: ActionType.SetlogInData,
            payload: { logInData: freshData },
          });
          setIsLoading(false);
        }
      } else {
        const logInResp = await log_in();
        dispatch({
          type: ActionType.SetlogInData,
          payload: { logInData: logInResp },
        });
        setToStorage('logInResp', JSON.stringify(logInResp));
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      throw new Error();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isComponentMounted) {
      setAccessData();
    }
  }, [isComponentMounted]);

  // useEffect(() => {
  //   if (isComponentMounted) {
  //     getVacans();
  //   }
  // }, [isComponentMounted, state.vacsPage]);

  return (
    <AppContext.Provider value={contextValue}>
      {/* {isLoading ? <Spinner /> : <Router />} */}
    </AppContext.Provider>
  );
}

export default App;
