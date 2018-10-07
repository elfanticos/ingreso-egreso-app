import { ActionReducerMap } from '@ngrx/store';
/**Reducers */
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface Appstate {
    ui   : fromUI.State;
    auth : fromAuth.AuthState;
}

export const appReducers : ActionReducerMap<Appstate> = {
    ui   : fromUI.uiReducer,
    auth : fromAuth.authReducer
}
