import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activateRoute: ActivatedRoute,
               private busquedasService: BusquedasService ) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( ({ termino }) => this.busqeudaGlobal( termino ));
  }

  busqeudaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp);
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.hospitales;
        })
  }

  abrirMedico( medico: Medico ) {
    console.log(medico);
  }

}
