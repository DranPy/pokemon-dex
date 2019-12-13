import React, { useEffect, useState, FC } from 'react'
import cn from 'classnames'
import { PokemonSprites, PokemonDetails } from 'types/pokemon'

interface PokemonCardProps {
    pokemon: PokemonDetails,
    fetchPokemon: () => void,
    isPokemonLoading: boolean
}

const PokemonCard: FC<PokemonCardProps> = (props) => {
  const { pokemon, fetchPokemon, isPokemonLoading } = props

  useEffect(() => {
    fetchPokemon()
  }, [])

  const spritesSides: PokemonSprites[] = ['frontDefault', 'frontShiny', 'backDefault', 'backShiny']
  const [spritesSide, setSpritesSide] = useState<PokemonSprites>(spritesSides[0])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSpritesSide(prevSide => {
        const nextIndex: number = spritesSides.indexOf(prevSide) + 1
        const currentItemIndex: number = nextIndex !== spritesSides.length ? nextIndex : 0
        return spritesSides[currentItemIndex]
      })
    }, 1500)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line
  }, [])

  return isPokemonLoading ? (
    <>
        Loading...
    </>
  ) : (
    <div className="pokemon-card">
      <img alt="pokemon images" className="pokemon-card__img" src={pokemon.sprites[spritesSide]} />
      <h3 className="pokemon-card__name">{pokemon.name}</h3>
      <div className="pokemon-card__id">#{pokemon.id}</div>
      <div className="pokemon-card__types">
        {pokemon.types.map(({ type }) => (
          <div className={cn('pokemon-card__type', `-${type.name}`)} key={type.url}>
            {type.name}
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

export default PokemonCard
