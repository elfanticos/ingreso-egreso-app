import { IngresoEgresoService } from './../ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../ingreso-egreso.model';
import { Appstate } from './../../app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subcription : Subscription = new Subscription();
  constructor(
    private _store:Store<Appstate>,
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
