export interface registroCanguro  {
    codigo : string,
    descripcion : string,
    direccion: string,
    identificacion: string,
    fechaCreacion: string,
    moneda: string,
    estado:boolean
}


export interface  RequestApi  {
    isOk: boolean,
    message: string,
    result: any,
  }


export interface usuarioCanguro  {
    id : string,
    nombre : string,
    password: string,
    estado:boolean
}