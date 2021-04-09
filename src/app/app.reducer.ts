import { ActionReducerMap } from '@ngrx/store';
import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './store/reducer/hydrations.reducer';
import { usuarioReducer, UsuarioState } from './store/reducer/usuario.reducer';

export interface AppState {
  usuarios: UsuarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuarios: usuarioReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
