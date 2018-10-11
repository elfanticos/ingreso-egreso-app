import { Component, OnInit, OnDestroy } from '@angular/core';
/**NGXR */
import { Appstate } from '../../app.reducer';
import { Store } from '@ngrx/store';
/**Servicio */
import { AuthService } from './../auth.service';
/**Modelo */
import { DATOS } from './../auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando:boolean;
  subcription:Subscription = new Subscription();
  constructor(
    private _authService : AuthService,
    private _store : Store<Appstate>
  ) { }

  ngOnInit():void {
    this.subcription = this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }
  
  ngOnDestroy():void {
    this.subcription.unsubscribe();
  }

  onSubmit(data:DATOS):void {
    this._authService.crearUsuario(data.name, data.email, data.password);
  }

}
