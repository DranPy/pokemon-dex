import { AppState } from "types/store/app"

export const getCurrentPokemon = (state: AppState) => state.pokemon.details

export const isCurrentPokemonLoading = (state: AppState) => state.pokemon.isLoading

export const getCurrentPokemonEvolution = (state: AppState) => state.pokemon.evolution
