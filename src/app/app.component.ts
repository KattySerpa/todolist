import { Tarea } from './module/gestiona-tareas/interfaces/tarea';
import { TareaService } from './module/gestiona-tareas/services/tarea.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoKiss';
  mostrarFormReg:boolean=false;

  task_complete:Tarea[]=[];
  task_incomplete:Tarea[]=[];

  constructor(public tareaService:TareaService){
    this.getDataForm();
  }

  getDataForm(){
    this.tareaService.getTareas.subscribe(tareas => {
     // console.log('tareas del padre ==>');
     // console.log(tareas);
      this.listaTareas = tareas;
      this.task_complete=this.listaTareas.filter(tarea => tarea.estado==true);
      this.task_incomplete=this.listaTareas.filter(tarea => tarea.estado==false);
    })
  }

  comunicaEstadoEditar(flagEditar:boolean){
    this.estadoEditar=flagEditar;
  }

  listaTareas:Tarea[]=[];
  estadoEditar:boolean=false;
  async addDataForm(tarea:Tarea){
    if(this.estadoEditar === false){
      //this.listaTareas= this.tareaService.getTareas;
      //obs antes
      // await this.tareaService.getTareas.subscribe(tareas => {
      //   console.log(tareas);
      //   this.listaTareas = tareas;
      // });
      
      //OJO ya no deberiamos manejar id
      tarea.id = await this.listaTareas[this.listaTareas.length-1].id + 1;
      
      await this.tareaService.addTarea(tarea);
      //console.log('agregado al firebase ',response);
    } else {
      //codigo editar
      this.tareaService.editTarea(tarea);  
      this.estadoEditar=false;
    }
    this.getDataForm();
  }

  recibeInfoAgregarTarea(dato:boolean){
    this.mostrarFormReg=dato;
    
  }

  quitarRegistroForm(flagcito:boolean){
    this.mostrarFormReg=flagcito;
  }

  recibeIdEliminarTarea(id:number){
    this.tareaService.deleteTarea(id);
    this.getDataForm();
  }

  recibeEstadoTarea(datos : {evento:boolean,id:number}){

    //console.log(' ===> ',datos);
    //console.log(datos.evento,' === ',datos.id);
    //console.log(datos.id);

    this.tareaService.editEstadoTarea(datos);

    this.getDataForm();
  }

}
