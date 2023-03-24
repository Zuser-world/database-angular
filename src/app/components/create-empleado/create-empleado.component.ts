import { Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, DocumentReference, Firestore, doc, addDoc, CollectionReference } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string | null;
  title: string = "Crear Empleado";
  type: string = "Agregar"

  constructor (
  private fb: FormBuilder,
  private empleadoservice: EmpleadoService,
  private router: Router,
  private toastr: ToastrService,
  private aRoute: ActivatedRoute,
  // private firestore: AngularFirestore,
  ){
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(80)]],
      nickname: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],

    })
    // Hacemos uso de una clase para poder tomar el id que se envia por el enlace.
    // La Clase se llama ActivatedRoute.
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }
  ngOnInit(): void {
    this.editar()
  }
  agregarEmpleado(){
    this.submitted = true;
    if (this.id === null){
      this.agregar();
    } else {
      this.editarEmpleado(this.id);
    }
  }
  agregar(){
    console.log(this.createEmpleado)
    const nombre = this.createEmpleado.value.nombre;
    const apellido = this.createEmpleado.value.apellido;
    const edad = this.createEmpleado.value.edad;
    const nickname = this.createEmpleado.value.nickname;
    const email = this.createEmpleado.value.email;
    if (this.createEmpleado.invalid){
      return;
    }

    const empleado: any = {
      nombre : nombre,
      apellido : apellido,
      edad : edad,
      nickname : nickname,
      email: email,
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
  editarEmpleado(id: string){
    this.loading = true;
    const nombre = this.createEmpleado.value.nombre;
    const apellido = this.createEmpleado.value.apellido;
    const edad = this.createEmpleado.value.edad;
    const nickname = this.createEmpleado.value.nickname;
    const email = this.createEmpleado.value.email;

    const empleado: any = {
      nombre : nombre,
      apellido : apellido,
      edad : edad,
      nickname : nickname,
      email: email,
      fechaActualizacion : new Date(),
    }
    this.empleadoservice.changeinfo(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info("Empleado fue modificado con exito", "Modificado",{
        positionClass : 'toast-bottom-right',
      })
      this.router.navigate(['/list-empleados'])
    })
  }


  editar(){
    // Relleno de la Información a partir de la Base de Datos  
    if (this.id !== null){
      this.loading = true;
      this.title = "Editar Empleado"
      this.type = "Cambiar"
      this.empleadoservice.editEmpleado(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['nombre'])
        // Rellenar los campos del Formulario creado previamente.
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          edad: data.payload.data()['edad'],
          nickname: data.payload.data()['nickname'],
          email: data.payload.data()['email'],
        })
      })
    }
  }
}




