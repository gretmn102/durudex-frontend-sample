import * as Login from './SignIn'
import * as Counter from './Counter'
import * as SignUp from './SignUp'

// The top-level state object
export interface ApplicationState {
  counter: Counter.CounterState
  login: Login.LoginState
  signUp: SignUp.LoginState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  counter: Counter.reducer,
  login: Login.reducer,
  signUp: SignUp.reducer,
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
