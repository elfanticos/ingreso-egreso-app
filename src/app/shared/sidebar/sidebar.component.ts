import { User } from './../../auth/user.model';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy{
  usuario:User;
  subscription:Subscription = new Subscription();
  constructor(
    private _authService : AuthService,
    private _ingresoEgresoService : IngresoEgresoService,
    private _store : Store<Appstate>
  ) { }

  ngOnInit():void {
    this.subscription = this._store.select('auth')
    .pipe(filter(fil => fil.user != null))
    .subscribe(auth => {
      this.usuario = auth.user;
    });
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  logout() {
    this._authService.logout();
    this._ingresoEgresoService.cancelarSubscripion();    
  }
}
