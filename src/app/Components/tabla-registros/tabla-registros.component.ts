import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { registroCanguro } from 'src/app/Models/registro-models';
import { RegistroService } from 'src/app/Services/registroService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css'],
})
export class TablaRegistrosComponent implements OnInit {
  public registroCanguros?: registroCanguro[] = [];
  public registroSeleccionado: registroCanguro;

  // registros: any[] = []; 
  registrosPaginados: any[] = [];
  totalRegistros: number = 2;
  paginaActual: number = 1;
  elementosPorPagina: number = 1; 

  constructor(private _registroService: RegistroService
  ) {
    this.registroSeleccionado = {
      codigo: '',
      descripcion: '',
      direccion: '',
      identificacion: '',
      fechaCreacion: '',
      moneda: '',
      estado:true
    };

  }

  ngOnInit(): void {
    // this.registroCanguros = registroCanguros;

    this.cargarRegistro();
  }

  cargarRegistro(): void {
    this._registroService.GetCanguro().subscribe(
      (result: registroCanguro[]) => {
        console.log('Resultado tipos ', result);
        this.registroCanguros = result;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  updateCanguro(registroUpdate: registroCanguro) {

    if(registroUpdate.codigo == null || registroUpdate.codigo == ''){
      Swal.fire(
        'Actualizar!',
        'No existen registros para actualizar',
        'info'
      );
      return;
    }

    this._registroService.UpdateCanguro(registroUpdate).subscribe({
      next: (response: registroCanguro | null) => {
        if (response !== null) {

          this.cargarRegistro();
          Swal.fire(
            'Actualizado!',
            'Registro actualizado con éxito',
            'success'
          );
        } else {
          Swal.fire(
            'Error al actualizar!',
            'La actualización no pudo ser completada',
            'error'
          );
        }
      },
      error: (error) => {
        Swal.fire('Error al actualizar!', `${error.error}`, 'error');
        console.log(error);
      },
    });
  }

  deleteCanguro(codigo: string): void {
    this._registroService.DeleteCanguro(codigo).subscribe({
      next: (response) => {
        this.registroCanguros = this.registroCanguros?.filter(
          (f) => f.codigo != codigo
        );
        Swal.fire('Eliminado!', response?.message, 'success');
        console.log('Eliminada');
      },
      error: (error) => {
        Swal.fire('Error al eliminar!', `${error.error}`, 'error');
        console.log(error);
      },
    });
  }

  cargarRegistroSeleccionado(registro: registroCanguro) {
    this.registroSeleccionado = registro;
  }


   cargarRegistrosPaginados() {
    const startIndex = (this.paginaActual - 1) * this.elementosPorPagina;
    if(this.registroCanguros)
      this.registrosPaginados = this.registroCanguros.slice(startIndex, startIndex + this.elementosPorPagina);
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.cargarRegistrosPaginados();
  }


}
