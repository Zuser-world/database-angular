// Usando la version 15 de Angular y la 7.5 de FireBase

// import { inject, Injectable } from '@angular/core';
// import { Firestore, collection, DocumentReference, addDoc  ,collectionSnapshots } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';



// @Injectable({
//   providedIn: 'root'
// })
// export class EmpleadoService {
//   private firestore : Firestore = inject(Firestore);
//   constructor(
    
//   ) { }
//   agregarEmpleado(empleado: any): Promise <any>{
//     const ref = collection(this.firestore, 'empleados');
//     return addDoc(ref, empleado).then((documentReference: DocumentReference) => {
//     console.log("DocumentReference: " + documentReference.firestore.app.options.appId)
//       // console.log(documentReference.parent)
//     });
//   }

//   getEmpleados(): Observable<any>{
//     const ref = collection(this.firestore, 'empleados');
//     return collectionSnapshots(ref); 
//   }
//   eliminarEmpleado(id: any){

// }

// }
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private firestore: AngularFirestore,
  ) { }
  agregarEmpleado(empleado: any): Promise <any>{
    return this.firestore.collection('empleados').add(empleado);
    };
  
  getEmpleados(): Observable<any>{
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  eliminarEmpleado(id: any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).delete();
  }  
  editEmpleado(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }
  changeinfo(id: string, data: any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data);
  }
}




