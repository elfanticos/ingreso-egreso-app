import * as fromUI from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface Appstate {
    ui: fromUI.State;
}

export const appReducers : ActionReducerMap<Appstate> = {
    ui : fromUI.uiReducer
}
