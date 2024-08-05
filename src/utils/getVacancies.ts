import { fetchVacancies } from '../services/Api';

type SearhFields = {
  keyword: string;
  payment_from: string;
  payment_to: string;
  catalogues: string;
  page: string;
};

export async function getVacancies(values: SearhFields) {
  const keyword = values.keyword;
  const payment_from = Number(values.payment_from);
  const payment_to = Number(values.payment_to);
  const catalogues = Number(values.catalogues);
  const no_agreement = 1;
  const count = 4;
  const page = values.page ? +values.page + 1 : 1;
  const published = 1;

  return await fetchVacancies(
    count,
    page,
    no_agreement,
    keyword,
    payment_from,
    payment_to,
    catalogues,
    published,
  );
}
