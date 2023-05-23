export type AppState = {
  from: string;
  to: string;
  searhWord: string;
  catalogue: number;
  activeLink: string;
  currentPage: number;
  logInData: LogInResponse | null;
  isLoading: boolean;
};
export enum ActionType {
  SetTo,
  SetFrom,
  SetSearchWord,
  SetCatalogue,
  SetActiveLink,
  SetCurrentPage,
  SetlogInData,
  SetIsLoading,
}
export interface SetIsLoading {
  type: ActionType.SetIsLoading;
  payload: { isLoading: boolean };
}

export interface SetTo {
  type: ActionType.SetTo;
  payload: { to: string };
}

export interface SetFrom {
  type: ActionType.SetFrom;
  payload: { from: string };
}

export interface SetSearchWord {
  type: ActionType.SetSearchWord;
  payload: { searhWord: string };
}

export interface SetCatalogue {
  type: ActionType.SetCatalogue;
  payload: { catalogue: number };
}

export interface SetActiveLink {
  type: ActionType.SetActiveLink;
  payload: { activeLink: string };
}

export interface SetCurrentPage {
  type: ActionType.SetCurrentPage;
  payload: { currentPage: number };
}

export interface SetlogInData {
  type: ActionType.SetlogInData;
  payload: { logInData: LogInResponse };
}

export type StateActions =
  | SetTo
  | SetFrom
  | SetSearchWord
  | SetCatalogue
  | SetActiveLink
  | SetCurrentPage
  | SetIsLoading
  | SetlogInData;

export type CardType = {
  profession: string;
  town: string;
  type_of_work: string;
  payment_from: number;
};

export type LogInResponse = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
};

export type ErrorResponse = {
  error: { code: number; message: string; error: string };
};

export type CatalogueResponse = {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: [
    {
      title_rus: string;
      url_rus: string;
      title: string;
      id_parent: number;
      key: number;
    },
  ];
};
export type CataloguesResponse = [CatalogueResponse];
