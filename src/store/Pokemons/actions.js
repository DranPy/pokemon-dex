import api from 'utils/api'
import { FETCH_POKEMONS } from './actionTypes'

export const fetchPokemonsActions = data => ({
  type: FETCH_POKEMONS,
  payload: data,
})

export const fetchPokemons = options => async dispatch => {
  const pokemonList = await api.getPokemonsList(options)
  // const pokemons = await api.resou
  dispatch(fetchPokemonsActions(pokemonList.results))
}
