import emptyStateImg from '@/assets/empty-state-2.png';
import { APP_ROUTES } from '@/constants/app';
import '@/styles/empty.css';
import Link from 'next/link';

export const EmptyMessage = () => {
  return (
    <div className="empty">
      <img src={emptyStateImg.src} alt="empty state" className="empty-img" />
      <p className="empty-text">Упс, здесь еще ничего нет!</p>
      <Link href={`${APP_ROUTES.VACANCIES}`} className="empty-btn">
        Поиск Вакансий
      </Link>
    </div>
  );
};
