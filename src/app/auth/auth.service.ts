import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
/**NGRX */
import {Store} from '@ngrx/store';
/**Firebase */
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
/**Librerias */
import Swal from 'sweetalert2';
/**Modelos */
import { User } from './user.model';
import { Appstate } from '../app.reducer';
/**Acciones */
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.acctions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _afAuth:AngularFireAuth,
    private _router:Router,
    private _afDB: AngularFirestore,
    private _store:Store<Appstate>
    ) {
     }

  initAutListener() {
    this._afAuth.authState.subscribe((fbUSer:firebase.User) => {
    });
  }
  crearUsuario(nombre:string, email:string, password:string) {
    this._store.dispatch(new ActivarLoadingAction());
    this._afAuth.auth.createUserWithEmailAndPassword(email,password).then(res => {
      const user:User = {
        uid    : res.user.uid,
        nombre : nombre,
        email  : email
      };
      this._afDB.doc(`${res.user.uid}/usuario`)
        .set(user)
        .then(() => {
          this._router.navigate(['/']);
          this._store.dispatch(new DesactivarLoadingAction());
        })
    }).catch(err => {
      this._store.dispatch(new DesactivarLoadingAction());
      Swal('Error crear usuario',  err.message, 'error');
      console.error(err);
    });
  }

  login(email:string, password:string) {
    this._store.dispatch(new ActivarLoadingAction());
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this._store.dispatch(new DesactivarLoadingAction());
      this._router.navigate(['/']);
    }).catch(err => {
      this._store.dispatch(new DesactivarLoadingAction());
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
