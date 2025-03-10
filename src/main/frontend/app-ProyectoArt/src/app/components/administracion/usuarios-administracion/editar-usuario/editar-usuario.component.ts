import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseServiceService, Usuario} from '../../../../services/database-service.service';
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
  loginForm: FormGroup;

  aviso:string = "";



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private databaseService: DatabaseServiceService)
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //Conseguimos la Id del Usuario que estamos Editando
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    //Buscamos al Usuario que hemos seleccionado por su ID
    this.databaseService.finduser(this.userId).subscribe(data => {
      this.usuario = data;
    });
  }




  submit() {
    this.databaseService.updateUser(this.usuario).subscribe(() => {
      alert('Usuario actualizado correctamente');
    });
  }

}
