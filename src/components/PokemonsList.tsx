import React, { useState, FC, ChangeEvent } from 'react'
import Fuse from 'fuse.js'
import { PokemonDetails } from 'types/pokemon'

interface PokemonsListProps {
    onPokemonClick: (pokemonName: string) => void,
    pokemonsList: PokemonDetails[],
}

const PokemonsList: FC<PokemonsListProps> = props => {
  const { pokemonsList, onPokemonClick } = props
  const [query, setQuery] = useState<string>('')

  const getFilteredList = (list: PokemonDetails[]): PokemonDetails[] => {
    const options = {
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name'],
    }
    const fuse = new Fuse(list, options)
    const filteredList: PokemonDetails[] = query ? fuse.search(query) : list

    return filteredList
  }
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => setQuery(event.target.value)

  const filteredList: PokemonDetails[] = getFilteredList(pokemonsList)

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

export default PokemonsList
