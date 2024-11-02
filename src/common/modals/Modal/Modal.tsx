import classnames from 'classnames';
import styles from './Modal.module.css';
import { FC, ReactNode } from 'react';

export interface ModalProps {
  isShowing: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, isShowing, onClose }) => {
  if (!isShowing) return null; // Возвращаем null, если модальное окно не должно отображаться

  return (
    <div className={classnames({ [styles.modal_open]: isShowing })}>
      <div aria-hidden className={styles.modal_overlay} onClick={onClose} />
      <div className={styles.modal_container} aria-modal aria-hidden tabIndex={-1} role='dialog'>
        {children}
      </div>
    </div>
  );
};
