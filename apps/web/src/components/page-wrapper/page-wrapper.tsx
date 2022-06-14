import { FC, ReactNode } from 'react';
import styles from './page-wrapper.module.css';

interface IProps {
  children: ReactNode;
}

export const PageWrapper: FC<IProps> = ({ children }) => {
  return (
    <div className={styles['center-flex']}>
      <div className={styles['wrapper']}>{children}</div>;
    </div>
  );
};
