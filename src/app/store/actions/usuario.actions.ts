import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../shared/models/usuario.model';

export const listarUsuarios = createAction('[USUARIOS] Listar Usuarios');
export const añadirUsuarios = createAction(
  '[USUARIOS] Añadir Usuarios',
  props<{ list: Usuario[] }>()
);
export const añadirUsuario = createAction(
  '[USUARIOS] Añadir Usuario',
  props<{ usuario: Usuario }>()
);
export const seleccionarUsuario = createAction(
  '[USUARIOS] Seleccionar Usuario',
  props<{ id: String }>()
);
export const modificarListaUsuarios = createAction(
  '[USUARIOS] Modificar Lista Usuarios',
  props<{ id: String; usuario: Usuario }>()
);
export const eliminarUsuario = createAction(
  '[USUARIOS] Eliminar Usuario',
  props<{ id: String }>()
);
