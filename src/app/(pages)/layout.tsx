'use client';

import { Header } from '@/components/header';
import { log_in, Refresh_token } from '@/services/Api';
import { AppContext } from '@/store/context';
import { AppReducer, initialState } from '@/store/reducer';
import { ActionType, LogInResponse } from '@/types';
import { getFromStorage, setToStorage } from '@/utils/localstorage';
import React, { useEffect, useMemo, useReducer } from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const logInStoraged = getFromStorage('logInResp');

  const setAccessData = async () => {
    try {
      if (logInStoraged) {
        const storageData = JSON.parse(logInStoraged) as LogInResponse;
        if (!storageData.access_token) {
          const logInResp = await log_in();
          dispatch({
            type: ActionType.SetlogInData,
            payload: { logInData: logInResp },
          });
          setToStorage('logInResp', JSON.stringify(logInResp));
        }
        if (storageData.ttl < Date.now() / 1000) {
          const freshData = await Refresh_token();
          dispatch({
            type: ActionType.SetlogInData,
            payload: { logInData: freshData },
          });
        }
      } else {
        const logInResp = await log_in();
        dispatch({
          type: ActionType.SetlogInData,
          payload: { logInData: logInResp },
        });
        setToStorage('logInResp', JSON.stringify(logInResp));
      }
    } catch (err) {
      throw new Error();
    }
  };

  useEffect(() => {
    setAccessData();
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      <Header />
      {children}
    </AppContext.Provider>
  );
};

export default MainLayout;
