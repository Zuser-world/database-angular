import { inject, Injectable } from '@angular/core';
import { Firestore, collection, DocumentReference, addDoc  ,collectionSnapshots } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private firestore : Firestore = inject(Firestore);
  constructor(
    
  ) { }
  agregarEmpleado(empleado: any): Promise <any>{
    const ref = collection(this.firestore, 'empleados');
    return addDoc(ref, empleado).then((documentReference: DocumentReference) => {
    console.log("DocumentReference: " + documentReference.firestore.app.options.appId)
      // console.log(documentReference.parent)
    });
  }

  getEmpleados(): Observable<any>{
    const ref = collection(this.firestore, 'empleados');
    
    return collectionSnapshots(ref, ); 
  }
  eliminarEmpleado(id: any){
    const ref = collection(this.firestore, 'empleados');
    return ""
}

}
