import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const PokemonCard = props => {
  const { pokemon, fetchPokemon, isPokemonLoading } = props

  useEffect(() => fetchPokemon(), [])

  return isPokemonLoading ? (
    'Loading...'
  ) : (
    <div className="pokemon-card">
      <img alt="pokemon images" className="pokemon-card__img" src={pokemon.sprites.frontDefault} />
      <h3 className="pokemon-card__name">{pokemon.name}</h3>
      <div className="pokemon-card__id">#{pokemon.id}</div>
      <div className="pokemon-card__types">
        {pokemon.types.map(item => (
          <div className={cn('pokemon-card__type', `-${item.type.name}`)} key={item.type.url}>
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
  )
}

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  isPokemonLoading: PropTypes.bool.isRequired,
}

export default PokemonCard
