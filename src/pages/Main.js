import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPokemonsList } from 'store/PokemonsList/actions'
import { getPokemonsList } from 'store/PokemonsList/selector'
import { fetchPokemon } from 'store/Pokemon/actions'
import { getPokemon, isPokemonLoading } from 'store/Pokemon/selector'

import PokemonCard from 'components/PokemonCard'
import PokemonsList from 'components/PokemonsList'

class Main extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    isPokemonLoading: PropTypes.bool.isRequired,
    pokemonsList: PropTypes.array.isRequired,
    fetchPokemon: PropTypes.func.isRequired,
    fetchPokemonsList: PropTypes.func.isRequired,
    fetchPokemonEvolution: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchPokemonsList()
  }

  render() {
    const { pokemonsList, pokemon, isPokemonLoading, fetchPokemon } = this.props

    return (
      <div className="pokemon-dex">
        <PokemonsList onPokemonClick={fetchPokemon} pokemonsList={pokemonsList} />
        {pokemonsList.length > 0 && (
          <div className="pokemon-info">
            <PokemonCard
              fetchPokemon={() => fetchPokemon(pokemonsList[0].name)}
              isPokemonLoading={isPokemonLoading}
              pokemon={pokemon}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pokemonsList: getPokemonsList(state),
  pokemon: getPokemon(state),
  isPokemonLoading: isPokemonLoading(state),
})

const mapDispatchToProps = {
  fetchPokemonsList,
  fetchPokemon,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
