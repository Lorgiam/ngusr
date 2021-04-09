import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../shared/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.select('usuarios').subscribe((usuarios) => {
      this.usuarios = [...usuarios.list];
    });
  }
}
