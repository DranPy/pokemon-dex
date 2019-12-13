export interface PokemonDetails {
    id: number,
    name: string,
    sprites: {
        [key in PokemonSprites]: string
    },
    types: PokemonType[],
    weight: number,
    height: number,
    stats: PokemonStats[],
    url: string
}

export interface PokemonStats {
    baseStat: string,
    stat: {
        name: string,
        url: string
    },
}

export interface PokemonType {
    type: {
        name: string,
        url: string,
    },
}

export type PokemonSprites = 'frontDefault' | 'frontShiny' | 'backDefault' | 'backShiny'

export interface PokemonSpecies {
    evolutionChain: {
        url: string
    }
}

export interface EvolutionDetails {
    minLevel?: string,
    trigger: {
        name: string
    }
}

export interface PokemonEvolution {
    pokemon: PokemonDetails,
    evolutionDetails: EvolutionDetails[]
}