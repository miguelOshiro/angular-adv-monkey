import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  //hav0k@gmail.com
  public loginForm = this.fb.group({
  email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email] ],
  password: ['', [Validators.required] ],
  remember: [false]

  });



  constructor( private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login() {

  this.usuarioService.login(this.loginForm.value )
      .subscribe( resp => {
        //console.log(resp);

        if( this.loginForm.get('remember')?.value ) {
          localStorage.setItem('email', this.loginForm.get('email')?.value );
        } else {
          localStorage.removeItem('email');
        }

        //navegar al dashboaerd
        this.router.navigateByUrl('/');

      }, (err ) => {
        //Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });
    //console.log(this.loginForm.value);
    //this.router.navigateByUrl('/');
  }
  //  onSuccess(googleUser: any) {
  //   //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);
  // }
  // onFailure(error: any) {
  //   console.log('ERRRRRRRR', error);
  // }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      //'onsuccess': this.onSuccess,
      //'onfailure': this.onFailure
    });

    this.startApp();
  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2= this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element: any) {
    //console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          var id_token = googleUser.getAuthResponse().id_token;
          //console.log(id_token);
          this.usuarioService.loginGoogle( id_token )
                .subscribe( resp => {
                  //navegar al dashboaerd
                  this.ngZone.run( () => {
                    this.router.navigateByUrl('/');
                  })
                });



        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
