import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, map, take } from 'rxjs/operators';
import { UsuarioService } from '../../../../core/services/usuario.service';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as usuarioActions from '../../../../store/actions/usuario.actions';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  usuarioForm: FormGroup;
  idParam: String;
  nombres: String = '';
  apellidos: String = '';
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.idParam = params['id'];
    });
  }

  ngOnInit(): void {
    this.usuarioForm = this.createForm();
    if (this.idParam != null) {
      this.getUsuario();
    }
    this.getNombres();
    this.getApellidos();
  }

  createForm() {
    return this.fb.group({
      id: new FormControl(''),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      cedula: new FormControl(
        '',
        [Validators.required],
        [CustomValidator.cedula(this._usuarioService, this.idParam)]
      ),
      correo: new FormControl(
        '',
        [Validators.required, Validators.email],
        [CustomValidator.correo(this._usuarioService, this.idParam)]
      ),
      genero: new FormControl('sind'),
      telefono: new FormControl('', [Validators.required]),
    });
  }
  fnUserSubmit() {
    if (this.idParam != null) {
      this._usuarioService
        .update('usuario', this.usuarioForm.value, this.idParam)
        .toPromise()
        .then((usuario) => {
          this._store.dispatch(
            usuarioActions.modificarListaUsuarios({ id: this.idParam, usuario })
          );
          Swal.fire({
            icon: 'success',
            title: 'Bien...',
            text: '¡Usuario Modificado Correctamente!',
          }).then(() => {
            this.usuarioForm.reset();
            setTimeout(() => {
              this.router.navigate(['/usuarios/list']);
            }, 400);
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Uups...',
            text: '¡Hubo un Problema, Intentalo más Tarde!',
          });
        });
    } else {
      this._usuarioService
        .save('usuario', this.usuarioForm.value)
        .toPromise()
        .then((usuario) => {
          this._store.dispatch(usuarioActions.añadirUsuario({ usuario }));
          Swal.fire({
            icon: 'success',
            title: 'Bien...',
            text: '¡Usuario Registrado Correctamente!',
          }).then(() => {
            this.usuarioForm.reset();
            setTimeout(() => {
              this.router.navigate(['/usuarios/list']);
            }, 400);
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Uups...',
            text: '¡Hubo un Problema, Intentalo más Tarde!',
          });
        });
    }
  }
  getNombres() {
    this.usuarioForm
      .get('nombres')
      ?.valueChanges.subscribe((value) => (this.nombres = value));
  }
  getApellidos() {
    this.usuarioForm
      .get('apellidos')
      ?.valueChanges.subscribe((value) => (this.apellidos = value));
  }
  getUsuario() {
    this._usuarioService
      .findById('usuario', this.idParam)
      .toPromise()
      .then((usuario) => {
        this.usuarioForm.setValue({ ...usuario });
      });
  }
  goBack() {
    this.router.navigate(['/usuarios/list']);
  }
}

// CustomValidators
export class CustomValidator {
  static correo(_usuarioService: UsuarioService, id: String) {
    if (id == null) id = '0';
    return (control: AbstractControl) => {
      return _usuarioService
        .validate('usuario', 'Correo', control.value, id)
        .pipe(
          debounceTime(500),
          take(1),
          map((res) => {
            return res == 0 ? null : res == 2 ? null : { correoExist: true };
          })
        );
    };
  }

  static cedula(_usuarioService: UsuarioService, id: String) {
    if (id == null) id = '0';
    return (control: AbstractControl) => {
      return _usuarioService
        .validate('usuario', 'Cedula', control.value, id)
        .pipe(
          debounceTime(500),
          take(1),
          map((res) => {
            return res == 0 ? null : res == 2 ? null : { cedulaExist: true };
          })
        );
    };
  }
}
