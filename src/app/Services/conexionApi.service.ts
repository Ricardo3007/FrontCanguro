import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TYPERQUEST } from '../enums/httpType';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  constructor(private _http: HttpClient, private _skipInterceptor: HttpBackend) { }
  TYPEREQUEST=TYPERQUEST;
  conectQuery(query: string, type: TYPERQUEST, authorization: boolean, body?: any,  verifyToken: boolean = true) {
    let urlRef = window.location.href;
    let conexion = ""
    if(urlRef.includes("localhost:4200") || urlRef.includes("127.0.0.1:4200")){
      conexion = "localhost"
    }else{
      conexion = urlRef.split("/")[3].slice(3);
    }
   /*  const url = environment.conexionApiBack + conexion + query; */
    const url = environment.API_URL  + query;
    let headers: any = new HttpHeaders({
      Accept: "application/x-www-form-urlencoded",
      //aca debo pasar el header "ngrok-skip-browser-warning": "true" para que no me salga el mensaje de que la conexion no es segura
  /*     "ngrok-skip-browser-warning": "true" */
    });
    switch (type) {
      case TYPERQUEST.GET:
        return this._http.get(url, { headers: headers });
      case TYPERQUEST.POST:
        return this._http.post(url, body, { headers: headers });
      case TYPERQUEST.DELETE:
        let httpOptions = { headers: headers, body: body };
           return this._http.delete(url, httpOptions);
      default://PUT
      return this._http.put(url, body, { headers: headers });
    }
  }
}
