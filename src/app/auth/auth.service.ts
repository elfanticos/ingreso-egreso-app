import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _afAuth:AngularFireAuth,
    private _router:Router
    ) { }

  crearUsuario(nombre:string, email:string, password:string) {
    this._afAuth.auth.createUserWithEmailAndPassword(email,password).then(res => {
      console.log(res);
      this._router.navigate(['/']);
    }).catch(err => {
      console.error(err);
    });
  }

  login(email:string, password:string) {
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this._router.navigate(['/']);
    }).catch(err => {
      console.error(err);
    });
  }
}
