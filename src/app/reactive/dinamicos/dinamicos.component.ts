import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  constructor( private fb: FormBuilder ) {}

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Gods of war', Validators.required],
      ['Space terror', Validators.required]
    ], Validators.required)
  });

  get favoritosArray(){
    //console.log(this.miFormulario.get('favoritos'));
    return this.miFormulario.get('favoritos') as FormArray;
  }

  campoValido( campo: string ){
    return this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched
  }

  // Definimos la parte de agregar
  nuevoFavorito: FormControl = this.fb.control('', Validators.required);
  agregarFavorito(){
    if ( this.nuevoFavorito.invalid ) {return}

    //this.favoritosArray.push( new FormControl (this.nuevoFavorito.value, Validators.required));
    /*Lo mismo que arriba*/this.favoritosArray.push( this.fb.control (this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();

  }
  // Fin parte de agregar

  borrar( indice: number ){
    this.favoritosArray.removeAt( indice );
  }

  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)
  }

}
