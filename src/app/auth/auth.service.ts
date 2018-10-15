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
import { SetUserAction } from './auth.actions';
/**RXJS */
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubscription :Subscription = new Subscription();
  usuario:User;
  constructor(
    private _afAuth:AngularFireAuth,
    private _router:Router,
    private _afDB: AngularFirestore,
    private _store:Store<Appstate>
    ) {
     }

  initAutListener():void {
    /**Obtener cualquier cambio del usuario */
    this._afAuth.authState.subscribe((fbUSer:firebase.User) => {
      if (fbUSer) {
        /**subcribirse cuando el usuario esta en sesión */
        this.userSubscription = this._afDB.doc(`${fbUSer.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj:any) => {
            const newUser = new User(usuarioObj);
            this._store.dispatch(new SetUserAction(newUser));
            this.usuario = usuarioObj;
        });
      } else {
        /**Desubcribirse si el usario logueado cierra sesión */
        this.userSubscription.unsubscribe();
        this.usuario = null;
      }
    });
  }

  crearUsuario(nombre:string, email:string, password:string):void {
    /**Activar carga */
    this._store.dispatch(new ActivarLoadingAction());
    /**Crear usuario en database */
    this._afAuth.auth.createUserWithEmailAndPassword(email,password).then(res => {
      /**Datos de usuario */
      const user:User = {
        uid    : res.user.uid,
        nombre : nombre,
        email  : email
      };
      this._afDB.doc(`${res.user.uid}/usuario`)
        .set(user)
        .then(() => {
          /**Desactivar carga y redireccionar al dashboard */
          this._router.navigate(['/']);
          this._store.dispatch(new DesactivarLoadingAction());
        })
    }).catch(err => {
      /**Desactivar carga*/
      this._store.dispatch(new DesactivarLoadingAction());
      Swal('Error crear usuario',  err.message, 'error');
    });
  }

  login(email:string, password:string):void {
    /**Activar carga */
    this._store.dispatch(new ActivarLoadingAction());
    /**Autentificar en database */
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      /**Desactivar carga y redireccionar al dashboard */
      this._store.dispatch(new DesactivarLoadingAction());
      this._router.navigate(['/']);
    }).catch(err => {
      /**Desactivar carga*/
      this._store.dispatch(new DesactivarLoadingAction());
      Swal('Error en el login',  err.message, 'error');
    });
  }

  logout():void {
    /**Cerrar sesión y redireccionar al login */
    this._router.navigate(['/login']);
    this._afAuth.auth.signOut();
  }

  isAuth() {
    /**Validar el token del usuario */
    return this._afAuth.authState
      .pipe(
        map( fbUser => {
          if(!fbUser) {
            /**Redireccionar al login si el usuario no existe en sesión */
            this._router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }

  getUsuario() {
    return {...this.usuario};
  }
}
