import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { Vacancy } from '../../types/vacancies';
import { items_per_page } from '@/constants';
import { listToMatrix } from '@/utils/matrix';
import { Card } from '../card';
import { getFromStorage } from '@/utils/localstorage';
import '../pagination/index.css';
import '../card-list/index.css';

export default function PaginatedChosen() {
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState<Vacancy[] | null>(null);
  const chosenVacancies = getFromStorage('chosen');

  useEffect(() => {
    if (chosenVacancies) {
      const vacsArr: Vacancy[] = JSON.parse(chosenVacancies);
      dispatch({
        type: ActionType.SetCurrentPage,
        payload: { currentPage: 1 },
      });
      dispatch({
        type: ActionType.SetChosen,
        payload: { chosen: vacsArr },
      });
    }
  }, []);

  useEffect(() => {
    if (state.chosen && state.chosen?.length > 0) {
      const matrixVacancies = listToMatrix(state.chosen, items_per_page);
      setPageCount(matrixVacancies.length);
      setCurrentItems(matrixVacancies[state.currentPage - 1]);
      if (state.currentPage > matrixVacancies.length) {
        dispatch({
          type: ActionType.SetCurrentPage,
          payload: { currentPage: matrixVacancies.length },
        });
      }
    }
  }, [state.chosen, state.currentPage]);

  type SelectedItem = {
    selected: number;
  };

  const handlePageClick = (event: SelectedItem) => {
    dispatch({ type: ActionType.SetCurrentPage, payload: { currentPage: event.selected + 1 } });
  };

  const pageRange = state.currentPage > 1 && state.currentPage < pageCount ? 2 : 3;

  return (
    <>
      <section className="card-list">
        {currentItems?.map((vacancy) => {
          return <Card isBlack={false} key={vacancy.id} vacancy={vacancy} />;
        })}
      </section>

      <div className="paginate-count">
        <ReactPaginate
          breakLabel={null}
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRange}
          forcePage={state.currentPage - 1}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          className="pagination"
          activeClassName="active-page"
          activeLinkClassName="active-link"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item previous-item"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
        />
      </div>
    </>
  );
}
