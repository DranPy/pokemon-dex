import { FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCEEDED } from "store/Pokemon/actionTypes";

export interface FetchPokemonRequestAction {
    type: typeof FETCH_POKEMON_REQUEST,
    payload?: any
}

export interface FetchPokemonSucceededAction {
    type: typeof FETCH_POKEMON_SUCCEEDED
    payload: any
}

export type PokemonActionsTypes = FetchPokemonRequestAction | FetchPokemonSucceededAction

