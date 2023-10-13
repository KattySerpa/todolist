import { TareaService } from './../../services/tarea.service';
import { Tarea } from './../../interfaces/tarea';
import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.css']
})
export class ListarTareasComponent {
  constructor(public tareaService:TareaService){}

  @Input() titulo:string='';

  @Input() tarea_completada: boolean = false;

  @Input() data:Tarea[]=[];

  @Output() comunicaFormAddTarea:EventEmitter<boolean>=new EventEmitter<boolean>();
  
  @Output() comunicaIdEliminar:EventEmitter<number>=new EventEmitter<number>();
  
  @Output() formunicaEstadoEditar:EventEmitter<boolean>=new EventEmitter<boolean>();
  
  informarAgregarTarea(flag:boolean){
//    let infoAgregarTarea=false;
    console.log(flag);
    this.comunicaFormAddTarea.emit(flag);
  }
  

  deleteTarea(id:number){
    this.comunicaIdEliminar.emit(id);
  }

  formEditarTarea(tarea:Tarea){
    this.formunicaEstadoEditar.emit(true);
    
    this.informarAgregarTarea(false);
    setTimeout(()=>{
      this.tareaService.setDatosModificar(tarea);
      this.informarAgregarTarea(true);    
    },0)    
  }
  
  datos:any={};
  @Output() emisorEstadoChecked:EventEmitter<{evento:boolean,id:number}> = new EventEmitter();
  checkedTarea(evento:any,id:number){
    //console.log('en listar tareas: ',id);
    this.datos = {
      evento: evento.target.checked,
      id: id
    };

    this.emisorEstadoChecked.emit(this.datos);

    console.log('en listar tareas: ',this.datos);
    //this.tareaService.editEstadoTarea(evento.target.checked,tarea.id);
    
    //console.log(evento.target.checked);
  }

  

}
