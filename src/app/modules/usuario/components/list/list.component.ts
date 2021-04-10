import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../shared/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.reducer';
import { UsuarioService } from '../../../../core/services/usuario.service';
import Swal from 'sweetalert2';
import * as usuarioActions from '../../../../store/actions/usuario.actions';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private _store: Store<AppState>,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this._store.select('usuarios').subscribe((usuarios) => {
      this.usuarios = [...usuarios.list];
    });
  }

  confirmDeleteUser(id: any, nombres: any, apellidos: any) {
    Swal.fire({
      title: `¿ Deseas Eliminar el Usuario ${nombres} ${apellidos}?`,
      text: '¡Esta Acción No Puede Ser Reversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Estoy De Acuerdo',
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService
          .delete('usuario', id)
          .toPromise()
          .then(() => {
            this._store.dispatch(usuarioActions.eliminarUsuario({ id}));
            Swal.fire(
              'Eliminado!',
              'El Usuario Ha Sido Eliminado Correctamente.',
              'success'
            );
          })
          .catch(() => {
            Swal.fire(
              '!Uups!',
              'Ha Ocurrido un Error, Intentalo Más Tarde',
              'error'
            );
          });
      }
    });
  }
}
