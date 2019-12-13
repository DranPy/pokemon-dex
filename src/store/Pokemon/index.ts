import { FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCEEDED, FETCH_POKEMON_FEILED } from './actionTypes'
import { PokemonActionsTypes } from 'types/store/pokemon/actions'
import { PokemonDetails, PokemonEvolution, PokemonSpecies } from 'types/pokemon'

interface State {
    isLoading: boolean;
    details: PokemonDetails | {};
    evolution: PokemonEvolution | {};
    species: PokemonSpecies | {};
}

const initialState: State = {
  isLoading: true,
  details: {},
  evolution: {},
  species: {},
}

export default (state = initialState, action: PokemonActionsTypes): State => {
  switch (action.type) {
    case FETCH_POKEMON_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case FETCH_POKEMON_SUCCEEDED: {
      const { details, evolution, species } = action.payload
      return {
        ...state,
        isLoading: false,
        details,
        evolution,
        species,
      }
    }

    case FETCH_POKEMON_FEILED: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default:
      return state
  }
}
