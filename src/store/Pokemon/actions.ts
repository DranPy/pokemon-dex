import { Dispatch } from 'redux'

import api from 'utils/api'
import { FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCEEDED } from './actionTypes'
import { FetchPokemonRequestAction, FetchPokemonSucceededAction, PokemonActionsTypes } from 'types/store/pokemon/actions'
import { normalize } from 'utils/axios'
import { PokemonSpecies } from 'types/pokemon'

interface Pokemon {
    name: string;
    species: {
        name: string
    };
}

interface PokemonEvolution {
    chain: any
}

export const fetchPokemonRequest = () : FetchPokemonRequestAction => ({
  type: FETCH_POKEMON_REQUEST,
})

export const fetchPokemonSucceeded = (data: any) : FetchPokemonSucceededAction => ({
  type: FETCH_POKEMON_SUCCEEDED,
  payload: data,
})

const getEvolutionList = (chain: { evolvesTo: any[] }, evList: any[] = []) => {
  if (!chain) return evList

  const { evolvesTo, ...restInfo } = chain
  evList.push({
    ...restInfo,
  })
  evolvesTo.forEach(element => getEvolutionList(element, evList))

  return evList
}

interface EvolutionOfPokemon {
    pokemon: Pokemon
}

export const fetchPokemon = (name: string) => async (dispatch: Dispatch<PokemonActionsTypes>) => {
  dispatch(fetchPokemonRequest())

  // HOT-FIX/NOTE: in this case I can't use axios middleware because `pokeapi-js-wrapper` 
  // package use their own axios instance and don't allow pass my own instance or add middleware
  // therefore I have to use `normalize -> humps.camelizeKeys`
  const pokemon: Pokemon = normalize(await api.getPokemonByName(name)) as Pokemon
  const pokemonSpecies: PokemonSpecies = normalize(await api.getPokemonSpeciesByName(pokemon.species.name)) as PokemonSpecies 
  const pokemonEvolution: PokemonEvolution = normalize(await api.resource(pokemonSpecies.evolutionChain.url)) as PokemonEvolution
  const evolutions = getEvolutionList(pokemonEvolution.chain)
  const evPokemons = normalize(
    await api.resource(evolutions.map(ev => `/api/v2/pokemon/${ev.species.name}`)),
  ) as Pokemon[]
  const evWithPokemons: EvolutionOfPokemon[] = evolutions.map(ev => ({
    ...ev,
    pokemon: evPokemons.find(pok => pok.name === ev.species.name),
  }))

  dispatch(
    fetchPokemonSucceeded({ details: pokemon, evolution: evWithPokemons, species: pokemonSpecies }),
  )
}
