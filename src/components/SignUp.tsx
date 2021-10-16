import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { StyleSheet, css, StyleDeclarationValue } from 'aphrodite/no-important'
import * as Reactstrap from 'reactstrap'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignUp'
import { Call, Deferred, deferredMatch } from '../common'
import { styles } from './SignIn'
import LogoBackground2 from './logoBackground2.jpg'
import LogoBackground3 from './logoBackground3.jpg'
import LogoBackground4 from './logoBackground4.jpg'


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


const pageStyle2 = StyleSheet.create({
  cover_group2: {
    display: 'flex',
    background: `url(${LogoBackground2}) center center / cover no-repeat`,
    borderRadius: '0px 20px 20px 0px',
  },
  cover_group3: {
    display: 'flex',
    background: `url(${LogoBackground3}) center center / cover no-repeat`,
    borderRadius: '0px 20px 20px 0px',
  },
  cover_group4: {
    display: 'flex',
    background: `url(${LogoBackground4}) center center / cover no-repeat`,
    borderRadius: '0px 20px 20px 0px',
  },
  columns: {
    display: 'flex',
  },
  column: {
    display: 'block',
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: '0.75rem',
    paddingLeft: '0.75rem',
  },
})


function Page(props: { coverStyle: StyleDeclarationValue, children?: JSX.Element }) {
  return (
    <div className={css(styles.centerContainer)}>
      <div className={css(styles.group, styles.group_layout)}>
        <div className={css(styles.group2)}>
          <div className={css(styles.flex_content)}>
            <div className={css(styles.flex_content_box, styles.flex_content_box_layout)}>
              {props.children}
            </div>
          </div>
          <div className={css(styles.flex_logo)}>
            <div className={css(props.coverStyle, styles.cover_group_layout)}>
              <div className={css(styles.logo_grid, styles.logo_grid_layout)}>
                <div className={css(styles.logo, styles.logo_layout)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
    <>
      <h1 className={css(styles.sign_in, styles.sign_in_layout)}>
        {'Sign Up'}
      </h1>
      <div>
        <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
          {'Name'}
        </h2>
        <Reactstrap.Input
          className={css(styles.input, styles.input_layout)}
          value={user.name}
          onChange={e => {
            dispatch(SignUpSlicer.setName(e.target.value))
          }}
        />
      </div>
      <div>
        <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
          {'Email'}
        </h2>
        <Reactstrap.Input
          className={css(styles.input, styles.input_layout)}
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
        <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
          {'Username'}
        </h2>
        <Reactstrap.Input
          className={css(styles.input, styles.input_layout)}
          value={user.username}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validateUsername(e.target.value))
          }}
          // disabled={props.isValidUsername[0] === 'IN_PROGRESS'}
        />
        <div>{state.isValidUsername}</div>
      </div>
      <Reactstrap.Button
        className={css(styles.button, styles.button_layout)}
        onClick={() => {
          isValid
          && dispatch(SignUpSlicer.setPage('SECOND'))
        }}
        disabled={!isValid}
      >
        <h1 className={css(styles.buttonLabel, styles.buttonLabel_layout)}>
          {'Next'}
        </h1>
      </Reactstrap.Button>
    </>
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
    <>
      <h1 className={css(styles.sign_in, styles.sign_in_layout)}>
        {'Sign Up'}
      </h1>
      <div>
        <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
          {'Password'}
        </h2>
        <Reactstrap.Input
          className={css(styles.input, styles.input_layout)}
          id="password"
          value={user.password}
          onChange={e => {
            dispatch(SignUpSlicer.setPassword(e.target.value))
          }}
        />
      </div>
      <div>
        <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
          {'Confirm the password'}
        </h2>
        <Reactstrap.Input
          className={css(styles.input, styles.input_layout)}
          value={passwordConfirmation}
          onChange={e => {
            setPasswordConfirmation(e.target.value)
          }}
        />
        <Call f={() => {
          if (user.password !== passwordConfirmation) {
            return <div style={{ color:'red' }}>Password mismatch</div>
          }
          return null
        }} />
      </div>
      <div>
        <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
          {'Phone'}
        </h2>
        <Reactstrap.Input
          className={css(styles.input, styles.input_layout)}
          value={user.phone}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validatePhone(e.target.value))
          }}
        />
        <div>{state.isValidPhone}</div>
      </div>
      <div className={css(pageStyle2.columns, styles.button_layout)}>
        <div className={css(pageStyle2.column)}>
          <Reactstrap.Button
            className={css(styles.button)}
            onClick={e => {
              dispatch(SignUpSlicer.setPage('FIRST'))
            }}
          >
            <h1 className={css(styles.buttonLabel, styles.buttonLabel_layout)}>
              {'Previous'}
            </h1>
          </Reactstrap.Button>
        </div>
        <div className={css(pageStyle2.column)}>
          <Reactstrap.Button
            className={css(styles.button)}
            onClick={e => {
              isValid
              && dispatch(SignUpSlicer.setPage('THIRD'))
            }}
            disabled={!isValid}
          >
            <h1 className={css(styles.buttonLabel, styles.buttonLabel_layout)}>
              {'Next'}
            </h1>
          </Reactstrap.Button>
        </div>
      </div>
    </>
  )
}

function ThirdPage() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )
  const dispatch = useDispatch()
  const isValid = true

  return (
    <div className={css(pageStyle2.columns, styles.button_layout)}>
      <div className={css(pageStyle2.column)}>
        <Reactstrap.Button
          className={css(styles.button)}
          onClick={e => {
            isValid
            && dispatch(SignUpSlicer.setPage('SECOND'))
          }}
          disabled={!isValid}
        >
          <h1 className={css(styles.buttonLabel, styles.buttonLabel_layout)}>
            {'Previous'}
          </h1>
        </Reactstrap.Button>
      </div>
      <div className={css(pageStyle2.column)}>
        <Reactstrap.Button
          className={css(styles.button)}
          onClick={() => alert('Not implemented yet')}
        >
          <h1 className={css(styles.buttonLabel, styles.buttonLabel_layout)}>
            {'Done'}
          </h1>
        </Reactstrap.Button>
      </div>
    </div>
  )
}

export default function SignUp() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )

  switch (state.page) {
    case "FIRST": { return <Page coverStyle={pageStyle2.cover_group2}><FirstPage /></Page> } break
    case "SECOND": { return <Page coverStyle={pageStyle2.cover_group3}><SecondPage /></Page> } break
    case "THIRD": { return <Page coverStyle={pageStyle2.cover_group4}><ThirdPage /></Page> } break
  }
  return null
}
