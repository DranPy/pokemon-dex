import api from 'utils/api'
import { FETCH_POKEMONS_LIST } from './actionTypes'

export const fetchPokemonsListActions = data => ({
  type: FETCH_POKEMONS_LIST,
  payload: data,
})

export const fetchPokemonsList = options => async dispatch => {
  const pokemonList = await api.getPokemonsList(options)
  dispatch(fetchPokemonsListActions(pokemonList.results))
}
