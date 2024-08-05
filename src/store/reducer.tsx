import { ActionType, AppState, StateActions } from '../types';

export const initialState: AppState = {
  catalogue: 0,
  catalogues: null,
  currentPage: 1,
  logInData: null,
  isLoading: false,
  vacsResp: null,
  selectData: null,
  currentVacancy: null,
  chosen: null,
};

export function AppReducer(state: AppState, action: StateActions): AppState {
  switch (action.type) {
    case ActionType.SetCatalogue:
      return { ...state, catalogue: action.payload.catalogue };
    case ActionType.SetCurrentPage:
      return { ...state, currentPage: action.payload.currentPage };
    case ActionType.SetlogInData:
      return { ...state, logInData: action.payload.logInData };
    case ActionType.SetIsLoading:
      return { ...state, isLoading: action.payload.isLoading };
    case ActionType.SetVacsResp:
      return { ...state, vacsResp: action.payload.vacsResp };
    case ActionType.SetCatalogues:
      return { ...state, catalogues: action.payload.catalogues };
    case ActionType.SetSelectData:
      return { ...state, selectData: action.payload.selectData };
    case ActionType.SetCurrentVacancy:
      return { ...state, currentVacancy: action.payload.currentVacancy };
    case ActionType.SetChosen:
      return { ...state, chosen: action.payload.chosen };
    default:
      return state;
  }
}
