import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/colors/${ theme}';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme( theme: string) {

    const url = `./assets/colors/${ theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url );
  }

  checkCurrentTheme() {

    const links= document.querySelectorAll('.selector');
    //console.log(links);
    links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if( btnThemeUrl === currentTheme ) {
        elem.classList.add('working');
      }
    })
  }
}
