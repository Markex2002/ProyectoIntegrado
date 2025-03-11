import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseServiceService} from '../../../../services/database-service.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnInit {
  userId!: number;
  usuario: any = {};
  aviso:string = "";

  //Formularios
  editarArtistaForm: FormGroup;
  editarEmpresaForm: FormGroup;
  editarAdminForm: FormGroup;

  //Condicionales
  esArtista: boolean = false;
  esEmpresa: boolean = false;
  esAdmin: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private databaseService: DatabaseServiceService) {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/;

    //ARTISTA//
    this.editarArtistaForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      nombre: ['', [Validators.minLength(4), Validators.maxLength(20)]],
      yearsOfExperience: ['', [Validators.min(0), Validators.max(99)]],
      //idiomasHablados: ['', Validators.required],
      //portfolio: ['', Validators.required],
      //ofertasTrabajo: ['', Validators.required],
      descripcionCorta: ['', Validators.required],
      descripcionLarga: ['', Validators.required],
      //categorias: ['', Validators.required],
      //id_oferta: ['', Validators.required]
    });

    //EMPRESA//
    this.editarEmpresaForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      nombreEmpresa: ['', Validators.required],
      numTlf: ['', Validators.required],
      nombreRepresentante: ['', Validators.required],
      //listadoOfertas: ['', Validators.required]
    });

    //ADMIN//
    this.editarAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Conseguimos la Id del Usuario que estamos Editando
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    //Buscamos al Usuario que hemos seleccionado por su ID
    this.databaseService.finduser(this.userId).subscribe(data => {
      this.usuario = data;

      //COMPROBAMOS QUE TIPO DE USUARIO ES
      if ('yearsOfExperience' in this.usuario) {
        this.esArtista = true;
        //Insertamos los datos del Usuario en el Formulario para mayor facilidad de Visualizacion
        this.editarArtistaForm.patchValue({
          username: this.usuario.username,
          //password: this.usuario.password,
          email: this.usuario.email,
          nombre: this.usuario.nombre,
          yearsOfExperience: this.usuario.yearsOfExperience,
          descripcionCorta: this.usuario.descripcionCorta,
          descripcionLarga: this.usuario.descripcionLarga,
        });
      } else if ('nombreEmpresa' in this.usuario) {
        this.esEmpresa = true;
        this.editarEmpresaForm.patchValue({
          username: this.usuario.username,
          //password: this.usuario.password,
          email: this.usuario.email,
          nombreEmpresa: this.usuario.nombreEmpresa,
          numTlf: this.usuario.numTlf,
          nombreRepresentante: this.usuario.nombreRepresentante,
        });
      } else if ('privilegeLevel' in this.usuario){
        this.esAdmin = true;
        this.editarAdminForm.patchValue({
          username: this.usuario.username,
          //password: this.usuario.password,
          email: this.usuario.email,
          nombre: this.usuario.nombre,
        });
      }
    });
  }




  //METODOS PARA RECIBIR Y ENVIAR LOS DATOS DE LOS FORMULARIOS
  submitArtista() {
    if (this.editarArtistaForm.valid) {
      //Insertamos los nuevos datos
      const updatedArtista = this.editarArtistaForm.value;
      updatedArtista.id = this.usuario.id;

      this.databaseService.updateArtista(updatedArtista).subscribe(() => {
        window.location.reload();
      });
    } else {
      //En caso de que falle la validacion
      if (this.editarArtistaForm.get('email')?.hasError('pattern')) {
        this.aviso = 'Por favor, introduzca un correo electrónico válido.';
      } else if ((this.editarArtistaForm.get('password')?.value.length < 6 || this.editarArtistaForm.get('password')?.value.length > 60) && this.editarArtistaForm.get('password')?.value.length != 0) {
        this.aviso = 'La contraseña debe tener entre 6 y 60 carácteres.';
      } else if (this.editarArtistaForm.get('nombre')?.value.lenght < 4 || this.editarArtistaForm.get('nombre')?.value.lenght > 20) {
        this.aviso = 'Su nombre no debe tener menos de 4 carácteres o mas de 20.';
      } else if (this.editarArtistaForm.get('yearsOfExperience')?.value < 0 || this.editarArtistaForm.get('yearsOfExperience')?.value > 99) {
        this.aviso = 'Sus años de Experiencia no puede ser un número negativo o Mayor de 99.';
      } else {
        this.aviso = "Por favor rellene todos los campos";
      }
    }
  }

  submitEmpresa() {
    if (this.editarEmpresaForm.valid) {
      //Insertamos los nuevos datos
      const updatedEmpresa = this.editarEmpresaForm.value;
      updatedEmpresa.id = this.usuario.id;

      this.databaseService.updateEmpresa(updatedEmpresa).subscribe(() => {
        window.location.reload();
      });
    } else {
      //En caso de que falle la validacion
      if (this.editarEmpresaForm.get('email')?.hasError('pattern')) {
        this.aviso = 'Por favor, introduzca un correo electrónico válido.';
      } else if ((this.editarEmpresaForm.get('password')?.value.length < 6 || this.editarEmpresaForm.get('password')?.value.length > 60) && this.editarEmpresaForm.get('password')?.value.length != 0) {
        this.aviso = 'La contraseña debe tener entre 6 y 60 carácteres.';
      } else {
        this.aviso = "Por favor rellene todos los campos";
      }
    }
  }




  submitAdmin() {
    if (this.editarAdminForm.valid) {
      //Insertamos los nuevos datos
      const updatedAdmin = this.editarAdminForm.value;
      updatedAdmin.id = this.usuario.id;
      updatedAdmin.privilegeLevel = this.usuario.privilegeLevel;

      this.databaseService.updateAdministrador(updatedAdmin).subscribe(() => {
        window.location.reload();
      });
    } else {
      //En caso de que falle la validacion
      if (this.editarAdminForm.get('email')?.hasError('pattern')) {
        this.aviso = 'Por favor, introduzca un correo electrónico válido.';
      } else if ((this.editarAdminForm.get('password')?.value.length < 6 || this.editarAdminForm.get('password')?.value.length > 60) && this.editarAdminForm.get('password')?.value.length != 0) {
        this.aviso = 'La contraseña debe tener entre 6 y 60 carácteres.';
      } else {
        this.aviso = "Por favor rellene todos los campos";
      }
    }
  }
}
