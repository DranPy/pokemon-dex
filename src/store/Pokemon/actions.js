import humps from 'humps'

import api from 'utils/api'
import { FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCEEDED } from './actionTypes'

export const fetchPokemonRequest = () => ({
  type: FETCH_POKEMON_REQUEST,
})

export const fetchPokemonSucceeded = data => ({
  type: FETCH_POKEMON_SUCCEEDED,
  payload: data,
})

const getEevolutionList = (chain, evList = []) => {
  if (!chain) return evList

  const { evolvesTo, ...restInfo } = chain
  evList.push({
    ...restInfo,
  })
  evolvesTo.forEach(element => getEevolutionList(element, evList))

  return evList
}

export const fetchPokemon = name => async dispatch => {
  dispatch(fetchPokemonRequest())

  const pokemon = humps.camelizeKeys(await api.getPokemonByName(name))
  const pokemonSpecies = humps.camelizeKeys(await api.getPokemonSpeciesByName(pokemon.species.name))
  const pokemonEvolution = humps.camelizeKeys(await api.resource(pokemonSpecies.evolutionChain.url))
  const evolutions = getEevolutionList(pokemonEvolution.chain)
  const evPokemons = humps.camelizeKeys(
    await api.resource(evolutions.map(ev => `/api/v2/pokemon/${ev.species.name}`)),
  )
  const evWithPokemons = evolutions.map(ev => ({
    ...ev,
    pokemon: evPokemons.find(pok => pok.name === ev.species.name),
  }))

  dispatch(
    fetchPokemonSucceeded({ details: pokemon, evolution: evWithPokemons, species: pokemonSpecies }),
  )
}
