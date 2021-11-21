import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'
import * as Reactstrap from 'reactstrap'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignIn'
import LogoBackground from './logoBackground.jpg'
import { Deferred, deferredMatch, Call } from '../common'
import { breakSize, resizeByHeight, resizeByWidth, sharedStyles } from './sharedStyles'

const styles = StyleSheet.create({
  white: {
    background: 'rgb(255,255,255)',
  },
  cover_group: {
    display: 'flex',
    background: `linear-gradient(0deg, rgba(115, 91, 135, 0.4), rgba(115, 91, 135, 0.4)), url(${LogoBackground}) center center / cover no-repeat`,
    borderRadius: '20px 0px 0px 20px',
  },
  welcome: {
    fontSize: resizeByHeight(40),
    fontWeight: 700,

    color: 'rgb(3,99,245)',
  },
  welcome_layout: {
    position: 'relative',
    margin: 0,
    [`@media (max-width:  ${breakSize}px)`]: {
      margin: '0px auto 0px',
    },
  },
  forgotPassword: {
    fontSize: resizeByHeight(20),
    fontWeight: 700,
  },
  create_account: {
    fontSize: resizeByHeight(20),
    fontWeight: 700,

    color: 'rgb(0,0,0)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: `${141/977 * 100}% min-content ${35/977 * 100}% auto ${144/977 * 100}%`,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: '\n' +
      '"."\n' +
      '"welcome-container"\n' +
      '"."\n' +
      '"form-container"\n' +
      '"."\n' +
      '',
    height: '100%',
    flexGrow: 1,
  },
  welcomeContainer: {
    display: 'grid',
    gridTemplateColumns: `${118/1160 * 100}% min-content ${843/1160 * 100}%`,
    gridTemplateRows: 'auto',
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: '\n' +
      '". welcome-text ."\n' +
      '',
    gridArea: 'welcome-container',
    [`@media (max-width:  ${breakSize}px)`]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  welcomeText: {
    gridArea: 'welcome-text',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: `${182/1160 * 100}% auto ${182/1160 * 100}%`,
    gridTemplateRows: `${39/608 * 100}% ${37/608 * 100}% ${102/608 * 100}% ${15/608 * 100}% ${102/608 * 100}% ${60/608 * 100}% ${24/608 * 100}% ${123/608 * 100}% auto ${12/608 * 100}% ${24/608 * 100}%`,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: '\n' +
      '". sign-in-text ."\n' +
      '". . ."\n' +
      '". login-input-container ."\n' +
      '". . ."\n' +
      '". password-input-container ."\n' +
      '". . ."\n' +
      '". forgot-password-container ."\n' +
      '". . ."\n' +
      '". signin-button-container ."\n' +
      '". . ."\n' +
      '". create-account-container ."\n' +
      '',
    gridArea: 'form-container',
    height: '100%',
  },
  signInText: {
    gridArea: 'sign-in-text',

    display: 'flex',
    justifyContent: 'center',
  },
  loginInputContainer: {
    gridArea: 'login-input-container',
  },
  passwordInputContainer: {
    gridArea: 'password-input-container',
  },
  forgotPasswordContainer: {
    display: 'grid',
    gridTemplateColumns: '10fr auto 0.5fr',
    gridTemplateRows: 'min-content',
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: '\n' +
      '". forgot-password-text ."\n' +
      '',
    gridArea: 'forgot-password-container',
  },
  forgotPasswordText: {
    gridArea: 'forgot-password-text',
  },
  signinButtonContainer: {
    display: 'grid',
    gridTemplateColumns: `${42.5/796 * 100}% auto ${42.5/796 * 100}%`,
    gridTemplateRows: '1fr',
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: '\n' +
      '". signin-button ."\n' +
      '',
    gridArea: 'signin-button-container',
  },
  signinButton: {
    gridArea: 'signin-button',
  },
  createAccountContainer: {
    gridArea: 'create-account-container',

    display: 'flex',
    justifyContent: 'center',
  },
})

function Form() {
  const [ login, setLogin ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const loginState = useSelector(
    (state: ApplicationState) => state.login,
  )
  const dispatch = useDispatch()

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.welcomeContainer)}>
        <div className={css(styles.welcomeText, styles.welcome)}>
          {'Welcome'}
        </div>
      </div>
      <div className={css(styles.formContainer)}>
        <div className={css(styles.signInText, sharedStyles.sign_in)}>
          {'Sign In'}
        </div>
        <div className={css(styles.loginInputContainer)}>
          <div className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
            {'Email or phone'}
          </div>
          <input
            className={css(sharedStyles.input)}
            onChange={e => { setLogin(e.target.value)  }}
            disabled={loginState.state[0] === 'IN_PROGRESS'}
          />
        </div>
        <div className={css(styles.passwordInputContainer)}>
          <div className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
            {'Password'}
          </div>
          <input
            className={css(sharedStyles.input)}
            onChange={e => { setPassword(e.target.value) }}
            disabled={loginState.state[0] === 'IN_PROGRESS'}
          />
        </div>
        <div className={css(styles.forgotPasswordContainer)}>
          <div className={css(styles.forgotPasswordText, styles.forgotPassword)}>
            <a onClick={() => void alert("Not implemented yet")}>
              {'Forgot Password?'}
            </a>
          </div>
        </div>
        <div className={css(styles.signinButtonContainer)}>
          <div className={css(styles.signinButton)}>
            <button
              className={css(sharedStyles.button)}
              onClick={() => {
                login
                && password
                && loginState.state[0] !== 'IN_PROGRESS'
                && dispatch(SignUpSlicer.actionCreators.requestLogin(login, password))
              }}
              disabled={login === '' || password === '' || loginState.state[0] === 'IN_PROGRESS'}
            >
              <div className={css(sharedStyles.buttonLabel)}>
                {'Sign In'}
              </div>
            </button>
            { loginState.state[0] === 'IN_PROGRESS' && (
                <Reactstrap.Spinner role="status">
                  Loading...
                </Reactstrap.Spinner>
            )}
            <Call f={() => {
              switch (loginState.state[0]) {
                case 'RESOLVED':
                  const res = loginState.state[1]
                  switch (res[0]) {
                    case 'OK':
                      return (<div>Ok</div>)
                      break
                    case "ERROR":
                      return (<div style={{color: "red"}}>{res[1]}</div>)
                      break
                  }
                  break
                case "HAS_NOT_STARTED_YET":
                  return null
                  break
                case "IN_PROGRESS":
                  return null
                  break
              }
              return null
            }} />
          </div>
        </div>
        <div className={css(styles.createAccountContainer)}>
          <div className={css(styles.create_account)}>
            <Link to="/sign-up">
              {'Create Account'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <div className={css(sharedStyles.centerContainer)}>
      <div className={css(sharedStyles.group_layout)}>
        <div className={css(sharedStyles.window_box)}>
          <div className={css(sharedStyles.flex_logo)}>
            <div className={css(styles.cover_group, sharedStyles.cover_group_layout)}>
              <div className={css(sharedStyles.logo_grid, sharedStyles.logo_grid_layout)}>
                <div className={css(sharedStyles.logo, sharedStyles.logo_layout)} />
              </div>
            </div>
          </div>
          <div className={css(sharedStyles.flex_content)}>
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
