import React from 'react'
import PropTypes from 'prop-types'

const PokemonEvolution = props => {
  const { evolution, isLoading } = props

  return isLoading ? (
    'Loading...'
  ) : (
    <>
      <div className="pokemon-evolution">
        {evolution.map(({ pokemon, evolutionDetails }) => (
          <>
            {evolutionDetails.length > 0 && (
              <div className="pokemon-evolution__details">
                {evolutionDetails.map(evDetails => (
                  <>
                    {evDetails.minLevel && (
                      <div className="pokemon-evolution__min-lvl">
                        Min. LvL. {evDetails.minLevel}
                      </div>
                    )}
                    <div className="pokemon-evolution__trigger">
                      Trigger - {evDetails.trigger.name}
                    </div>
                    <div className="pokemon-evolution__direction">&#10132;</div>
                  </>
                ))}
              </div>
            )}
            <div className="pokemon-evolution__form" key={pokemon.id}>
              <img
                alt="Pokemon evolution"
                className="pokemon-evolution__img"
                src={pokemon.sprites.frontDefault}
              />
              <h4 className="pokemon-evolution__name">{pokemon.name}</h4>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

PokemonEvolution.propTypes = {
  evolution: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default PokemonEvolution
