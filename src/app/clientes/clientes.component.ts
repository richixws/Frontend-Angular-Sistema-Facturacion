import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClienteService} from './cliente.service'

//componnet controlador de cliente

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];

  //inyeccion de dependencia ClienteService
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.clienteService.getClientes().subscribe(
      (clientes)=> this.clientes=clientes
    );
    
  }

}
