import { PokemonModal, Spinner } from '@common';
import { useRequestPokemonInfiniteQuery } from '@utils/api';
import { KEYS } from '@utils/constants';
import { getPokemonId } from '@utils/helpers';
import { useInView } from '@utils/hooks';
import { FC, useEffect, useState } from 'react';

export const PokemonsPage: FC = () => {
  const { isInView, ref } = useInView();
  const [selectedPokemonId, setSelectedPokemonId] = useState<Pokemon['id'] | null>(null);
  const { data, fetchNextPage, isLoading, hasNextPage } = useRequestPokemonInfiniteQuery();

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, data]);

  if (isLoading || !data) return <Spinner />;

  const pokemons = data.pages.reduce(
    (pokemons: NamedAPIResource[], { data }) => [...pokemons, ...data.results],
    []
  );

  return (
    <div className='page'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10'>
        {pokemons.map((pokemon, index) => {
          const id = index + 1;

          return (
            <div
              key={id}
              className='card'
              role='button'
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === KEYS.ENTER) setSelectedPokemonId(id);
              }}
              onClick={() => setSelectedPokemonId(id)}
            >
              <div className='flex items-center justify-between gap-1'>
                <div className='text-2xl font-bold capitalize'>{pokemon.name}</div>
                <div className='text-base font-light'>{getPokemonId(id)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <PokemonModal
        isShowing={!!selectedPokemonId}
        pokemonId={selectedPokemonId}
        onClose={() => setSelectedPokemonId(null)}
      />

      <div ref={ref} />
    </div>
  );
};
