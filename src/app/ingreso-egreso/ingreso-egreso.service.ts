import { auth } from 'firebase';
import { Appstate } from './../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService implements OnDestroy {
  ingresoEgresoListerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();
  constructor(
    private _afBD: AngularFirestore,
    private _authService : AuthService,
    private _store : Store<Appstate> 
  ) { }

  ngOnDestroy(): void {
    this.cancelarSubscripion();
  }


  cancelarSubscripion():void {
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoListerSubscription.unsubscribe();
  }

  initIngresoEgresoListener():void {
    this.ingresoEgresoListerSubscription = this._store.select('auth')
      .pipe( filter(auth => auth.user != null) )
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid) );
  }

  private ingresoEgresoItems(uid:string) {
    this.ingresoEgresoItemsSubscription = this._afBD.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map(doc => {
            return {
              uid : doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((collection:any[]) => {
        this._store.dispatch(new SetItemsAction(collection));
      });
  }

  crearIngresoEgreso(ingresoEgreso : IngresoEgreso):Promise<any> {
    const user = this._authService.getUsuario();
    return this._afBD.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }
}
