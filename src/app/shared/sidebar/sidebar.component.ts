import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //img sidebar(no tiene)
  public usuario!: Usuario;

  menuItems: any[];

  constructor( private sidebarService: SidebarService,
              private usuarioService: UsuarioService ) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
