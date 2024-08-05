'use client';

import { FC, useContext, useEffect } from 'react';

import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import emptyStateImg from '@/assets/empty-state-2.png';
import { EmptyMessage } from '@/components/emptyMessage';

const NotFound: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  // const navigate = useNavigate();

  // const onButtoneClick = async () => {
  //   dispatch({
  //     type: ActionType.SetActiveLink,
  //     payload: { activeLink: '/main' },
  //   });
  //   // navigate('/main');
  // };

  // useEffect(() => {
  //   dispatch({
  //     type: ActionType.SetSearchWord,
  //     payload: { searhWord: '' },
  //   });
  // }, []);

  return (
    <main className="main">
      <div className="main__chosen-field">
        <EmptyMessage />
        {/* <div className="empty">
          <img src={emptyStateImg.src} alt="empty state" className="empty-img" />
          <p className="empty-text">Упс, здесь еще ничего нет!</p>
          <button className="empty-btn">Поиск Вакансий</button>
        </div> */}
      </div>
    </main>
  );
};

export default NotFound;
