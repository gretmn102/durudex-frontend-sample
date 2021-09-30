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
import { Deferred, deferredMatch } from '../common'


type SignUpProps =
  SignUpSlicer.LoginState
  & typeof SignUpSlicer.actionCreators // ... plus action creators we've requested
  // eslint-disable-next-line @typescript-eslint/ban-types
  & RouteComponentProps<{}> // ... plus incoming routing parameters


export function SignUp(props: SignUpProps) {
  const [name, setName] = React.useState('')

  function isValid2(x: Deferred<SignUpSlicer.Result>) {
    switch (x[0]) {
      case "RESOLVED": {
        const [, val] = x
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
      case "HAS_NOT_STARTED_YET": {
        return false
      } break
      case "IN_PROGRESS": {
        return false
      } break
    }
    return false
  }

  return (
    <div>
      <div>
        <div>Name</div>
        <input
          onChange={e => void setName(e.target.value)}
        />
      </div>
      <div>
        <div>Email</div>
        <input
          value={props.email}
          onChange={e => {
            props.validateEmail(e.target.value)
          }}
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
        />
        <div>{props.isValidUsername}</div>
      </div>
    </div>
  )
}


export default connect(
  (state: ApplicationState) => state.signUp, // Selects which state properties are merged into the component's props
  SignUpSlicer.actionCreators // Selects which action creators are merged into the component's props
)(SignUp as any) // eslint-disable-line @typescript-eslint/no-explicit-any
