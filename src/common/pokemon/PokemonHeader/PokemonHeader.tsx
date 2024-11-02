import { FC } from 'react';
import { getPokemonId } from '@utils/helpers';
import styles from './PokemonHeader.module.css';

interface PokemonHeaderProps {
  id: number;
  name: string;
}

export const PokemonHeader: FC<PokemonHeaderProps> = ({ id, name }) => (
  <div className={styles.container}>
    <div className={styles.pokemonId}>{getPokemonId(id)}</div>
    <div>{name}</div>
  </div>
);
