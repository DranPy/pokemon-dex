import keyBy from 'lodash/keyBy'

import { FETCH_POKEMONS_LIST } from './actionTypes'

const initialState = {
  byName: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POKEMONS_LIST: {
      return {
        ...state,
        byName: keyBy(payload, 'name'),
      }
    }

    default:
      return state
  }
}
