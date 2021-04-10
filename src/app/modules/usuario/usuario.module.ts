import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ListComponent } from './components/list/list.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UsuarioComponent,
    ListComponent,
    UsuariosComponent,
    FormComponent,
  ],
  imports: [CommonModule, UsuarioRoutingModule, SharedModule],
})
export class UsuarioModule {}
