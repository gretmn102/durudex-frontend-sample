import { Action, Reducer } from 'redux'
import { AppThunkAction } from './'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export type Deferred<T> =
  | ['HAS_NOT_STARTED_YET']
  | ['IN_PROGRESS']
  | ['RESOLVED', T]

export function deferredMatch<T, Result>(
  d: Deferred<T>,
  hasNotStartedYet: () => void,
  inProgress: () => void,
  resolved: (result: T) => Result,
) {
  switch (d[0]) {
    case "RESOLVED": {
      return resolved(d[1])
    }
    case 'HAS_NOT_STARTED_YET':
      hasNotStartedYet()
      break
    case "IN_PROGRESS": {
      inProgress()
    }
  }
}

export type AuthResult = ['OK'] | ['ERROR', string]

export interface LoginState {
  state: Deferred<AuthResult>
  login: string
  password: string
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestLoginAction {
  type: 'REQUEST_LOGIN'
  login: string
  password: string
}

interface ReceiveLoginAction {
  type: 'RECEIVE_LOGIN'
  result: AuthResult
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestLoginAction | ReceiveLoginAction

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  requestLogin: (login: string, password: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState()

    // TODO: stub
    function fetch(login: string, password: string) {
      return new Promise<Response>((resolve) => {
        const ok: AuthResult = ['OK']
        const res = new Response(JSON.stringify(ok))
        setTimeout(() => resolve(res), 500)
      })
    }

    if (appState && appState.login) {
      fetch(login, password)
        .then(response => response.json() as Promise<AuthResult>)
        .then(data => {
          dispatch({ type: 'RECEIVE_LOGIN', result: data })
        })
        .catch(errorMsg => {
          dispatch({ type: 'RECEIVE_LOGIN', result: ['ERROR', errorMsg] })
        })

      dispatch({ type: 'REQUEST_LOGIN', login: login, password: password })
    }
  },
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const initState: LoginState = {
  state: ['HAS_NOT_STARTED_YET'],
  login: '',
  password: '',
}

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
  if (state === undefined) {
    return initState
  }

  const action = incomingAction as KnownAction
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        state: ['IN_PROGRESS'],
        login: action.login,
        password: action.password,
      }
    case 'RECEIVE_LOGIN':
      // Only accept the incoming data if it matches the most recent request. This ensures we correctly
      // handle out-of-order responses.
      if (state.state[0] === 'IN_PROGRESS') {
        return {
          ...state,
          state: ['RESOLVED', action.result],
        }
      }
      break
  }

  return state
}
