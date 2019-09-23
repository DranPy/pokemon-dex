import api from 'utils/api'
import { FETCH_POKEMONS } from './actionTypes'

export const fetchPokemonsActions = data => ({
  type: FETCH_POKEMONS,
  payload: data,
})

export const fetchPokemons = options => dispatch =>
  api.getPokemonsList(options).then(({ results }) => dispatch(fetchPokemonsActions(results)))
