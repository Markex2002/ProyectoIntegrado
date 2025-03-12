import { Component } from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {DatabaseServiceService} from '../../../../services/database-service.service';

@Component({
  selector: 'app-editar-idioma',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './editar-idioma.component.html',
  styleUrl: './editar-idioma.component.scss'
})
export class EditarIdiomaComponent {
  idiomaId!: number;
  idioma: any = {};
  aviso:string = "";

  //Formularios
  editarIdiomaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private databaseService: DatabaseServiceService) {

    //ARTISTA//
    this.editarIdiomaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //Conseguimos la Id del Idioma que estamos Editando
    this.idiomaId = Number(this.route.snapshot.paramMap.get('id'));

    //Buscamos al Usuario que hemos seleccionado por su ID
    this.databaseService.findIdioma(this.idiomaId).subscribe(data => {
      this.idioma = data;
      console.log(this.idioma)
    });
  }




  //METODOS PARA RECIBIR Y ENVIAR LOS DATOS DE LOS FORMULARIOS
  submitIdioma() {
    if (this.editarIdiomaForm.valid) {
      //Insertamos los nuevos datos
      const updatedIdioma = this.editarIdiomaForm.value;
      //Insertamos los antiguos o los que cambiamos nosotros
      updatedIdioma.id = this.idioma.id;
      updatedIdioma.ultimaActualizacion = new Date();
      updatedIdioma.ofertaTrabajo = this.idioma.ofertaTrabajo;


      this.databaseService.updateIdioma(updatedIdioma).subscribe(() => {
        window.location.reload();
      });
    } else {
      //En caso de que falle la validación
      this.aviso = "Por favor rellene todos los campos";
    }
  }
}
