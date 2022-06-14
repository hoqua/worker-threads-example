import { FC } from 'react';
import { IMessage } from '../../server-mock/server-mock';
import styles from './images-container.module.css';

interface IProps {
  messages: IMessage[];
  currentUser: string;
}

export const ImagesContainer: FC<IProps> = ({ messages, currentUser }) => {
  return (
    <>
      {messages.map(({ imgSrc, userId }, index) => {
        return (
          <img
            src={imgSrc}
            alt="beautiful image"
            key={index + userId}
            className={
              userId === currentUser ? styles['border'] : styles['border-hack']
            }
          />
        );
      })}
    </>
  );
};
