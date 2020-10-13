import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { Cliente } from '../cliente';
import {ClienteService} from '../cliente.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente:Cliente;
  titulo: string="detalle de cliente";
  public fotoSeleccionada: File;
  public progreso:number = 0;

  constructor(private clienteService:ClienteService, public modalService:ModalService ) { }

  ngOnInit() {

  

  }
   seleccionarFoto(event){

     this.fotoSeleccionada=event.target.files[0];
     this.progreso=0;
     console.log(this.fotoSeleccionada);
     if(this.fotoSeleccionada.type.indexOf('image') < 0){
       swal.fire('Error seleccionar imagen','El archivo deve de  ser de tipo image','error');
     }

   }

   subirFoto(){

      if(!this.fotoSeleccionada){
        swal.fire('Error Upload: ', 'Deve seleccionar una foto','error');
      }else{
     this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
     .subscribe(event =>{
        
         if(event.type === HttpEventType.UploadProgress){
           this.progreso= Math.round((event.loaded/event.total)*100);
         }else if(event.type === HttpEventType.Response){
            let response: any=event.body;
            this.cliente= response.cliente as Cliente;

            swal.fire('la foto se a subido correctamente!',response.mensaje,'success');

         }
      //   this.cliente=cliente;
     });
    }
   }

   cerrarModal(){

    this.modalService.cerrarModal();
    this.fotoSeleccionada=null
    this.progreso=0;

   }


}
