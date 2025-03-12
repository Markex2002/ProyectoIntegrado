import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {DatabaseServiceService, Empresa, Oferta_trabajo} from '../../../services/database-service.service';
import {UserLoginService} from '../../../services/user-login.service';

@Component({
  selector: 'app-crear-oferta',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './crear-oferta.component.html',
  styleUrl: './crear-oferta.component.scss'
})
export class CrearOfertaComponent implements OnInit{
  //Atributos
  loggedInEmpresa: Empresa | null = null;
  crearOfertaForm: FormGroup;
  aviso:string = "";

  ngOnInit(): void {
    //Cargamos la Empresa Logeada
    this.loggedInEmpresa = this.userService.getEmpresa();
  }

  constructor(
    protected databaseService: DatabaseServiceService,
    protected userService: UserLoginService,
    private fb: FormBuilder,
    private router: Router,){

    this.crearOfertaForm = this.fb.group(
      {
        nombrePuesto: ['', Validators.required],
        salarioBrutoMin: ['', [Validators.required, Validators.min(0)]],
        salarioBrutoMax: ['', [Validators.required, Validators.min(0)]],
        avaiablePositions: ['', [Validators.required, Validators.min(0)]],
        duracionJornada: ['', [Validators.required, Validators.min(0)]],
        descripcionPuesto: ['', [Validators.required, Validators.minLength(0)]],
        fechaPublicacion: ['', [Validators.required]],
        inscripcionHasta: ['', [Validators.required]],
      },
      {}
    );
  }





  submit(){
    this.aviso= '' ;
    if (this.crearOfertaForm.valid) {
      //Creamos la Oferta con los datos y la mandamos a la Database
      const newOferta: Oferta_trabajo = this.crearOfertaForm.value;
      //Insertamos la Empresa en la Oferta
      if (this.loggedInEmpresa) {
        newOferta.empresa = this.loggedInEmpresa;
      }
      this.databaseService.createOferta(newOferta).subscribe(() => {
        this.crearOfertaForm.reset();
      })

      //Volvemos a Usuario
      this.router.navigate(['/usuario']).then(() => {
        window.location.reload();
      });
    } else {
      //En caso de que falle la validacion
      if (this.crearOfertaForm.hasError('passwordMismatch')) {
        this.aviso = 'Las contraseñas no coinciden.';
      } else if (this.crearOfertaForm.get('email')?.hasError('pattern')) {
        this.aviso = 'Por favor, introduzca un correo electrónico válido.';
      } else if (this.crearOfertaForm.get('password')?.value !== this.crearOfertaForm.get('confirmPassword')?.value) {
        this.aviso = 'Las contraseñas no coinciden.';
      } else if (this.crearOfertaForm.get('password')?.value.length < 6 || this.crearOfertaForm.get('password')?.value.length > 60) {
        this.aviso = 'La contraseña debe tener entre 6 y 60 carácteres.';
      } else if (this.crearOfertaForm.get('nombre')?.value.lenght < 4 || this.crearOfertaForm.get('nombre')?.value.lenght > 20) {
        this.aviso = 'Su nombre no debe tener menos de 4 carácteres o mas de 20.';
      } else if (this.crearOfertaForm.get('yearsOfExperience')?.value < 0 || this.crearOfertaForm.get('yearsOfExperience')?.value > 99) {
        this.aviso = 'Sus años de Experiencia no puede ser un número negativo o Mayor de 99.';
      } else if (this.crearOfertaForm.get('nombreEmpresa')?.value.length < 4 || this.crearOfertaForm.get('nombreEmpresa')?.value.length > 20) {
        this.aviso = 'Su nombre de Empresa no debe tener menos de 4 carácteres o mas de 20.';
      } else if (this.crearOfertaForm.get('nombreRepresentante')?.value.lenght < 4 || this.crearOfertaForm.get('nombreRepresentante')?.value.lenght > 20) {
        this.aviso = 'Su nombre de Representante no debe tener menos de 4 carácteres o mas de 20.';
      } else {
        this.aviso = "Por favor rellene todos los campos";
      }
      return;
    }
  }





}
