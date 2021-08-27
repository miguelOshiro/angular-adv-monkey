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
    }
  ];

  constructor() { }
}
