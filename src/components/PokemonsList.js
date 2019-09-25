import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'

const PokemonsList = props => {
  const { pokemonsList, onPokemonClick } = props
  const [query, setQuery] = useState('')

  const getFilteredList = list => {
    const options = {
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name'],
    }
    const fuse = new Fuse(list, options)
    const filteredList = query ? fuse.search(query) : list

    return filteredList
  }
  const handleSearch = event => setQuery(event.target.value)

  const filteredList = getFilteredList(pokemonsList)

  return (
    <div className="pokemon-list">
      <h3 className="pokemon-list__title">Pokemons list</h3>
      <input
        className="pokemon-list__search"
        onChange={handleSearch}
        placeholder="Search by name"
        type="text"
      />
      {filteredList.map(pok => (
        <div className="pokemon-list__pokemon" key={pok.url}>
          <button
            className="pokemon-list__pokemon-trigger"
            onClick={() => onPokemonClick(pok.name)}
          >
            {pok.name}
          </button>
        </div>
      ))}
    </div>
  )
}

PokemonsList.propTypes = {
  pokemonsList: PropTypes.array.isRequired,
  onPokemonClick: PropTypes.func.isRequired,
}

export default PokemonsList
