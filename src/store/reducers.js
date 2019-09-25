import { combineReducers } from 'redux'

import pokemonsList from './PokemonsList'
import pokemon from './Pokemon'

export default combineReducers({
  pokemonsList,
  pokemon,
})
