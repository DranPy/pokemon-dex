import humps from 'humps'

import api from 'utils/api'
import {
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCEEDED,
  FETCH_POKEMON_EVOLUTION,
} from './actionTypes'

export const fetchPokemonRequest = () => ({
  type: FETCH_POKEMON_REQUEST,
})

export const fetchPokemonSucceeded = data => ({
  type: FETCH_POKEMON_SUCCEEDED,
  payload: data,
})

export const fetchPokemon = options => async dispatch => {
  dispatch(fetchPokemonRequest())
  const pokemon = await api.getPokemonByName(options)

  // dispatch(fetchPokemonEvolution(pokemon.id))
  dispatch(fetchPokemonSucceeded(humps.camelizeKeys(pokemon)))
}

export const fetchPokemonEvolutionActions = data => ({
  type: FETCH_POKEMON_EVOLUTION,
  payload: data,
})

export const fetchPokemonEvolution = id => async dispatch => {
  const pokemonEvolution = await api.getEvolutionChainById(id)
  dispatch(fetchPokemonEvolutionActions(humps.camelizeKeys(pokemonEvolution)))
}
