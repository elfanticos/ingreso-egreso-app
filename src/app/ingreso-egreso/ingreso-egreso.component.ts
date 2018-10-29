import * as fromActionUi                      from './../shared/ui.acctions';
import { Store }                              from '@ngrx/store';
import { IngresoEgresoService }               from './ingreso-egreso.service';
import { IngresoEgreso }                      from './ingreso-egreso.model';
import { Component, OnInit, OnDestroy }       from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromIngresoEgreso                 from '../ingreso-egreso/ingreso-egreso.reducer';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form:FormGroup;
  tipo:string = 'ingreso';
  loadingSubs:Subscription = new Subscription();
  cargando:boolean;
  constructor(
    private _ingresoEgresoService : IngresoEgresoService,
    private _store : Store<fromIngresoEgreso.Appstate>
  ) { }

  ngOnInit():void {
    this.loadingSubs = this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading; 
    });
    this.form = new FormGroup({
      'descripcion' : new FormControl('', Validators.required),
      'monto'       : new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy():void {
    this.loadingSubs.unsubscribe();
  }

  crearIngreso():void {
    const ingresoEgreso = new IngresoEgreso({...this.form.value, tipo : this.tipo});
    this._store.dispatch(new fromActionUi.ActivarLoadingAction());
    this._ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(result => {
      /**Resultado del servicio */
      this._store.dispatch(new fromActionUi.DesactivarLoadingAction());
      Swal('Creado', ingresoEgreso.descripcion, 'success');
      /**Reseteamos el formulario */
      this.form.reset({ monto : 0 });
    }).catch(err => {
      this._store.dispatch(new fromActionUi.DesactivarLoadingAction());
      Swal('Hubo un error',  err.message, 'error');
    });
  }
}
