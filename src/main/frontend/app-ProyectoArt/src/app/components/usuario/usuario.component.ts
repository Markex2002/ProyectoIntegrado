import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserLoginService} from '../../services/user-login.service';
import {Artista, DatabaseServiceService, Empresa} from '../../services/database-service.service';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})

export class UsuarioComponent implements OnInit{
  //Atributos que nos sirven para almacenar los datos del usuario Logeado
  loggedInArtista: Artista | null = null;
  loggedInEmpresa: Empresa | null = null;
  isArtista: boolean = false;
  isEmpresa: boolean = false;



  //VALIDADORES DE FORMULARIOS
  //ARTISTA
  nombreArtistaControl =
    new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  tiempoExperienciaControl =
    new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]);
  descripcionCortaControl =
    new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(500)]);
  descripcionLargaControl =
    new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(1600)]);

  //EMPRESA
  numTelefonoControl =
    new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(12)]);


  constructor(
    protected userService: UserLoginService,
    protected databaseService: DatabaseServiceService,
  ){}



  ngOnInit(): void{
    //Comprobamos si el usuario que ha iniciado sesion es un Artista o una Empresa
    if (this.userService.userType == 'artista'){
      this.isArtista = true;
      this.loggedInArtista = this.userService.getArtista();
    } else if (this.userService.userType == 'empresa'){
      this.isEmpresa = true;
      this.loggedInEmpresa = this.userService.getEmpresa();
    }
  }


  //Activamos el modo edición
  //ARTISTAS
  editandoNombre: boolean = false;
  editandoTiempoExperiencia: boolean = false;
  editandoDescripcionCorta: boolean = false;
  editandoDescripcionLarga: boolean = false;
  //METODOS
  activarEdicionNombre() {
    this.editandoNombre = true;
    this.editandoTiempoExperiencia = false;
    this.editandoDescripcionCorta = false;
    this.editandoDescripcionLarga = false;
  }
  activarEdicionExperiencia() {
    this.editandoTiempoExperiencia = true;
    this.editandoNombre = false;
    this.editandoDescripcionCorta = false;
    this.editandoDescripcionLarga = false;
  }
  activarEdicionDescripcionCorta() {
    this.editandoTiempoExperiencia = false;
    this.editandoNombre = false;
    this.editandoDescripcionCorta = true;
    this.editandoDescripcionLarga = false;
  }
  activarEdicionDescripcionLarga() {
    this.editandoTiempoExperiencia = false;
    this.editandoNombre = false;
    this.editandoDescripcionCorta = false;
    this.editandoDescripcionLarga = true;
  }

  //EMPRESAS
  editandoNumTelefono: boolean = false;
  //METODOS
  activarEdicionTelefono() {
    this.editandoNumTelefono = true;
  }




  //Guardamos el campo modificado
  guardarCampo() {
    //Comporbamos que el campo que estamos editando es un Artista o una Empresa
    if (this.loggedInArtista){
      //Comprobamos cual es el campo que se ha editado
      if(this.editandoNombre){
        //Nos aseguramos de que el valor sea Valido
        if(this.nombreArtistaControl.valid){
          this.loggedInArtista.nombre = String(this.nombreArtistaControl.value);
        } else {
          alert("Por favor, ingresa un nombre Válido con un maximo de 20 carácteres");
        }
      } else if(this.editandoTiempoExperiencia){
        if(this.tiempoExperienciaControl.valid){
          this.loggedInArtista.yearsOfExperience = Number(this.tiempoExperienciaControl.value);
        } else{
          alert("Por favor, ingresa un número válido entre el 0 y el 99");
        }
      }
      else if(this.editandoDescripcionCorta){
        if(this.descripcionCortaControl.valid){
          this.loggedInArtista.descripcionCorta = String(this.descripcionCortaControl.value);
        } else{
          alert("Por favor, ingresa una descripción válida entre el 0 y 150 characteres");
        }
      }
      else if(this.editandoDescripcionLarga){
        //Nos aseguramos de que el valor sea Valido
        if(this.descripcionLargaControl.valid){
          this.loggedInArtista.descripcionLarga = String(this.descripcionLargaControl.value);
        } else{
          alert("Por favor, ingresa una descripción válida entre el 0 y 1600 characteres");
        }
      }

      //MANDAMOS LOS DATOS RECIBIDOS DEL ARTISTA, HAYA O NO HABIDO CAMBIOS
      this.databaseService.updateArtista(this.loggedInArtista).subscribe(res => {
        console.log('Artista Actualizado actualizada satisfactoriamente!');
      })
      this.userService.setUser(this.loggedInArtista);
    } else if (this.loggedInEmpresa){
      /////////////////CASO DE EMPRESA/////////////

      if(this.editandoNumTelefono){
        if (this.numTelefonoControl.valid){
          this.loggedInEmpresa.numTlf = Number(this.numTelefonoControl.value);
        } else {
          alert("Por favor, ingresa un Telefono Válido");
        }
      }



      //MANDAMOS LOS DATOS RECIBIDOS DE LA EMPRESA, HAYA O NO HABIDO CAMBIOS
      this.databaseService.updateEmpresa(this.loggedInEmpresa).subscribe(res => {
        console.log('Empresa Actualizada actualizada satisfactoriamente!');
      })
      this.userService.setUser(this.loggedInEmpresa);
    }

    window.location.reload();
  }
}
