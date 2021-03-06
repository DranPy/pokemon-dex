import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPokemonsList } from 'store/PokemonsList/actions'
import { getPokemonsList } from 'store/PokemonsList/selector'
import { fetchPokemon } from 'store/Pokemon/actions'
import {
  getCurrentPokemon,
  isCurrentPokemonLoading,
  getCurrentPokemonEvolution,
} from 'store/Pokemon/selector'

import PokemonCard from 'components/PokemonCard'
import PokemonsList from 'components/PokemonsList'
import PokemonEvolution from 'components/PokemonEvolution'

class Main extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    isPokemonLoading: PropTypes.bool.isRequired,
    pokemonsList: PropTypes.array.isRequired,
    fetchPokemon: PropTypes.func.isRequired,
    fetchPokemonsList: PropTypes.func.isRequired,
    pokemonEvolution: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchPokemonsList()
  }

  render() {
    const { pokemonsList, pokemon, isPokemonLoading, fetchPokemon, pokemonEvolution } = this.props

    return (
      <div className="pokemon-dex">
        <PokemonsList onPokemonClick={fetchPokemon} pokemonsList={pokemonsList} />
        {pokemonsList.length > 0 && (
          <div className="pokemon-info">
            <div className="pokemon-info__base-info">
              <PokemonCard
                fetchPokemon={() => fetchPokemon(pokemonsList[0].name)}
                isPokemonLoading={isPokemonLoading}
                pokemon={pokemon}
              />
              <div className="pokemon-info__extra-info">
                {!isPokemonLoading && (
                  <>
                    <h4 className="pokemon-info__title">Pokemon abilities</h4>
                    <div className="pokemon-abilities">
                      {pokemon.abilities.map(item => (
                        <span className="pokemon-abilities__ability" key={item.ability.url}>
                          {item.ability.name}
                        </span>
                      ))}
                    </div>
                    <h4 className="pokemon-info__title">Pokemon moves</h4>
                    <div className="pokemon-moves">
                      {pokemon.moves.map(item => (
                        <div className="pokemon-moves__move" key={item.move.url}>
                          {item.move.name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <PokemonEvolution evolution={pokemonEvolution} isLoading={isPokemonLoading} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pokemonsList: getPokemonsList(state),
  pokemon: getCurrentPokemon(state),
  isPokemonLoading: isCurrentPokemonLoading(state),
  pokemonEvolution: getCurrentPokemonEvolution(state),
})

const mapDispatchToProps = {
  fetchPokemonsList,
  fetchPokemon,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
