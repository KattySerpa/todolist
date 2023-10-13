import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarTareasComponent } from './components/listar-tareas/listar-tareas.component';
import { RegistrarTareasComponent } from './components/registrar-tareas/registrar-tareas.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarTareasComponent,
    RegistrarTareasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ListarTareasComponent,
    RegistrarTareasComponent,
  ]
})
export class GestionaTareasModule { }
