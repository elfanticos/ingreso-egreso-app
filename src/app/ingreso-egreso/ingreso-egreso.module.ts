import { StoreModule } from '@ngrx/store';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**Componentes */
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { DetalleComponent }       from './detalle/detalle.component';
import { DashboardComponent }     from './../dashboard/dashboard.component';
import { EstadisticaComponent }   from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
/**Librerias */
import { ChartsModule } from 'ng2-charts';
/**Modulos */
import { SharedModule } from './../shared/shared.module';
/**Routes */
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
