import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


export const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
    {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
    {path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
    {path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    {path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' } },
    {path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
    {path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
    {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },

    //{path: '', redirectTo: '/dashboard', pathMatch: 'full'},

    //Mantenimientos
    {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    {path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
    {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medicos' } },

    //Rutas de Admin
    {path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },

    ]
  },

];

@NgModule({

  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
