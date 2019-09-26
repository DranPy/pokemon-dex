import { FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCEEDED, FETCH_POKEMON_FEILED } from './actionTypes'

const initialState = {
  isLoading: true,
  details: {},
  evolution: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POKEMON_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case FETCH_POKEMON_SUCCEEDED: {
      const { details, evolution, species } = payload
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
