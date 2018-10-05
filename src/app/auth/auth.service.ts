import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _afAuth:AngularFireAuth,
    private _router:Router
    ) { }

  initAutListener() {
    this._afAuth.authState.subscribe((fbUSer:firebase.User) => {
      console.log(fbUSer);
    });
  }
  crearUsuario(nombre:string, email:string, password:string) {
    this._afAuth.auth.createUserWithEmailAndPassword(email,password).then(res => {
      this._router.navigate(['/']);
    }).catch(err => {
      Swal('Error crear usuario',  err.message, 'error');
      console.error(err);
    });
  }

  login(email:string, password:string) {
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this._router.navigate(['/']);
    }).catch(err => {
      Swal('Error en el login',  err.message, 'error');
      console.error(err);
    });
  }

  logout() {
    this._router.navigate(['/login']);
    this._afAuth.auth.signOut();
  }

  isAuth() {
    return this._afAuth.authState
      .pipe(
        map( fbUser => {
          if(fbUser == null) {
            this._router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }
}
