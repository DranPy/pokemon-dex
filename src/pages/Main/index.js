import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPokemons } from 'store/Pokemons/actions'
import { getPokemons } from 'store/Pokemons/selector'

class Main extends Component {
  componentDidMount() {
    this.props.fetchPokemons({ offset: 0, limit: 30 })
  }

  handleShowPokemonDetails = url => {
    console.log({ url })
  }

  render() {
    const { pokemons = [] } = this.props

    return (
      <div>
        {pokemons.map(pokemon => (
          <div key={pokemon.url}>
            <button onClick={() => this.handleShowPokemonDetails(pokemon.url)}>
              {pokemon.name}
            </button>
          </div>
        ))}
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
