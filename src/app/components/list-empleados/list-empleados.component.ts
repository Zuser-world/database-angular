// Usando la version 15 de Angular y la 7.5 de FireBase

// import { Component, inject, OnInit } from '@angular/core';
// import { collection, collectionData, Firestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { EmpleadoService } from 'src/app/services/empleado.service';

// @Component({
//   selector: 'app-list-empleados',
//   templateUrl: './list-empleados.component.html',
//   styleUrls: ['./list-empleados.component.css']
// })
// export class ListEmpleadosComponent implements OnInit {
//   //  users$: Observable<any[]>;
//   empleados : any[] = [];
  
//   constructor (
//     private empleadoService: EmpleadoService,
//   ){
//     // const userProfileCollection = collection(this.firestore, 'users');
//     // this.users$ = collectionData(userProfileCollection) as Observable<any[]>;
//   }
  
//   ngOnInit(): void {
//     this.getEmpleados()

//   }

//   getEmpleados(){
//     console.log("hola")
//     this.empleadoService.getEmpleados().subscribe(data => {
//     this.empleados = []
//       data.forEach((elemet:any) => {
//         elemet
//         // console.log(elemet.id)
//         this.empleados.push({
//           id: elemet.id,
//           ...elemet.data()
//         })
//       })
//     })
//     console.log(this.empleados)
//   }
//   eliminarEmpleado(id: string) {
//     console.log(`El ID del Usuario a eliminar:\n==> ${id}`)
//     // this.empleadoService.eliminarEmpleado(id).then((data) => {
//     //   console.log("Data")
//     //   console.log(data)
//     // })
//     let info = this.empleadoService.eliminarEmpleado(id)
//     console.log(info)
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  //  users$: Observable<any[]>;
  empleados : any[] = [];
  
  constructor (
    private empleadoService: EmpleadoService,
    private toastr: ToastrService,
    private router: Router,
  ){
    // const userProfileCollection = collection(this.firestore, 'users');
    // this.users$ = collectionData(userProfileCollection) as Observable<any[]>;
  }
  
  ngOnInit(): void {
    this.getEmpleados()

  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe(data => {
    this.empleados = []
      data.forEach((elemet:any) => {
        // console.log(elemet.id)
        this.empleados.push({
          id: elemet.payload.doc.id,
          ...elemet.payload.doc.data()
        })
      })
    })
  }
  eliminarEmpleado(id: string) {
    console.log(`El ID del Usuario a eliminar:\n==> ${id}`)
    // this.empleadoService.eliminarEmpleado(id).then((data) => {
    //   console.log("Data")
    //   console.log(data)
    // })
    this.empleadoService.eliminarEmpleado(id).then(() => {
      this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', { 
        positionClass: 'toast-bottom-right'
      })
      console.log("empleado eliminado con exito")
    }).catch((error) => {
      console.log(error)
    })
  }
}
