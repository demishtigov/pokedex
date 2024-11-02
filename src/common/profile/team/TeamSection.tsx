import { FC } from 'react';
import { PokemonShortCard, Typography } from '@common';
import styles from './TeamSection.module.css';

interface TeamSectionProps {
  pokemons: Pokemon[];
}

export const TeamSection: FC<TeamSectionProps> = ({ pokemons }) => (
  <div className={styles.container}>
    <Typography variant='title'>Team</Typography>
    <div className={`flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-4`}>
      {pokemons.map((pokemon) => (
        <PokemonShortCard key={pokemon.id} name={pokemon.name} />
      ))}
    </div>
  </div>
);
