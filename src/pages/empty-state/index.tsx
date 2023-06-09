import React, { useContext, useEffect } from 'react';
import './index.css';
import emptyStateImg from '../../assets/empty-state-2.png';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';

export const EmptyState = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const onButtoneClick = async () => {
    dispatch({
      type: ActionType.SetActiveLink,
      payload: { activeLink: '/main' },
    });
    navigate('/main');
  };

  useEffect(() => {
    dispatch({
      type: ActionType.SetSearchWord,
      payload: { searhWord: '' },
    });
  }, []);

  return (
    <main className="main">
      <div className="main__chosen-field">
        <div className="empty">
          <img src={emptyStateImg} alt="empty state" className="empty-img" />
          <p className="empty-text">Упс, здесь еще ничего нет!</p>
          <button onClick={onButtoneClick} className="empty-btn">
            Поиск Вакансий
          </button>
        </div>
      </div>
    </main>
  );
};
