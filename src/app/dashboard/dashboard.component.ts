import { IngresoEgresoService } from './../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(
    public _ingresoEgresoService : IngresoEgresoService
  ) { }

  ngOnInit() {
    this._ingresoEgresoService.initIngresoEgresoListener();
  }

}
