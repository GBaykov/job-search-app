import React, { useContext, useEffect, useCallback, useState } from 'react';
import './index.css';
import { Button, Group, Select, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import cross from '../../assets/cross.svg';
import arrowDown from '../../assets/down-errow.svg';
import { AppContext } from '../../store/context';
import { ActionType, CataloguesResponse } from '../../types';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { fetchCatalogues, fetchVacancies } from '../../services/Api';
import { Spinner } from '../spinner';
import { getVacancies } from '../../utils/getVacancies';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type FormData = {
  catalogues: string;
  payment_from: '' | number;
  payment_to: '' | number;
};

export const FilterForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const isComponentMounted = useComponentDidMount();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentCatalogue, setCurrentCatalogue] = useState('');
  const [currentCatKey, setCurrentKey] = useState(0);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const setCatalogues = async () => {
    try {
      setIsLoading(true);
      const catalogues = await fetchCatalogues();
      dispatch({
        type: ActionType.SetCatalogues,
        payload: { catalogues },
      });
      setIsLoading(false);
      setIsError(false);
      const filterSelectData = catalogues?.map((catalogue) => {
        return {
          value: catalogue.title_rus,
          label: catalogue.title_rus,
          key: catalogue.key,
        };
      });
      dispatch({
        type: ActionType.SetSelectData,
        payload: { selectData: filterSelectData },
      });
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };
  console.log(state.catalogues);
  console.log(state.selectData);
  // const getInitialCatalogue = () => {
  //   const catalogueKey = params.get('catalogues');

  //   if (catalogueKey) {
  //     const catalogue = state.catalogues?.find(
  //       (item) => item.key === Number(catalogueKey),
  //     )?.title_rus;
  //     console.log(catalogue);
  //     return catalogue || '';
  //   } else {
  //     return '';
  //   }
  // };

  const handleChange = (value: string | number, key: string) => {
    if (value && key) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }
  };

  useEffect(() => {
    const catalogueKey = params.get('catalogues');
    if (catalogueKey && state.catalogues) {
      const catalogue =
        state.catalogues?.find((item) => item.key === Number(catalogueKey))?.title_rus || '';
      form.setFieldValue('catalogues', catalogue);
      dispatch({
        type: ActionType.SetCatalogue,
        payload: { catalogue: +catalogueKey },
      });
    }
  }, [state.catalogues]);

  async function onFormSubmit(e: FormData) {
    console.log(state.catalogue);
    handleChange(state.catalogue, 'catalogues');
    handleChange(form.values.payment_from, 'payment_from');
    handleChange(form.values.payment_to, 'payment_to');
    if (params.has('page')) params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
    // replace(`${pathname}?${params}`, { scroll: false });
    dispatch({
      type: ActionType.SetVacsPage,
      payload: { vacsPage: 0 },
    });
  }

  useEffect(() => {
    if (isComponentMounted) {
      setCatalogues();
      // const catalogue = getInitialCatalogue();
      // setCurrentCatalogue(catalogue);
    }
  }, [isComponentMounted]);

  const form = useForm<FormData>({
    initialValues: {
      catalogues: '',
      payment_from: params.get('payment_from') ? Number(params.get('payment_from')) : '',
      payment_to: params.get('payment_to') ? Number(params.get('payment_to')) : '',
    },
  });

  const onInputChange = useCallback(
    (value: number | string | null, type: string) => {
      if (type === 'catalogues') {
        form.setFieldValue('catalogues', String(value));
        const catalogueKey = state.catalogues?.find((item) => item.title_rus === value)?.key;
        console.log(value, catalogueKey, state.catalogues);
        dispatch({
          type: ActionType.SetCatalogue,
          payload: { catalogue: catalogueKey || 0 },
        });

        // setCurrentCatalogue(String(value));
      }

      if (type === 'payment_from') {
        if (value) {
          form.setFieldValue('payment_from', Number(value));
        } else {
          form.setFieldValue('payment_from', '');
        }
      }
      if (type === 'payment_to') {
        if (value) {
          form.setFieldValue('payment_to', Number(value));
        } else {
          form.setFieldValue('payment_to', '');
        }
      }
    },
    [state.from, state.to, dispatch],
  );

  // const addFilterSelectData = (catalogues: CataloguesResponse) => {
  //   setIsLoading(true);
  //   if (catalogues) {
  //     const filterSelectData: {
  //       value: string;
  //       label: string;
  //       key: number;
  //     }[] = catalogues?.map((catalogue) => {
  //       const cata = {
  //         value: catalogue.title_rus,
  //         label: catalogue.title_rus,
  //         key: catalogue.key,
  //       };
  //       return cata;
  //     });
  //     dispatch({
  //       type: ActionType.SetSelectData,
  //       payload: { selectData: filterSelectData },
  //     });
  //   }
  //   setIsLoading(false);
  // };

  return (
    <section className="form-block">
      {!isLoading && !isError && (
        <form onSubmit={form.onSubmit((e) => onFormSubmit(e))} onReset={form.onReset}>
          <div className="form-head">
            <p className="form-head-text">Фильтры</p>
            <button type="reset" className="reset-btn">
              Сбросить все
              <img src={cross.src} />
            </button>
          </div>

          <div className="form-inputs">
            <p className="form-text">Отрасль</p>
            {state.selectData && (
              <Select
                data-elem="industry-select"
                clearable
                value={form.values.catalogues}
                name="catalogues"
                onChange={(e) => onInputChange(e, 'catalogues')}
                w="100%"
                mb={20}
                h={42}
                p={0}
                rightSection={<img src={arrowDown.src} width="14px" />}
                rightSectionWidth={30}
                styles={{
                  rightSection: { pointerEvents: 'none', color: '#ACADB9', marginRight: '6px' },
                  input: { borderRadius: '8px' },
                }}
                placeholder="Выберете отрасль"
                data={state.selectData}
              />
            )}
            <p className="form-text">Оклад</p>
            <NumberInput
              data-elem="salary-from-input"
              value={form.values.payment_from}
              name="payment_from"
              onChange={(e) => onInputChange(e, 'payment_from')}
              w="100%"
              mb={8}
              h={42}
              placeholder="От"
              styles={{
                input: { borderRadius: '8px' },
                rightSection: { padding: '0px 0', marginRight: '4px' },
                controlUp: {
                  borderColor: 'white',
                  color: '#ACADB9',
                  cursor: 'pointer',
                  svg: { marginBottom: '-6px' },
                },
                controlDown: {
                  borderColor: 'white',
                  color: '#ACADB9',
                  cursor: 'pointer',
                  svg: { marginTop: '-6px' },
                },
              }}
            />

            <NumberInput
              data-elem="salary-to-input"
              value={form.values.payment_to}
              onChange={(e) => onInputChange(e, 'payment_to')}
              name="to"
              w="100%"
              h={42}
              placeholder="До"
              styles={{
                rightSection: { marginRight: '4px' },
                input: { borderRadius: '8px' },
                controlUp: {
                  borderColor: 'white',
                  color: '#ACADB9',
                  cursor: 'pointer',
                  svg: { marginBottom: '-6px' },
                },
                controlDown: {
                  borderColor: 'white',
                  color: '#ACADB9',
                  cursor: 'pointer',
                  svg: { marginTop: '-6px' },
                },
              }}
            />
          </div>
          <Group position="center" mt={20}>
            <Button
              data-elem="search-button"
              w="100%"
              h={42}
              type="submit"
              bg="#5E96FC"
              styles={{
                label: { fontFamily: 'Inter', fontWeight: 'normal', fontSize: '14px' },
                root: { borderRadius: '8px' },
              }}
            >
              Применить
            </Button>
          </Group>
        </form>
      )}
      {isLoading && <Spinner />}
    </section>
  );
};
