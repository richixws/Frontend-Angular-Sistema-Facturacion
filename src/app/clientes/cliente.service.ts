import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import { Observable,of} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';



//capa de loguica de negocio service

@Injectable()
export class ClienteService {

  private urlEndPoint:string= 'http://localhost:8080/api/clientes';

  constructor(private http:HttpClient) { }

  //metodo getClientes para devolver el listado de cliente de json.
  getClientes():Observable<Cliente[]>{

    return this.http.get(this.urlEndPoint).pipe(

      map((response) => response as Cliente[])
    );
  //  return of(CLIENTES);

  }
}
