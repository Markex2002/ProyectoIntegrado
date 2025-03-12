import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {DatabaseServiceService, Empresa, Oferta_trabajo} from '../../../services/database-service.service';
import {UserLoginService} from '../../../services/user-login.service';
import { format } from 'date-fns';


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

  formatDate = (date: Date): string => format(date, 'yyyy-MM-dd-HH:mm:ss');


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
        inscripcionHasta: ['', [Validators.required, this.noPastDateValidator]],
      },
      { validators: this.minLessThanMaxValidator }
    );
  }

  //Validador para asegurarnos de que no se elija una fecha anterior a la actual
  noPastDateValidator(control: AbstractControl) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);
    return selectedDate >= today ? null : { pastDate: true };
  }

  /** Custom Validator: Ensures salarioBrutoMin < salarioBrutoMax */
  minLessThanMaxValidator(group: AbstractControl): ValidationErrors | null {
    const min = group.get('salarioBrutoMin')?.value;
    const max = group.get('salarioBrutoMax')?.value;
    if (min !== null && max !== null && min > max) {
      return { minGreaterThanMax: true };
    }
    return null;
  }




  submit(){
    this.aviso= '' ;
    if (this.crearOfertaForm.valid) {
      //Creamos la Oferta con los datos y la mandamos a la Database
      const newOferta: Oferta_trabajo = this.crearOfertaForm.value;
      newOferta.fechaPublicacion = new Date();
      //Insertamos la Empresa en la Oferta
      if (this.loggedInEmpresa) {
        newOferta.empresa = this.loggedInEmpresa;
      }

      //Enviamos la nueva oferta a la base de datos
      this.databaseService.createOferta(newOferta).subscribe(() => {
        this.crearOfertaForm.reset();
      })
      //Volvemos a Usuario
      this.router.navigate(['/usuario']).then(() => {
        window.location.reload();
      });

    } else {
      //En caso de que falle la validacion
      console.log("Fallo validacion")
      if (this.crearOfertaForm.get('salarioBrutoMin')?.value > this.crearOfertaForm.get('salarioBrutoMax')?.value) {
        this.aviso = 'El salario Bruto Min no debe ser mayor que el Maximo.';
      } else if (this.crearOfertaForm.get('email')?.hasError('pattern')) {
        this.aviso = 'Por favor, introduzca un correo electrónico válido.';
      } else {
        this.aviso = "Por favor rellene todos los campos";
      }
      return;
    }
  }





}
