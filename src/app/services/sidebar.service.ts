import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] =[
    {
      titulo: 'Dashboard!!!',
      icono: 'tio-home-vs-1-outlined',
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'Graficas', url: 'grafica1'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Rxjs', url: 'rxjs'},
      ]
    },

    {
      titulo: 'Mantenimiento',
      icono: 'tio-dashboard-vs-outlined',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Medicos', url: 'medicos'},
      ]
    },
  ];

  constructor() { }
}


//tio-apps
//tio-lock-outlined
//tio-visible-outlined
//tio-dashboard-vs-outlined
//tio-book-opened
//tio-home-vs-1-outlined
//tio-command-key
//tio-alt
//tio-gift
//tio-chat-outlined
