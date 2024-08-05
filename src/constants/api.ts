export const API_BASE_URL = 'https://api.superjob.ru';

export const API_VERSION = '2.0';
export const API_PROTOCOL = 'oauth2';

export const API_LANGUAGE = 'en';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/${API_VERSION}/${API_PROTOCOL}/password`,
  REFRESH: `${API_BASE_URL}/${API_VERSION}/${API_PROTOCOL}/refresh`,
  CATALOGUES: `${API_BASE_URL}/${API_VERSION}/catalogues`,
  VACANCIES: `${API_BASE_URL}/${API_VERSION}/vacancies`,
} as const;
