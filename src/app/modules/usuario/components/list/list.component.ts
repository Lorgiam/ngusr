import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../../../shared/models/usuario.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  usuarios$: Observable<Usuario[]> = new Observable();

  constructor() {}

  ngOnInit(): void {}
}
