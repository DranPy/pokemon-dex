import { PokemonActionsTypes } from "./pokemon/actions";
import reducers from "store/reducers";

export type AppActions = PokemonActionsTypes

export type AppState = ReturnType<typeof reducers>
