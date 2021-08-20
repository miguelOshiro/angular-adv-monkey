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
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Graficas', url: 'grafica1'},
      ]
    }
  ];

  constructor() { }
}
