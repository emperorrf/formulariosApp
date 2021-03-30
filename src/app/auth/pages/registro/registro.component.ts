import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
//import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.required) {
      return 'El email es obligatorio.'
    }else if(errors?.pattern){
      return 'El valor ingresado no tiene formato de correo'
    }else if(errors?.emailTomado){
      return 'El email ya fue tomado'
    }
    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Ricardo Rodriguez',
      email: 'test1@test.com',
      username: 'emperorrf',
      password: 123456,
      password2: 123456
    })
  };

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.vs.nombreApellidoPattern )]],
    email: ['', [Validators.required, Validators.pattern( this.vs.emailPattern )], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },
  { //este 2º objeto son validaciones que se aplican a todo el formulario
    validators: [ this.vs.camposIguales('password', 'password2')]
  })

  campoValido( campo: string ){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
