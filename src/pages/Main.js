import React, { Component } from 'react'
import { connect } from 'react-redux'
import humps from 'humps'
import cn from 'classnames'
import Fuse from 'fuse.js'

import { fetchPokemons } from 'store/Pokemons/actions'
import { getPokemons } from 'store/Pokemons/selector'
import api from 'utils/api'

class Main extends Component {
  state = {
    pokemon: null,
    query: '',
  }

  componentDidMount() {
    this.props.fetchPokemons()
    console.log(api)
  }

  handleShowPokemonDetails = name => {
    api.getPokemonByName(name).then(resp => this.setState({ pokemon: humps.camelizeKeys(resp) }))
  }

  handleSearch = event => this.setState({ query: event.target.value })

  getFilteredList = list => {
    const { query } = this.state
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

  render() {
    const { pokemons } = this.props
    const { pokemon } = this.state

    const filteredList = this.getFilteredList(pokemons)

    if (pokemon === null && pokemons.length > 0) {
      this.handleShowPokemonDetails(pokemons[0].name)
    }

    return (
      <div className="pokemon-dex">
        <div className="pokemon-list">
          <h3 className="pokemon-list__title">Pokemons list</h3>
          <input
            className="pokemon-list__search"
            onChange={this.handleSearch}
            placeholder="Search by name"
            type="text"
          />
          {filteredList.map(pokemon => (
            <div className="pokemon-list__pokemon" key={pokemon.url}>
              <button
                className="pokemon-list__pokemon-trigger"
                onClick={() => this.handleShowPokemonDetails(pokemon.name)}
              >
                {pokemon.name}
              </button>
            </div>
          ))}
        </div>
        {pokemon && (
          <div className="pokemon-info">
            <div className="pokemon-card">
              <img
                alt="pokemon images"
                className="pokemon-card__img"
                src={pokemon.sprites.frontDefault}
              />
              <h3 className="pokemon-card__name">{pokemon.name}</h3>
              <div className="pokemon-card__id">#{pokemon.id}</div>
              <div className="pokemon-card__types">
                {pokemon.types.map(item => (
                  <div
                    className={cn('pokemon-card__type', `-${item.type.name}`)}
                    key={item.type.url}
                  >
                    {item.type.name}
                  </div>
                ))}
              </div>
              <div className="pokemon-card__size">
                weight {pokemon.weight} x height {pokemon.height}
              </div>
              <hr />
              <div className="pokemon-card__stats">
                {pokemon.stats.map(({ baseStat, stat }) => (
                  <div className="pokemon-card__stat" key={stat.url}>
                    {stat.name} - {baseStat}
                    <div className="pokemon-card__stat-rate" style={{ width: `${baseStat}px` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pokemons: getPokemons(state),
})

const mapDispatchToProps = {
  fetchPokemons,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
