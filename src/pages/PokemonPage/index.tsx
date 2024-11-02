import { useNavigate, useParams } from 'react-router-dom';
import { Button, PokemonEvolutionChain, PokemonStats, Spinner } from '@common';
import { useRequestPokemonByIdQuery, useRequestPokemonSpeciesQuery } from '@utils/api';
import { FC } from 'react';
import { BackButton } from '../../common/buttons/BackButton/BackButton';
import { PokemonHeader } from '../../common/pokemon/PokemonHeader/PokemonHeader';

export const PokemonPage: FC = () => {
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const id = Number(pokemonId);

  const { data: pokemonData, isLoading: isPokemonLoading } = useRequestPokemonByIdQuery({ id });
  const { data: speciesData, isLoading: isSpeciesLoading } = useRequestPokemonSpeciesQuery({ id });

  const pokemon = pokemonData?.data;
  const isPokemonData = !!pokemon && !isPokemonLoading;
  const isSpeciesData = !!speciesData && !isSpeciesLoading;

  return (
    <div className='container px-4 pb-4'>
      <BackButton onBack={() => navigate(-1)} />

      {!isPokemonData ? (
        <Spinner />
      ) : (
        <>
          <PokemonHeader id={id} name={pokemon.name} />
          <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
            <div className='mx-auto w-full max-w-xs md:max-w-md'>
              <img
                src={pokemon.sprites.front_default || ''}
                alt={pokemon.name}
                className='h-full w-full object-contain'
              />
            </div>

            <PokemonStats
              title='Stats'
              stats={pokemon.stats.map((item) => `${item.stat.name}: ${item.base_stat}`)}
            />
            <PokemonStats
              title='Abilities'
              stats={pokemon.abilities.map(({ ability }) => ability.name)}
            />
          </div>
        </>
      )}

      {isPokemonData && !isSpeciesData && <Spinner />}
      {isSpeciesData && isPokemonData && (
        <PokemonEvolutionChain
          chainId={
            +speciesData!.data.evolution_chain.url
              .replace('https://pokeapi.co/api/v2/evolution-chain/', '')
              .replace('/', '')
          }
          pokemonName={pokemon.name}
        />
      )}

      <div className='mt-4 flex gap-2'>
        {id > 1 && (
          <Button variant='outlined' onClick={() => navigate(`/pokemon/${id - 1}`)}>
            BACK
          </Button>
        )}
        <Button onClick={() => navigate(`/pokemon/${id + 1}`)}>NEXT</Button>
      </div>
    </div>
  );
};
