import { doc, Firestore, addDoc, collection, collectionData,getFirestore } from '@angular/fire/firestore';
import { Tarea } from './../interfaces/tarea';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { initializeApp } from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class TareaService {
  db:any= {};
  coleccionTareas: any;
  constructor(private firestore:Firestore ) { 
    this.coleccionTareas = collection(this.firestore,'tareasList');    
    
    const firebaseConfig = {
        projectId: 'todoliss-1cab9',
        appId: '1:779080888087:web:fb8415730ba0f9510a9152',
        storageBucket: 'todoliss-1cab9.appspot.com',
        apiKey: 'AIzaSyBqgCq8oUH6BOfes373POlkWzVqf8Zqges',
        authDomain: 'todoliss-1cab9.firebaseapp.com',
        messagingSenderId: '779080888087',
      
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  
  // Initialize Cloud Firestore and get a reference to the service
  this.db = getFirestore(app);
  

  }

  // public lista_tareas:Tarea[]=[
  //   {
  //     id:1,
  //     titulo:'Comprar viveres',
  //     proyecto_name:'Proyecto 1',
  //     prioridad:2,
  //     fecha: '2023-07-19',
  //     estado: false
  //   },
  //   {
  //     id:3,
  //     titulo:'Estudiar angular',
  //     proyecto_name:'inbax',
  //     prioridad:3,
  //     fecha: '2023-07-14',
  //     estado: true
  //   },
  //   {
  //     id:5,
  //     titulo:'Cocinar',
  //     proyecto_name:'inbax',
  //     prioridad:1,
  //     fecha: '2023-07-13',
  //     estado: true
  //   },
  //   {
  //     id:6,
  //     titulo:'Ejecutar scripts mongo',
  //     proyecto_name:'inbax',
  //     prioridad:3,
  //     fecha: '2023-07-13',
  //     estado: true
  //   },
  //   {
  //     id:10,
  //     titulo:'Sacar dinero',
  //     proyecto_name:'inbax',
  //     prioridad:1,
  //     fecha: '2023-07-20',
  //     estado: false
  //   },
  //   {
  //     id:11,
  //     titulo:'Ir al banco',
  //     proyecto_name:'Proyecto 2',
  //     prioridad:2,
  //     fecha: '2023-07-21',
  //     estado: false
  //   }
  // ];

  
  get getTareas():Observable<Tarea[]>{
    /*
      .pipe(
        map((doc: DocumentSnapshot<any>) => {
          // Verificar si el documento existe antes de obtener el ID
          if (doc.payload.exists) {
            return doc.payload.id;
          } else {
            throw new Error('El documento no existe en la colección.');
          }
        })
    */
    return collectionData(this.coleccionTareas, {idField:'id'}) as Observable<Tarea[]> 
     //this.lista_tareas //ojo aqui añadi antes
  }



  addTarea(detasc:Tarea){
    return addDoc(this.coleccionTareas,detasc);
    //this.lista_tareas.push(detasc);
  }
  
  indiceEliminar:number=0;
  deleteTarea(id:number) {
    
  /*  this.indiceEliminar = this.lista_tareas.findIndex(tarea=> tarea.id == id);
    this.lista_tareas.splice(this.indiceEliminar,1);
*/
    //elimina tarea mediante filtro
    //this.lista_tareas = this.lista_tareas.filter(tarea=> tarea.id != id);
    //console.log(this.lista_tareas.findIndex(tarea=> tarea.id == id));
  }

  tareaModificar:Tarea={
    id:0,
    titulo:'',
    proyecto_name:'',
    prioridad:0,
    fecha: '',
    estado: false
  };

  setDatosModificar(tarea:Tarea){
    this.tareaModificar=tarea;
  }

  getDatosModificar():Tarea{
    return this.tareaModificar;
  }

  indiceEditar:number=0;
  editTarea(tarea:Tarea){    
 /*   this.indiceEditar = this.lista_tareas.findIndex(task=> task.id == tarea.id);
    this.lista_tareas[this.indiceEditar]=tarea; */
    console.log('editTarea hace =>',tarea)
    //this.listar_tareas[4]=tareaeDITADA;
  }

  
  editEstadoTarea(datos:{evento:boolean,id:number}){       //this.collection.doc('asfasfasfas').update({estado:true})
    // tutorialsRef.doc('id').update({ title: 'zkoder new Tut#1' });
    
//    const docRef = this.firestore.collection('testCollection', ref => ref.where("field", "==", this.secondForm.value.valueToGet));

    //const docRef = this.firestore.collection('tareasList',ref => ref.where("id","==",datos.id));
    this.db.collection('tareasList').doc(datos.id).update({estado:datos.evento});
   // console.log('en editEstadoTarea se recibe el estado del check=> ', datos.evento);
    //console.log('en editEstadoTarea se recibe el id=> ', datos.id);
    /*collection(this.firestore,'tareasList');  */
  }

}
