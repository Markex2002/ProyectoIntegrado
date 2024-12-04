import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Artista, DatabaseServiceService} from '../../services/database-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  artistForm: FormGroup;
  artistas: Artista[] = [];
  todosArtistas: Artista[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(
    protected databaseService: DatabaseServiceService,
    private fb: FormBuilder)
  {
    this.artistForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{
    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
      this.todosArtistas = data;
    })
  }



  submit(){
    /*

    if (this.artistForm.valid) {
      const newArtist: Artista = this.artistForm.value;
      this.databaseService.create(newArtist).subscribe(res => {
        console.log('Artista creada correctamente! + res');
        this.artistForm.reset();
      })
    } else {
      console.error('Error creating Artist')
    }

     */

    const newArtist: Artista = this.artistForm.value;
    this.databaseService.create(newArtist).subscribe(res => {
      console.log('Artista creada correctamente! + res');
      this.artistForm.reset();
    })
}








  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
