import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { slider, stepper } from '../../../../../../route-animations';
import { UserService } from './../../../../core/services/user.service';
import { AppState } from './../../../../app.reducer';
import * as usuarioActions from '../../../../store/actions/usuario.actions';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [slider],
})
export class UsuariosComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this._userService
      .findAll('usuario')
      .toPromise()
      .then((res) => {
        this._store.dispatch(usuarioActions.añadirUsuarios({ list: res }));
      });
  }
}
