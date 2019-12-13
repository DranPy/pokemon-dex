import { combineReducers } from 'redux'

import pokemonsList from './PokemonsList'
import pokemon from './Pokemon'

const reducers = combineReducers({
  pokemonsList,
  pokemon,
})

export default reducers
