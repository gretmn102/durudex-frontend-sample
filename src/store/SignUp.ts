import { Action, Reducer } from 'redux'

import { Deferred } from '../common'
import { AppThunkAction } from './'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export type Error =
  | ['NOT_AVAILABLE']
  | ['OTHER', string]

export type Result =
  | ['AVAILABLE']
  | ['ERROR', Error]

export type Gender =
  | 'UNDEFINED'
  | 'MALE'
  | 'FEMALE'

type Page = 'FIRST' | 'SECOND' | 'THIRD'

export type LoginState = {
  page: Page

  // First page
  name: string
  email: string
  isValidEmail: Deferred<Result>
  username: string
  isValidUsername: Deferred<Result>

  // Second page
  password: string
  phone: string
  isValidPhone: Deferred<Result>

  // Third page
  dateOfBirth: Date
  gender: Gender
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

type RequestValidateAction = {
  type: 'REQUEST_VALIDATE'
  value: string
}

type ReceiveValidateAction = {
  type: 'RECIEVE_VALIDATE'
  value: string
  result: Result
}

type ValidateKnownAction =
  | RequestValidateAction
  | ReceiveValidateAction

const validate = (
  value: string,
): AppThunkAction<ValidateKnownAction> => (dispatch, getState) => {
  // Only load data if it's something we don't already have (and are not already loading)
  const appState = getState()

  // TODO: stub
  function fetch(value: string) {
    return new Promise<Response>((resolve) => {
      const ok: Result = ['AVAILABLE']
      const res = new Response(JSON.stringify(ok))
      setTimeout(() => resolve(res), 500)
    })
  }

  if (appState && appState.login) {
    fetch(value)
      .then(response => response.json() as Promise<Result>)
      .then(data => {
        dispatch({ type: 'RECIEVE_VALIDATE', value: value, result: data })
      })
      .catch(errorMsg => {
        dispatch({ type: 'RECIEVE_VALIDATE', value: value, result: ['ERROR', errorMsg] })
      })

    dispatch({ type: 'REQUEST_VALIDATE', value: value })
  }
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type EmailValidate = {
  type: 'EMAIL_VALIDATE_KNOWNACTION'
  value: ValidateKnownAction
}

type UsernameValidate = {
  type: 'USERNAME_VALIDATE_KNOWNACTION'
  value: ValidateKnownAction
}

type KnownAction =
  | EmailValidate
  | UsernameValidate

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
  validateEmail: (email: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    validate (
      email
    )(
      x => dispatch({ type: 'EMAIL_VALIDATE_KNOWNACTION', value: x }),
      getState
    )
  },
  validateUsername: (username: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    validate (
      username
    )(
      x => dispatch({ type: 'USERNAME_VALIDATE_KNOWNACTION', value: x }),
      getState
    )
  },
}

export const initState: LoginState = {
  page: 'FIRST',

  // First page
  name: '',
  email: '',
  isValidEmail: ['HAS_NOT_STARTED_YET'],
  username: '',
  isValidUsername: ['HAS_NOT_STARTED_YET'],

  // Second page
  password: '',
  phone: '',
  isValidPhone: ['HAS_NOT_STARTED_YET'],

  // Third page
  dateOfBirth: new Date(),
  gender: 'UNDEFINED',
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<LoginState> = (
  state: LoginState | undefined,
  incomingAction: Action,
): LoginState => {
  if (state === undefined) {
    return initState
  }

  const action = incomingAction as KnownAction

  switch (action.type) {
    case 'EMAIL_VALIDATE_KNOWNACTION': {
      const validateAction = action.value
      switch (validateAction.type) {
        case 'REQUEST_VALIDATE':
          return {
            ...state,
            email: validateAction.value,
            isValidEmail: ['IN_PROGRESS'],
          }
        case 'RECIEVE_VALIDATE':
          // Only accept the incoming data if it matches the most recent request.
          // This ensures we correctly handle out-of-order responses.
          if (state.email === validateAction.value) {
            return {
              ...state,
              isValidEmail: ['RESOLVED', validateAction.result],
            }
          }
          break
      }
    } break
    case "USERNAME_VALIDATE_KNOWNACTION": {
      const validateAction = action.value
      switch (validateAction.type) {
        case 'REQUEST_VALIDATE':
          return {
            ...state,
            username: validateAction.value,
            isValidUsername: ['IN_PROGRESS'],
          }
        case 'RECIEVE_VALIDATE':
          // Only accept the incoming data if it matches the most recent request.
          // This ensures we correctly handle out-of-order responses.
          if (state.username === validateAction.value) {
            return {
              ...state,
              isValidUsername: ['RESOLVED', validateAction.result],
            }
          }
          break
      }
    } break
  }
  return state
}
