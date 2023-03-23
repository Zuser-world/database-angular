import { Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, DocumentReference, Firestore, doc, addDoc, CollectionReference } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';




@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado : FormGroup;
  submitted = false;
  loading : boolean = false;
  firestore : Firestore = inject(Firestore);
  usersCollection: CollectionReference | any;
  constructor (
  private fb: FormBuilder,
  private empleadoservice: EmpleadoService,
  private router: Router,
  private toastr: ToastrService,
  // private firestore: AngularFirestore,
  ){
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    })
    // const productosCollection = collection(firestore, 'productos');
    // firestore.collection('tabla').add({
    //   nombre : "patata",
    //   apellido: "caca",
    //   edad: 23,
    // })
    // productosCollection
  }
  ngOnInit(): void {}
  agregarEmpleado(){
    this.submitted = true;
    const nombre = this.createEmpleado.value.nombre;
    const apellido = this.createEmpleado.value.apellido;
    const documento = this.createEmpleado.value.documento;
    const salario = this.createEmpleado.value.salario;
    if (this.createEmpleado.invalid){
      return;
    }
    const empleado: any = {
      nombre : nombre,
      apellido : apellido,
      documento : documento,
      salario : salario,
      fechaCreacion : new Date(),
      fechaActualizacion : new Date(),
    }
    // // Name DataBase
    // const ref = collection(this.firestore, 'users');
    // // Add DataBase
    // addDoc(ref, empleado).then((documentReference: DocumentReference) => {
    //       console.log(documentReference.firestore.app.name)
    //   });
    this.loading = true;
    this.empleadoservice.agregarEmpleado(empleado).then(() => {
      
      this.toastr.success("El empleado fue registrado con exito", "Empleado Registrado",{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados'])
    }).catch((err) => {
      console.log(err.message)
      this.loading = false
    })
  }
}




