import { FC } from 'react';

type PaymentBlockProps = {
  payment_to?: number;
  payment_from?: number;
  payment: number | null;
  currency: string;
  isBlack: boolean;
};

export const PaymentBlock: FC<PaymentBlockProps> = ({
  payment_to,
  payment_from,
  currency,
  payment,
  isBlack,
}) => {
  if (!payment_to && !payment_from && payment) {
    return (
      <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
        з/п {payment} {currency}
      </p>
    );
  } else if (payment_to && payment_from && payment_from > 0 && payment_to > 0) {
    return (
      <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
        з/п {payment_from} - {payment_to} {currency}
      </p>
    );
  } else if (!payment_to && payment_from) {
    return (
      <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
        з/п от {payment_from} {currency}
      </p>
    );
  } else if (payment_to && !payment_from) {
    return (
      <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
        з/п до {payment_to} {currency}
      </p>
    );
  }
};
