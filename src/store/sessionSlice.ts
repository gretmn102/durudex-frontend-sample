import { Action, Reducer } from 'redux'

export type Gender =
  | 'UNDEFINED'
  | 'MALE'
  | 'FEMALE'

export const genders: [Gender, string] [] = [
  ['UNDEFINED', 'Non-binary'],
  ['MALE', 'Male'],
  ['FEMALE', 'Female'],
]

export type CurrentUser = {
  name: string
  email: string
  username: string
  password: string
  phone: string
  dateOfBirth: Date
  gender: Gender
  avatar: string
}

export const userEmpty: CurrentUser = {
  name: '',
  email: '',
  username: '',
  password: '',
  phone: '',
  dateOfBirth: new Date(),
  gender: 'UNDEFINED',
  avatar: '',
}

export type Session = {
  user: CurrentUser
  isLogin: boolean
}

export const sessionEmpty = {
  user: userEmpty,
  isLogin: false,
}

export type SetUser = {
  type: 'SET_USER'
  newUser: CurrentUser
}

export const setUser = (user: CurrentUser): SetUser => {
  return {
    type: 'SET_USER',
    newUser: user,
  }
}

type KnownAction = SetUser // | SetName | SetPassword

export const reducer: Reducer<Session> = (
  state: Session | undefined,
  incomingAction: Action,
): Session => {
  if (state === undefined) {
    return sessionEmpty
  }
  const action = incomingAction as KnownAction

  switch (action.type) {
    case 'SET_USER': {
      return {
        user: action.newUser,
        isLogin: true,
      }
    } break
    // case "SET_NAME": {
    //   const newName = action.newName
    //   return {
    //     ...state,
    //     name: newName,
    //   }
    // } break
    // case "SET_PASSWORD": {
    //   const newPassword = action.newPassword
    //   return {
    //     ...state,
    //     password: newPassword,
    //   }
    // } break
  }
  return state
}
