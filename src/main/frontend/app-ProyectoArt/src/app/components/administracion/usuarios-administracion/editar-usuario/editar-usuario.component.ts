import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseServiceService, OfertaTrabajo, Usuario} from '../../../../services/database-service.service';
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
    private databaseService: DatabaseServiceService)
  {
    //ARTISTA//
    this.editarArtistaForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
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
      password: ['', Validators.required],
      email: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      numTlf: ['', Validators.required],
      nombreRepresentante: ['', Validators.required],
      //listadoOfertas: ['', Validators.required]
    });

    //ADMIN//
    this.editarAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
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
          password: this.usuario.password,
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
          password: this.usuario.password,
          email: this.usuario.email,
          nombreEmpresa: this.usuario.nombreEmpresa,
          numTlf: this.usuario.numTlf,
          nombreRepresentante: this.usuario.nombreRepresentante,
        });
      } else if ('privilegeLevel' in this.usuario){
        this.esAdmin = true;
        this.editarAdminForm.patchValue({
          username: this.usuario.username,
          password: this.usuario.password,
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
      console.log("Formulario inválido");
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
      console.log("Formulario inválido");
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
      console.log("Formulario inválido");
    }
  }
}
