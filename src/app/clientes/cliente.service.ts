import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import { Observable,of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';



//capa de loguica de negocio service

@Injectable()
export class ClienteService {

  private urlEndPoint:string= 'http://localhost:8080/api/clientes';

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  

  constructor(private http:HttpClient) { }

  //metodo getClientes para devolver el listado de cliente de json.
  getClientes():Observable<Cliente[]>{

    return this.http.get(this.urlEndPoint).pipe(

      map((response) => response as Cliente[])
    );
  //  return of(CLIENTES);

  }

  //metodo create para crear un nuevo cliente

  create(cliente : Cliente) : Observable<Cliente>{

     return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers:this.httpHeaders})

  }
 

    //metodo getCliente para obtener un cliente por su id

  getCliente(id): Observable<Cliente>{

      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }
   
  update(cliente: Cliente) : Observable<Cliente>{

      return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers:this.httpHeaders})

  }
  delete(id:number):Observable<Cliente>{

       return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})

  }
     



}
