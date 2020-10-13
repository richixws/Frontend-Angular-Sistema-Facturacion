import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClienteService} from './cliente.service';
import { ModalService } from './detalle/modal.service';
import Swal from  'sweetalert2';
import {tap} from 'rxjs/operators';
import {  ActivatedRoute} from '@angular/router';

//componnet controlador de cliente

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
  
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  paginador:any;
  clienteSeleccionado:Cliente;

  //inyeccion de dependencia ClienteService
  constructor(private clienteService: ClienteService,
              private  modalService: ModalService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  

   this.activatedRoute.paramMap.subscribe( params =>{

  
    let page:number = +params.get('page');

    if(!page){
      page=0;
    }

    this.clienteService.getClientes(page).pipe(
      tap(response => {
        
       
        console.log('ClienteComponent: tap 3');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre)
        });
      })
  
      ).subscribe(response =>{
        
        this.clientes=response.content as Cliente[];
        this.paginador=response;   

      });
    });
  }

  delete(cliente:Cliente):void{

    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
  
   
    swal.fire({
      title: 'esta seguro?',
      text: `¿seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
           Response =>{
            
            this.clientes=this.clientes.filter(cli => cli!== cliente) 
              
            swal.fire(
              'Cliente eliminado!',
              `cliente ${cliente.nombre} eliminado con exito`,
              'success'
            )

           }

        )    
      }
    })

  }

  abrirModal(cliente: Cliente){

    this.clienteSeleccionado=cliente;
    this.modalService.abrirModal();

  }

}
