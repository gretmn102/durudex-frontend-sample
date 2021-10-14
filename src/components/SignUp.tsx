import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'
import * as Reactstrap from 'reactstrap'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignUp'
import LogoBackground from './logoBackground.png'
import Logo from './logo.png'
import { Call, Deferred, deferredMatch } from '../common'


type SignUpProps =
  SignUpSlicer.LoginState
  & typeof SignUpSlicer.actionCreators // ... plus action creators we've requested
  // eslint-disable-next-line @typescript-eslint/ban-types
  & RouteComponentProps<{}> // ... plus incoming routing parameters

function isAvailable(res: Deferred<SignUpSlicer.Result>) {
  switch (res[0]) {
    case "RESOLVED": {
      const [, val] = res
      switch (val[0]) {
        case 'AVAILABLE':
          return true
          break
        default:
          return false
          break
      }
      return false
    } break

    default:
      return false
      break
  }
  return false
}

function FirstPage() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )
  const dispatch = useDispatch()
  const user = state.user

  const isValid =
    user.name !== ''
    && user.email !== ''
    && isAvailable(state.isValidEmail)
    && user.username !== ''
    && isAvailable(state.isValidUsername)

  return (
    <div>
      <div>
        <div>Name</div>
        <input
          value={user.name}
          onChange={e => {
            dispatch(SignUpSlicer.setName(e.target.value))
          }}
          // disabled={props.state[0] === 'IN_PROGRESS'}
        />
      </div>
      <div>
        <div>Email</div>
        <input
          value={user.email}
          onChange={e => {
            // setEmail(e.target.value)
            dispatch(SignUpSlicer.actionCreators.validateEmail(e.target.value))
          }}
          // disabled={props.isValidEmail[0] === 'IN_PROGRESS'}
        />
        <Call f={() => {
          const res = state.isValidEmail
          switch (res[0]) {
            case "RESOLVED": {
              const [, val] = res
              switch (val[0]) {
                case "ERROR": {
                  return <div style={{ color:'red' }}>{val[1]}</div>
                } break
                case 'AVAILABLE':
                  return null
                  break
              }
            } break
            case "HAS_NOT_STARTED_YET": { return null } break
            case "IN_PROGRESS": {
              return (
                <Reactstrap.Spinner role="status">
                  Loading...
                </Reactstrap.Spinner>
              )
            } break
          }
          return null
        }} />
      </div>
      <div>
        <div>Username</div>
        <input
          value={user.username}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validateUsername(e.target.value))
          }}
          // disabled={props.isValidUsername[0] === 'IN_PROGRESS'}
        />
        <div>{state.isValidUsername}</div>
      </div>
      <button
        onClick={e => {
          isValid
          && dispatch(SignUpSlicer.setPage('SECOND'))
        }}
        disabled={!isValid}
      >
        {'Next'}
      </button>
    </div>
  )
}

function SecondPage() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )
  const dispatch = useDispatch()
  const user = state.user

  const [passwordConfirmation, setPasswordConfirmation] = React.useState(user.password)
  const isValid =
    user.password !== ''
    && user.password === passwordConfirmation
    && user.phone !== ''
    && isAvailable(state.isValidPhone)

  return (
    <div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={user.password}
          onChange={e => {
            dispatch(SignUpSlicer.setPassword(e.target.value))
          }}
        />
      </div>
      <div>
        <div>Confirm the password</div>
        <input
          value={passwordConfirmation}
          onChange={e => {
            setPasswordConfirmation(e.target.value)
          }}
        />
        <Call f={() => {
          if (user.password !== passwordConfirmation) {
          // } else {
            return <div style={{ color:'red' }}>Password mismatch</div>
          }
          return null
        }} />
      </div>
      <div>
        <div>Phone</div>
        <input
          value={user.phone}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validatePhone(e.target.value))
            // state.validatePhone(e.target.value)
          }}
        />
        <div>{state.isValidPhone}</div>
      </div>
      <button
        onClick={e => {
          dispatch(SignUpSlicer.setPage('FIRST'))
        }}
      >
        {'Previous'}
      </button>
      <button
        onClick={e => {
          isValid
          && dispatch(SignUpSlicer.setPage('THIRD'))
        }}
        disabled={!isValid}
      >
        {'Next'}
      </button>
    </div>
  )
}

function ThirdPage() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )
  const dispatch = useDispatch()
  const isValid = true

  return (
    <div>
      <button
        onClick={e => {
          isValid
          && dispatch(SignUpSlicer.setPage('SECOND'))
        }}
        disabled={!isValid}
      >
        {'Previous'}
      </button>
      <button onClick={() => alert('Not implemented yet')}>
        {'Done'}
      </button>
    </div>
  )
}

export default function SignUp() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )

  switch (state.page) {
    case "FIRST": { return <FirstPage /> } break
    case "SECOND": { return <SecondPage /> } break
    case "THIRD": { return <ThirdPage /> } break
  }
  return null
}
