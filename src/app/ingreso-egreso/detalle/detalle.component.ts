import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
/**Redux */
import { Store } from '@ngrx/store';
import { Appstate } from './../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
/**Componentes */
import { IngresoEgreso } from './../ingreso-egreso.model';
/**Servicios */
import { IngresoEgresoService } from './../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subcription : Subscription = new Subscription();
  constructor(
    private _store:Store<fromIngresoEgreso.Appstate>,
    private _ingresoEgresoService : IngresoEgresoService
  ) { 
  }

  ngOnInit():void {
    this.subcription = this._store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  borrarItem( item:IngresoEgreso ):void {
    this._ingresoEgresoService.borrarIngresoEgreso(item);
  }

}
