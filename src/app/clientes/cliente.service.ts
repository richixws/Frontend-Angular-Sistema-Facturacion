import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import { Observable,of } from 'rxjs';



//capa de loguica de negocio service

@Injectable()
export class ClienteService {

  constructor() { }

  //metodo getClientes para devolver el listado de cliente de json.
  getClientes():Observable<Cliente[]>{

    return of(CLIENTES);

  }
}
