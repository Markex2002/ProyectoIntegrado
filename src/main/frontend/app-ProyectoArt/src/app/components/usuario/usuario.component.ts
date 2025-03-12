import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserLoginService} from '../../services/user-login.service';
import {
  Artista,
  DatabaseServiceService,
  Empresa,
  Imagen,
  Oferta_trabajo
} from '../../services/database-service.service';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RebuildService} from '../../services/rebuild.service';

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
  //Atributos Artista
  loggedInArtista: Artista | null = null;
  isArtista: boolean = false;
  imagenesArtista: Imagen[] = [];
  portfolioVisible: boolean = false;

  //Atributos Empresa
  loggedInEmpresa: Empresa | null = null;
  isEmpresa: boolean = false;
  ofertasEmpresa: Oferta_trabajo[] = [];


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
    new FormControl('', [Validators.required,Validators.min(0) , Validators.minLength(9), Validators.maxLength(9)]);
  nombreEmpresaControl =
    new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  nombreRepresentanteControl =
    new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]);

  //CREAR_OFERTA


  constructor(
    protected userService: UserLoginService,
    protected databaseService: DatabaseServiceService,
    protected rebuildService: RebuildService,
  ){}



  ngOnInit(): void{
    //Comprobamos si el usuario que ha iniciado sesion es un Artista o una Empresa
    if (this.userService.userType == 'artista'){
      this.isArtista = true;
      this.loggedInArtista = this.userService.getArtista();
      //Cargamos las imagenes del Artista
      this.databaseService.getAllImagenes().subscribe((data: Imagen[]) => {
        this.imagenesArtista = data.filter(imagen =>
          imagen.artista?.id == this.loggedInArtista?.id
        );
      });
    } else if (this.userService.userType == 'empresa'){
      this.isEmpresa = true;
      this.loggedInEmpresa = this.userService.getEmpresa();

      //CARGAMOS LAS OFERTAS DE LA EMPRESA
      this.databaseService.getAllOfertas().subscribe((data: Oferta_trabajo[]) => {
        this.ofertasEmpresa = data.filter(oferta =>
          oferta.empresa?.id == this.loggedInEmpresa?.id
        );
      });
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
  editandoRepresentante: boolean = false;
  editandoNombreEmpresa: boolean = false;
  //METODOS
  activarEdicionTelefono() {
    this.editandoNumTelefono = true;
    this.editandoRepresentante = false;
    this.editandoNombreEmpresa = false;
  }
  activarEdicionRepresentante() {
    this.editandoNumTelefono = false;
    this.editandoRepresentante = true;
    this.editandoNombreEmpresa = false;
  }
  activarEdicionNombreEmpresa() {
    this.editandoNumTelefono = false;
    this.editandoRepresentante = false;
    this.editandoNombreEmpresa = true;
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
      this.databaseService.updateArtista(this.loggedInArtista).subscribe(() => {
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
      } else if(this.editandoRepresentante){
        if (this.nombreRepresentanteControl.valid){
          this.loggedInEmpresa.nombreRepresentante = String(this.nombreRepresentanteControl.value);
        } else {
          alert("Por favor, ingrese un nombre Válido");
        }
      } else if(this.editandoNombreEmpresa){
        if (this.nombreEmpresaControl.valid){
          this.loggedInEmpresa.nombreEmpresa = String(this.nombreEmpresaControl.value);
        } else {
          alert("Por favor, ingrese un nombre Válido");
        }
      }

      //MANDAMOS LOS DATOS RECIBIDOS DE LA EMPRESA, HAYA O NO HABIDO CAMBIOS
      this.databaseService.updateEmpresa(this.loggedInEmpresa).subscribe(() => {
        console.log('Empresa Actualizada actualizada satisfactoriamente!');
      })
      this.userService.setUser(this.loggedInEmpresa);
    }
    window.location.reload();
  }




  verPortfolio(){
    this.portfolioVisible = true;
  }

  ////////////METODO SUBIR IMAGENES///////////
  avisoImagen = "";
  upload(event: any){
    const file = event.target.files[0];

    //Comprobamos que se halla enviado un archivo
    if (file){
      // Get file type and name
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      const fileType = file.type;
      // Validate file type
      if (!allowedTypes.includes(fileType)) {
        this.avisoImagen = "Formato de archivo no permitido. Solo se aceptan .png, .jpg y .gif";
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      //Con el archivo que hemos recibido, vamos a crear un nuevo Objeto de la clase IMAGEN
      const imagenNueva: Imagen = {
        url: "/assets/media/" + file.name,
        artista: this.loggedInArtista
      };

      //Guardamos en el Repositorio la clase Imagen creada
      this.databaseService.createImagen(imagenNueva).subscribe(response =>
        console.log('response', response))
      //Mandamos el Archivo a la carpeta Assets
      this.databaseService.uploadFile(formData).subscribe(response =>
        console.log('response', response))

      this.rebuildService.triggerRebuild();

      setTimeout(() => {
        window.location.reload();
      }, 300)
      alert("Imagen subida correctamente")
    } else {
      this.avisoImagen = "Por favor, adjunte un archivo de tipo .png, .jpg o .gif";
    }
  }


  //METODO PARA ELIMINAR UNA IMAGEN DE ARTISTA
  deleteImage(imageId: number | undefined) {
    this.databaseService.deleteImage(imageId).subscribe(
      {next: (() => {}),
        error:  ((error:any) => {
          console.log('Error eliminar Imagen', error);
        })});

    window.location.reload();
  }


  //METODO PARA ELIMINAR UNA OFERTA DE EMPRESA
  deleteOferta(imageId: number | undefined) {
    this.databaseService.deleteOferta(imageId).subscribe(
      {next: (() => {}),
        error:  ((error:any) => {
          console.log('Error eliminar Oferta', error);
        })});

    window.location.reload();
  }
}
