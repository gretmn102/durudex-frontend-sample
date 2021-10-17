import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, css, StyleDeclarationValue } from 'aphrodite/no-important'
import * as Reactstrap from 'reactstrap'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignUp'
import { Call, Deferred, deferredMatch } from '../common'
import { sharedStyles } from './sharedStyles'
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


const styles = StyleSheet.create({
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
    <div className={css(sharedStyles.centerContainer)}>
      <div className={css(sharedStyles.group_layout)}>
        <div className={css(sharedStyles.window_box)}>
          <div className={css(sharedStyles.flex_content)}>
            <div className={css(sharedStyles.flex_content_box, sharedStyles.flex_content_box_layout)}>
              {props.children}
            </div>
          </div>
          <div className={css(sharedStyles.flex_logo)}>
            <div className={css(props.coverStyle, sharedStyles.cover_group_layout)}>
              <div className={css(sharedStyles.logo_grid, sharedStyles.logo_grid_layout)}>
                <div className={css(sharedStyles.logo, sharedStyles.logo_layout)} />
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
      <h1 className={css(sharedStyles.sign_in, sharedStyles.sign_in_layout)}>
        {'Sign Up'}
      </h1>
      <div>
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Name'}
        </h2>
        <input
          className={css(sharedStyles.input, sharedStyles.input_layout)}
          value={user.name}
          onChange={e => {
            dispatch(SignUpSlicer.setName(e.target.value))
          }}
        />
      </div>
      <div>
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Email'}
        </h2>
        <input
          className={css(sharedStyles.input, sharedStyles.input_layout)}
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
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Username'}
        </h2>
        <input
          className={css(sharedStyles.input, sharedStyles.input_layout)}
          value={user.username}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validateUsername(e.target.value))
          }}
          // disabled={props.isValidUsername[0] === 'IN_PROGRESS'}
        />
        <div>{state.isValidUsername}</div>
      </div>
      <button
        className={css(sharedStyles.button, sharedStyles.button_layout)}
        onClick={() => {
          isValid
          && dispatch(SignUpSlicer.setPage('SECOND'))
        }}
        disabled={!isValid}
      >
        <h1 className={css(sharedStyles.buttonLabel, sharedStyles.buttonLabel_layout)}>
          {'Next'}
        </h1>
      </button>
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
      <h1 className={css(sharedStyles.sign_in, sharedStyles.sign_in_layout)}>
        {'Sign Up'}
      </h1>
      <div>
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Password'}
        </h2>
        <input
          className={css(sharedStyles.input, sharedStyles.input_layout)}
          id="password"
          value={user.password}
          onChange={e => {
            dispatch(SignUpSlicer.setPassword(e.target.value))
          }}
        />
      </div>
      <div>
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Confirm the password'}
        </h2>
        <input
          className={css(sharedStyles.input, sharedStyles.input_layout)}
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
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Phone'}
        </h2>
        <input
          className={css(sharedStyles.input, sharedStyles.input_layout)}
          value={user.phone}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validatePhone(e.target.value))
          }}
        />
        <div>{state.isValidPhone}</div>
      </div>
      <div className={css(styles.columns, sharedStyles.button_layout)}>
        <div className={css(styles.column)}>
          <button
            className={css(sharedStyles.button)}
            onClick={e => {
              dispatch(SignUpSlicer.setPage('FIRST'))
            }}
          >
            <h1 className={css(sharedStyles.buttonLabel, sharedStyles.buttonLabel_layout)}>
              {'Previous'}
            </h1>
          </button>
        </div>
        <div className={css(styles.column)}>
          <button
            className={css(sharedStyles.button)}
            onClick={e => {
              isValid
              && dispatch(SignUpSlicer.setPage('THIRD'))
            }}
            disabled={!isValid}
          >
            <h1 className={css(sharedStyles.buttonLabel, sharedStyles.buttonLabel_layout)}>
              {'Next'}
            </h1>
          </button>
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
    <div className={css(styles.columns, sharedStyles.button_layout)}>
      <div className={css(styles.column)}>
        <button
          className={css(sharedStyles.button)}
          onClick={e => {
            isValid
            && dispatch(SignUpSlicer.setPage('SECOND'))
          }}
          disabled={!isValid}
        >
          <h1 className={css(sharedStyles.buttonLabel, sharedStyles.buttonLabel_layout)}>
            {'Previous'}
          </h1>
        </button>
      </div>
      <div className={css(styles.column)}>
        <button
          className={css(sharedStyles.button)}
          onClick={() => alert('Not implemented yet')}
        >
          <h1 className={css(sharedStyles.buttonLabel, sharedStyles.buttonLabel_layout)}>
            {'Done'}
          </h1>
        </button>
      </div>
    </div>
  )
}

export default function SignUp() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )

  switch (state.page) {
    case "FIRST": { return <Page coverStyle={styles.cover_group2}><FirstPage /></Page> } break
    case "SECOND": { return <Page coverStyle={styles.cover_group3}><SecondPage /></Page> } break
    case "THIRD": { return <Page coverStyle={styles.cover_group4}><ThirdPage /></Page> } break
  }
  return null
}
