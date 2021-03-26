import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit{

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.miFormulario.setValue( this.persona );
    // setValue funciona sólo mientras perosona y miFormulario tengan las misma propiedades
    this.miFormulario.reset( {
      ...this.persona,
      condiciones: false} );
      // Manda una copia del objeto persona y le añado las condiciones,
      // aunque no estaría obligado, si no se las mando al inicio el condiciones tiene el valor null

      //Para el caso de que quiera que el objeto Persona cambie a la vez que cambio el formulario:
      // this.miFormulario.valueChanges.subscribe( form => {
      //   delete form.condiciones;
      //   this.persona = form;
      // });
      //Usando la desestructuración
      this.miFormulario.valueChanges.subscribe( ({condiciones, ...resto }) => {
        this.persona = resto; //quito las condiciones y guardo el resto en persona
      })
  }

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  guardar(){
    const formValue = {...this.miFormulario.value};
    //delete formValue.condiciones; ... si fuese el caso
    this.persona = formValue;

  }

}
