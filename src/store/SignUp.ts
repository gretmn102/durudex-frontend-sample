import { Action, Reducer } from 'redux'

import { Deferred } from '../common'
import { AppThunkAction } from './'
import * as Common from './sessionSlice'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export type Error =
  | ['NOT_AVAILABLE']
  | ['OTHER', string]

export type Result =
  | ['AVAILABLE']
  | ['ERROR', Error]

type Page = 'FIRST' | 'SECOND' | 'THIRD'

export type LoginState = {
  page: Page
  user: Common.CurrentUser;

  isValidEmail: Deferred<Result>
  isValidUsername: Deferred<Result>
  isValidPhone: Deferred<Result>
}

export const initState: LoginState = {
  page: 'FIRST',
  user: Common.userEmpty,

  isValidEmail: ['HAS_NOT_STARTED_YET'],
  isValidUsername: ['HAS_NOT_STARTED_YET'],
  isValidPhone: ['HAS_NOT_STARTED_YET'],
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

type PhoneValidate = {
  type: 'PHONE_VALIDATE_KNOWNACTION'
  value: ValidateKnownAction
}

type SetPage = {
  type: 'SET_PAGE'
  value: Page
}

type SetName = {
  type: 'SET_NAME'
  newName: string
}

type SetPassword = {
  type: 'SET_PASSWORD'
  newPassword: string
}

type SetBirthDate = {
  type: 'SET_BIRTH_DATE'
  newBirthDate: Date
}

type SetGender = {
  type: 'SET_GENDER'
  newGender: Common.Gender
}

type KnownAction =
  | EmailValidate
  | UsernameValidate
  | PhoneValidate
  | SetPage
  | SetName
  | SetPassword
  | SetBirthDate
  | SetGender

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
  validateEmail: (email: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    validate (
      email,
    )(
      x => dispatch({ type: 'EMAIL_VALIDATE_KNOWNACTION', value: x }),
      getState,
    )
  },
  validateUsername: (username: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    validate (
      username,
    )(
      x => dispatch({ type: 'USERNAME_VALIDATE_KNOWNACTION', value: x }),
      getState,
    )
  },
  validatePhone: (username: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    validate (
      username,
    )(
      x => dispatch({ type: 'PHONE_VALIDATE_KNOWNACTION', value: x }),
      getState,
    )
  },
}

export const setPage = (page: Page): SetPage => {
  return { type: 'SET_PAGE', value: page }
}
export const setName = (name: string): SetName => {
  return { type: 'SET_NAME', newName: name }
}
export const setPassword = (password: string): SetPassword => {
  return { type: 'SET_PASSWORD', newPassword: password }
}
export const setBirthDate = (newDate: Date): SetBirthDate => {
  return { type: 'SET_BIRTH_DATE', newBirthDate: newDate }
}
export const setGender = (newGender: Common.Gender): SetGender => {
  return { type: 'SET_GENDER', newGender: newGender }
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
            user: {
              ...state.user,
              email:validateAction.value,
            },
            isValidEmail: ['IN_PROGRESS'],
          }
        case 'RECIEVE_VALIDATE':
          // Only accept the incoming data if it matches the most recent request.
          // This ensures we correctly handle out-of-order responses.
          if (state.user.email === validateAction.value) {
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
            user: {
              ...state.user,
              username:validateAction.value,
            },
            isValidUsername: ['IN_PROGRESS'],
          }
        case 'RECIEVE_VALIDATE':
          // Only accept the incoming data if it matches the most recent request.
          // This ensures we correctly handle out-of-order responses.
          if (state.user.username === validateAction.value) {
            return {
              ...state,
              isValidUsername: ['RESOLVED', validateAction.result],
            }
          }
          break
      }
    } break
    case "PHONE_VALIDATE_KNOWNACTION": {
      const validateAction = action.value
      switch (validateAction.type) {
        case 'REQUEST_VALIDATE':
          return {
            ...state,
            user: {
              ...state.user,
              phone:validateAction.value,
            },
            isValidPhone: ['IN_PROGRESS'],
          }
        case 'RECIEVE_VALIDATE':
          // Only accept the incoming data if it matches the most recent request.
          // This ensures we correctly handle out-of-order responses.
          if (state.user.phone === validateAction.value) {
            return {
              ...state,
              isValidPhone: ['RESOLVED', validateAction.result],
            }
          }
          break
      }
    } break
    case "SET_PAGE": {
      const page = action.value
      return {
        ...state,
        page: page,
      }
    } break
    case "SET_NAME": {
      const newName = action.newName
      return {
        ...state,
        user: {
          ...state.user,
          name: newName,
        },
      }
    } break
    case "SET_PASSWORD": {
      const newPassword = action.newPassword
      return {
        ...state,
        user: {
          ...state.user,
          password: newPassword,
        },
      }
    } break
    case "SET_BIRTH_DATE": {
      const newBirthDate = action.newBirthDate
      return {
        ...state,
        user: {
          ...state.user,
          dateOfBirth: newBirthDate,
        },
      }
    } break
    case "SET_GENDER": {
      const newGender = action.newGender
      return {
        ...state,
        user: {
          ...state.user,
          gender: newGender,
        },
      }
    } break
  }
  return state
}
