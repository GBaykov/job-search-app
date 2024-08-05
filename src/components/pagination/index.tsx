import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import './index.css';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { items_per_page } from '@/constants';

export default function PaginatedItems() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);

  const vacsPage = Math.abs(Number(params.get('page'))) || 1;

  useEffect(() => {
    params.set('page', String(vacsPage));
    replace(`${pathname}?${params}`);
  }, [vacsPage]);

  useEffect(() => {
    if (state.vacsResp?.more) {
      if (state.vacsResp?.total) {
        const divisible = state.vacsResp?.total;
        if (divisible > 500) {
          setPageCount(Math.ceil(500 / items_per_page));
        } else {
          setPageCount(Math.ceil(divisible / items_per_page));
        }
      }
    } else {
      setPageCount(Number(vacsPage));
    }
  }, [state.vacsResp?.total, state.vacsResp?.more]);

  type SelectedItem = {
    selected: number;
  };

  const handlePageClick = (event: SelectedItem) => {
    if (state.vacsResp?.total && event.selected < state.vacsResp?.total) {
      dispatch({ type: ActionType.SetVacsPage, payload: { vacsPage: +event.selected + 1 } });
      const page = event.selected + 1;
      params.set('page', String(page));

      replace(`${pathname}?${params.toString()}`);
    }
  };

  const pageRange = vacsPage > 1 && vacsPage < pageCount ? 2 : 3;

  return (
    <div className="paginate-count">
      <ReactPaginate
        breakLabel={null}
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        marginPagesDisplayed={0}
        forcePage={vacsPage - 1}
        pageCount={pageCount}
        previousLabel="<div "
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
  );
}
