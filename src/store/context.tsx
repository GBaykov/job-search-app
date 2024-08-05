'use client';
import React from 'react';
import { AppState, StateActions } from '../types';
import { initialState } from './reducer';

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<StateActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
