import { FC } from 'react';
import { Typography } from '@common';
import styles from './BackButton.module.css';

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: FC<BackButtonProps> = ({ onBack }) => (
  <div
    tabIndex={0}
    role='button'
    className={styles.button}
    onKeyPress={(event) => event.key === 'Enter' && onBack()}
    onClick={onBack}
  >
    <span className={styles.arrow}>&larr;</span>
    <Typography variant='title-body'>Back</Typography>
  </div>
);
