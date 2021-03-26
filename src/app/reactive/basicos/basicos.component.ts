import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('Metallica'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5)
  // })
  // Como de estaforma es un coñazo vamos a definir el formulario importando
  // el servicio FormBuilder:

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.miFormulario.setValue({
    //   nombre: 'Metallica',
    //   precio: 23,
    //   existencias: 12
    // }) En vez de usar el setValue mejor usar el reset,
    // setValue me obliga a mandar el objeto con todas sus propiedades

    this.miFormulario.reset({
      nombre: 'Metallica',
      precio: 23

    })

  }

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)],  ],
    //el 2º argumento serían validaciones y el 3º validaciones asíncronas
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  })

  campoValido(campo: string){
    return this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched
  }

  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.miFormulario.reset();
    console.log(this.miFormulario.value)
  }

}
