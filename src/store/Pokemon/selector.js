const getEevolutionList = (chain, list = []) => {
  const { evolvesTo, ...restInfo } = chain

  list.push({
    ...restInfo,
  })

  evolvesTo.forEach(element => getEevolutionList(element, list))

  return list
}

export const getPokemon = state => state.pokemon.details

export const isPokemonLoading = state => state.pokemon.isLoading

export const getPokemonEvolution = state => getEevolutionList(state.pokemon.evolution)
