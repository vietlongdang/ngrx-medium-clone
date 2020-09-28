import { AuthStateInterface } from '../types/auth-state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.action'
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action'
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from './actions/get-current-user.action'
import { updateCurrentUserSuccessAction } from './actions/update-current-user.action'
import { logoutAction } from './actions/sync.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
}

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(registerSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(registerFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
  on(loginAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(loginSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(loginFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
  on(getCurrentUserAction, (state) => ({
    ...state,
    isLoading: true
  })),
  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(getCurrentUserFailureAction, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    currentUser: null
  })),
  on(updateCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    currentUser: action.currentUser
  })),
  on(logoutAction, (): AuthStateInterface => ({
    ...initialState,
    isLoggedIn: false
  }))
)

export function reducers(state: AuthStateInterface, action: Action): AuthStateInterface {
  return authReducer(state, action)
}

