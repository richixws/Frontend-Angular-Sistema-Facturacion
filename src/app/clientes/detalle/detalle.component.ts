import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Cliente } from '../cliente';
import {ClienteService} from '../cliente.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente:Cliente;
  titulo: string="detalle de cliente";

  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params =>{

      let id:number= +params.get('id');
      if(id){
        this.clienteService.getClientes(id).subscribe(cliente=>{

          this.cliente=cliente;

        });
      }
    });


  }

}
