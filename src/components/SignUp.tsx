import * as React from 'react'
import { connect } from 'react-redux'
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

function FirstPage(props: SignUpProps) {
  const isValid =
    props.name !== ''
    && props.email !== ''
    && isAvailable(props.isValidEmail)
    && props.username !== ''
    && isAvailable(props.isValidUsername)

  return (
    <div>
      <div>
        <div>Name</div>
        <input
          value={props.name}
          onChange={e => {
            props.setName(e.target.value)
          }}
          // disabled={props.state[0] === 'IN_PROGRESS'}
        />
      </div>
      <div>
        <div>Email</div>
        <input
          value={props.email}
          onChange={e => {
            // setEmail(e.target.value)
            props.validateEmail(e.target.value)
          }}
          // disabled={props.isValidEmail[0] === 'IN_PROGRESS'}
        />
        <div>{props.isValidEmail}</div>
      </div>
      <div>
        <div>Username</div>
        <input
          value={props.username}
          onChange={e => {
            props.validateUsername(e.target.value)
          }}
          // disabled={props.isValidUsername[0] === 'IN_PROGRESS'}
        />
        <div>{props.isValidUsername}</div>
      </div>
      <button
        onClick={e => {
          isValid
          && props.setPage('SECOND')
        }}
        disabled={!isValid}
      >
        {'Next'}
      </button>
    </div>
  )
}

function SecondPage(props: SignUpProps) {
  const [passwordConfirmation, setPasswordConfirmation] = React.useState(props.password)
  const isValid =
    props.password !== ''
    && props.password === passwordConfirmation
    && props.phone !== ''
    && isAvailable(props.isValidPhone)

  return (
    <div>
      <div>
        <div>Password</div>
        <input
          value={props.password}
          onChange={e => {
            props.setPassword(e.target.value)
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
          if (props.password !== passwordConfirmation) {
          // } else {
            return <div style={{ color:'red' }}>Password mismatch</div>
          }
          return null
        }} />
      </div>
      <div>
        <div>Phone</div>
        <input
          value={props.phone}
          onChange={e => {
            props.validatePhone(e.target.value)
          }}
        />
        <div>{props.isValidPhone}</div>
      </div>
      <button
        onClick={e => {
          props.setPage('FIRST')
        }}
      >
        {'Previous'}
      </button>
      <button
        onClick={e => {
          isValid
          && props.setPage('THIRD')
        }}
        disabled={!isValid}
      >
        {'Next'}
      </button>
    </div>
  )
}

function ThirdPage(props: SignUpProps) {
  const isValid = true

  return (
    <div>
      <button
        onClick={e => {
          isValid
          && props.setPage('SECOND')
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

export function SignUp(props: SignUpProps) {
  switch (props.page) {
    case "FIRST": { return FirstPage(props) } break
    case "SECOND": { return SecondPage(props) } break
    case "THIRD": { return ThirdPage(props) } break
  }
}


export default connect(
  (state: ApplicationState) => state.signUp, // Selects which state properties are merged into the component's props
  SignUpSlicer.actionCreators // Selects which action creators are merged into the component's props
)(SignUp as any) // eslint-disable-line @typescript-eslint/no-explicit-any
