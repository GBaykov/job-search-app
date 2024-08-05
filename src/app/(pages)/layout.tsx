'use client';

import { Header } from '@/components/header';
import { fetchCatalogues, log_in, Refresh_token } from '@/services/Api';
import { AppContext } from '@/store/context';
import { AppReducer, initialState } from '@/store/reducer';
import { ActionType, LogInResponse } from '@/types';
import { getFromStorage, setToStorage } from '@/utils/localstorage';
import React, { FC, ReactNode, useEffect, useContext, useMemo, useReducer, useState } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const { state, dispatch } = useContext(AppContext);
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  const [isLoading, setIsLoading] = useState(false);

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
    setAccessData();
  }, []);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch({
  //     type: ActionType.SetActiveLink,
  //     payload: { activeLink: '/main' },
  //   });
  //   if (state.activeLink === '/') {
  //     navigate('/main');
  //   }
  // }, []);

  return (
    <AppContext.Provider value={contextValue}>
      <Header />
      {/* <Outlet /> */}
      {children}
    </AppContext.Provider>
  );
};

export default MainLayout;
