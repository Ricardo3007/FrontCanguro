import { Component, OnInit } from '@angular/core';
import { RegistroService } from './Services/registroService';
import { HttpErrorResponse } from '@angular/common/http';
import { usuarioCanguro } from './Models/registro-models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLogueado:boolean = false;
  public usuarioCanguro: usuarioCanguro;


  constructor(private _registroService: RegistroService
  ) {

    this.usuarioCanguro = {
      id: '',
      nombre: '',
      password: '',
      estado:true
    };
  }


  ngOnInit(): void {
    
  }

  login(usuarioCanguro:usuarioCanguro): void {

    if(usuarioCanguro.nombre == '' || usuarioCanguro.nombre == null){

      Swal.fire('Login', 'El Nombre es obligatorio', 'warning');
      return;
    }

    if(usuarioCanguro.password == '' || usuarioCanguro.password == null){

      Swal.fire('Login', 'La contraseña es obligatoria', 'warning');
      return;
    }
    
    this._registroService.Login(usuarioCanguro).subscribe(
      (result: boolean) => {
        if(result){
          Swal.fire('Login', 'Inicio de sesion incorrecto.', 'warning');
          return;
        } 
        this.isLogueado = result;
       
      },
      (error: HttpErrorResponse) => {
        Swal.fire('Login', 'Error en conexión o autorización', 'error');
        console.log(error);
      }
    );
  }


}
