import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

import swal from 'sweetalert2';
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
  private fotoSeleccionada: File;

  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params =>{

      let id:number= +params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente=>{

          this.cliente=cliente;

        });
      }
    });


  }
   seleccionarFoto(event){

     this.fotoSeleccionada=event.target.files[0];
     console.log(this.fotoSeleccionada);

   }

   subirFoto(){

     this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
     .subscribe(cliente =>{
        
         this.cliente=cliente;
         swal.fire('la foto se a subido correctamente!',`la foto se a subido con exito: ${this.cliente.foto}`,'success');
     })

   }


}
