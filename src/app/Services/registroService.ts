import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { RequestApi, registroCanguro, usuarioCanguro } from '../Models/registro-models';
import { ConexionApiService } from './conexionApi.service';
import { TYPERQUEST } from '../enums/httpType';
import { AuthService } from './autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  TYPERQUEST = TYPERQUEST;
  constructor(private conexionApi: ConexionApiService, private authService: AuthService) {}

  GetCanguro(): Observable<registroCanguro[]> {
    return this.conexionApi
      .conectQuery('api/Canguro/GetCanguro', this.TYPERQUEST.GET, true)
      .pipe(
        map((res: any) => {
          let response: RequestApi = res as RequestApi;
          if (response.isOk) {
            return (res as RequestApi).result as registroCanguro[];
          } else {
            return [];
          }
        })
      );
  }



  DeleteCanguro(codigo:string){
    return this.conexionApi.conectQuery("api/Canguro/DeleteCanguro/"+codigo,this.TYPERQUEST.DELETE,true).pipe(map((res:any)=>{
      let response:RequestApi=res as RequestApi;
      if (response.isOk) {
        return {isOK : true, message : response.message};
      }else{
        return null ;
      }
    }
    ));
  }


  UpdateCanguro(data:registroCanguro):Observable<registroCanguro | null>{
    return this.conexionApi.conectQuery("api/Canguro/UpdateCanguro",this.TYPERQUEST.PUT,true,data).pipe(map((res:any)=>{
      let response:RequestApi=res as RequestApi;
      if (response.isOk) {
        return (res as RequestApi).result as registroCanguro;
      }else{
        return null;
      }
    }
    ));
  }

  Login(data:usuarioCanguro):Observable<boolean>{
    return this.conexionApi.conectQuery("api/Canguro/Login",this.TYPERQUEST.POST,true,data).pipe(map((res:any)=>{
      console.log("res ", res);
      console.log("res.token ", res.token);
      
      if (res.token) {
        this.authService.setToken(res.token);
        return res.token;
      }else{
        return false;
      }
    }
    ));
  }



}
