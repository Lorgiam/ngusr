import { Component, OnInit } from '@angular/core';
import { slider, stepper } from '../../../../../../route-animations';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [slider],
})
export class UsuariosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
