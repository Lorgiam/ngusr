import { Action, createReducer, on } from '@ngrx/store';
import * as usuarioActions from '../actions/usuario.actions';
import { Usuario } from '../../shared/models/usuario.model';

export interface UsuarioState {
  list: Usuario[];
  select?: Usuario;
}

const initialState: UsuarioState = {
  list: [],
  select: {},
};

const _usuarioReducer = createReducer(
  initialState,
  on(usuarioActions.listarUsuarios, (state) => ({
    ...state,
  })),
  on(usuarioActions.añadirUsuarios, (state, { list }) => ({
    ...state,
    list: [...list],
  })),
  on(usuarioActions.añadirUsuario, (state, { usuario }) => ({
    ...state,
    list: [...state.list, usuario],
  })),

  on(usuarioActions.eliminarUsuario, (state, { id }) => ({
    ...state,
    list: state.list.filter((x) => x.id != id),
  })),
  on(usuarioActions.modificarListaUsuarios, (state, { id, usuario }) => ({
    ...state,
    list: state.list.map((el) => {
      if (el.id == id) {
        return (el = {
          ...usuario,
        });
      } else {
        return el;
      }
    }),
  }))
);

export function usuarioReducer(state: any, action: Action) {
  return _usuarioReducer(state, action);
}
