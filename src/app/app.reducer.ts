import { ActionReducerMap } from '@ngrx/store';
/**Reducers */
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface Appstate {
    ui            : fromUI.State;
    auth          : fromAuth.AuthState;
    ingresoEgreso : fromIngresoEgreso.IngresoEgresoState;
}

export const appReducers : ActionReducerMap<Appstate> = {
    ui            : fromUI.uiReducer,
    auth          : fromAuth.authReducer,
    ingresoEgreso : fromIngresoEgreso.ingresoEgresoReducer
}
