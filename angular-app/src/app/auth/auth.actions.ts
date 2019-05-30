import { Action } from '@ngrx/store';


export const AUTHENTICATED = '[UI] authneticated';
export const UNAUTHNETICATED = '[UI] unauthneticated';

export class SetAuthenticated implements Action {
   readonly type = AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = UNAUTHNETICATED;
 }

 export type AuthActions = SetAuthenticated | SetUnauthenticated;