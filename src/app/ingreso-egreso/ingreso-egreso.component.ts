import { IngresoEgreso } from './ingreso-egreso.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {
  form:FormGroup;
  tipo:string = 'ingreso';
  constructor() { }

  ngOnInit():void {
    this.form = new FormGroup({
      'descripcion' : new FormControl('', Validators.required),
      'monto'       : new FormControl(0, Validators.min(0))
    });
  }

  crearIngreso():void {
    const ingresoEgreso = new IngresoEgreso({...this.form.value, tipo : this.tipo});
  }
}
