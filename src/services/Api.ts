// import { client_secret } from '../constants';
import axios from 'axios';
import { CataloguesResponse, LogInResponse } from '../types';
import { getFromStorage } from '../utils/localstorage';
import { Vacancies, Vacancy } from '../types/vacancies';
import { APP_API_BASE_URL, APP_API_ROUTES } from '@/constants/app';

export const log_in = async () => {
  try {
    const response = await axios.get<LogInResponse>(`${APP_API_BASE_URL}${APP_API_ROUTES.LOGIN}`);
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};

const fallbackJson: string = '{ "access_resp": "null" }';
const access_resp = getFromStorage('logInResp') || fallbackJson;
const refresh_token: string = access_resp !== null ? JSON.parse(access_resp).refresh_token : '';
const access_token: string = access_resp !== null ? JSON.parse(access_resp).access_token : '';

export const Refresh_token = async () => {
  try {
    const response = await axios.get<LogInResponse>(
      `${APP_API_BASE_URL}${APP_API_ROUTES.REFRESH}/?refresh_token=${refresh_token}`,
    );
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};

export const fetchCatalogues = async () => {
  try {
    const response = await axios.get<CataloguesResponse>(
      `${APP_API_BASE_URL}${APP_API_ROUTES.CATALOGUES}`,
    );

    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};

export const fetchVacancies = async (
  count: number,
  page: number,
  no_agreement: number,
  keyword?: string,
  payment_from?: number,
  payment_to?: number,
  catalogues?: number,
  published?: number,
) => {
  try {
    const response = await axios.get<Vacancies>(`${APP_API_BASE_URL}${APP_API_ROUTES.VACANCIES}`, {
      params: {
        keyword,
        payment_from,
        payment_to,
        catalogues,
        no_agreement,
        count,
        page,
        published,
      },
      headers: {
        method: 'GET',

        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};

export const fetchVacancy = async (id: string) => {
  try {
    const response = await axios.get<Vacancy>(
      `${APP_API_BASE_URL}${APP_API_ROUTES.VACANCIES}/${id}`,
      {
        headers: {
          method: 'GET',

          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};
