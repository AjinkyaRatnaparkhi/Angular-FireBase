import { AuthActions, AUTHENTICATED ,UNAUTHNETICATED } from './auth.actions';

export interface State {
    isAuthenticated: boolean
}

const initialState: State = {
    isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthActions) {

    switch (action.type) {
        case AUTHENTICATED:
            return {
                isAuthenticated: true
            }
            
        case UNAUTHNETICATED:
            return {
                isAuthenticated: false
            }
    
        default:
            return state
    }
    
}

export const getIsAuth = (state: State) => state.isAuthenticated;