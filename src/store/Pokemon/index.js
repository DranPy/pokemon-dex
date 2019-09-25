// import keyBy from 'lodash/keyBy'

import {
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCEEDED,
  FETCH_POKEMON_EVOLUTION,
} from './actionTypes'

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
      return {
        ...state,
        isLoading: false,
        details: payload,
      }
    }

    case FETCH_POKEMON_EVOLUTION: {
      return {
        ...state,
        evolution: payload,
      }
    }

    default:
      return state
  }
}
