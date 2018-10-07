import { Component, OnInit, OnDestroy } from '@angular/core';
/**Servicio */
import { AuthService } from './../auth.service';
/**Modelo */
import { DATOS } from './../auth.model';
import { Appstate } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando:boolean;
  subcription:Subscription;
  constructor(
    private _authService : AuthService,
    private _store : Store<Appstate>
  ) { }
  //inicio
  ngOnInit() {
    this.subcription = this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy():void {
    this.subcription.unsubscribe();
  }
  
  onLogin(data:DATOS) {
    this._authService.login(data.email,data.password);
  }



}
