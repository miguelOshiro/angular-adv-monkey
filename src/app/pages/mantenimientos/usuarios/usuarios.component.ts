import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs?: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
                private busquedasService: BusquedasService,
                private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
      this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe( delay(200) )
                        .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde).subscribe( ({ total, usuarios }) => {
      this.totalUsuario = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if( this.desde < 0) {
      this.desde = 0;
    }else if ( this.desde >= this.totalUsuario ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( (resp: any) => {

          this.usuarios = resp;
        } );
      return;
  }


  eliminarUsuario( usuario: Usuario ) {

    if( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire( 'Error', 'No puede borrarse', 'error');
    }

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar al ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario)
            .subscribe( resp => {

              this.cargarUsuarios();
              Swal.fire (
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );

            });
      }
    })
    return;
  }

  cambiarRole( usuario: Usuario ) {

    this.usuarioService.guardarUsuario( usuario )
        .subscribe( resp => {
          console.log(resp);
        })
  }


  abrirModal( usuario: Usuario ) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

}
