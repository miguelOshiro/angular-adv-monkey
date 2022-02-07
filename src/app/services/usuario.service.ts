import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { registerForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

const base_url= environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;

  constructor( private http: HttpClient,
              private router: Router,
              private ngZone: NgZone,) {

    this.googleInit();

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise( (resolve: any) => {

      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '1000678806194-2qvbb9gtaf5t892sn2hknpoo6eb351ck.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      });

    })
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      //console.log('User signed Out.');
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');

      })
    })
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false) )
    );
  }



  crearUsuario( formData: registerForm ) {

    return this.http.post(`${ base_url }/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  actualizarPerfil( data: { email:string, nombre:string, role?: string } ) {

    data = { ...data, role: this.usuario.role };
    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers
    )};

  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  loginGoogle( token: any ) {

    return this.http.post(`${ base_url }/login/google`, {token})
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  cargarUsuario( desde: number= 0 ) {
    //localhost:3000/api/usuarios?desde=0
    const url = `${ base_url}/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
              .pipe(
                //delay(5000),
                map( resp => {
                  const usuarios = resp.usuarios.map(
                    user => new Usuario(user.nombre, user.email, '', user.img, user.google,
                    user.role, user.uid)
                  );
                  return {
                    total: resp.total,
                    usuarios
                  };
                })
              )

  }


  eliminarUsuario( usuario: Usuario ) {
    // /usuarios/616da595d588e42e137938f2
    const url = `${ base_url}/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );

  }


  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}
