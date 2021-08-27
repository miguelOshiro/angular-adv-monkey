import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

export const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
    children: [
    {path: '', component: DashboardComponent, data: { tituli: 'Dashboard' } },
    {path: 'progress', component: ProgressComponent, data: { tituli: 'ProgressBar' } },
    {path: 'grafica1', component: Grafica1Component, data: { tituli: 'Grafica #1' } },
    {path: 'account-settings', component: AccountSettingsComponent, data: { tituli: 'Ajustes de cuenta' } },
    {path: 'promesas', component: PromesasComponent, data: { tituli: 'Promesas' } },
    {path: 'rxjs', component: RxjsComponent, data: { tituli: 'Rxjs' } },
    //{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },

];

@NgModule({

  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
