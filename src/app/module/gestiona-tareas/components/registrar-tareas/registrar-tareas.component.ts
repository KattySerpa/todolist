import { Tarea } from './../../interfaces/tarea';
import { Component, EventEmitter, Output } from '@angular/core';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-registrar-tareas',
  templateUrl: './registrar-tareas.component.html',
  styleUrls: ['./registrar-tareas.component.css']
})


export class RegistrarTareasComponent {
  constructor(public tareaService:TareaService){ }

  ngOnInit(){
    this.tareaFormulario = this.tareaService.getDatosModificar();

    //console.log(this.tareaFormulario);
  }

  tareaFormulario:Tarea={
    id:0,
    titulo:'',
    proyecto_name:'',
    prioridad:0,
    fecha:'',
    estado:false
  }
  
  @Output() datosFormulario:EventEmitter<Tarea>= new EventEmitter<Tarea>();
  @Output() cancelarRegistroFormulario:EventEmitter<boolean>= new EventEmitter<boolean>();



  guardar(){
    
    this.datosFormulario.emit(this.tareaFormulario);

    //console.log(this.tareaFormulario);
    this.tareaFormulario={
      id:0,
      titulo:'',
      proyecto_name:'',
      prioridad:0,
      fecha:'',
      estado:false
    }
    this.tareaService.setDatosModificar(this.tareaFormulario);
  }

  cancelarRegistroForm(){
    this.cancelarRegistroFormulario.emit(false);
    
  }


}
