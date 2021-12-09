import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignIn'
import LogoBackground from './logoBackground.jpg'
import { Deferred, deferredMatch, Call } from '../common'
import { breakSize, Input, invalidColor, resizeByHeight, resizeByWidth, sharedStyles } from './sharedStyles'

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
    grid: `
      "." ${141/977 * 100}%
      "welcome-container" min-content
      "." ${35/977 * 100}%
      "form-container"
      "." ${144/977 * 100}%
      /
      auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    height: '100%',
    flexGrow: 1,
  },
  welcomeContainer: {
    display: 'grid',
    grid: `
      ". welcome-text ."
      /
      ${118/1160 * 100}% min-content ${843/1160 * 100}%
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
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
    grid: `
      ". sign-in-text ." ${39/608 * 100}%
      ". . ." ${37/608 * 100}%
      ". login-input-container ." ${102/608 * 100}%
      ". . ." ${15/608 * 100}%
      ". password-input-container ." ${102/608 * 100}%
      ". . ." ${60/608 * 100}%
      ". forgot-password-container ." ${24/608 * 100}%
      ". . ." ${15/608 * 100}%
      ". error-container ." auto
      ". . ." ${15/608 * 100}%
      ". signin-button-container ." ${73/608 * 100}%
      ". . ." ${12/608 * 100}%
      ". create-account-container ." ${24/608 * 100}%
      /
      auto ${796/1160 * 100}% auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
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
    grid: `
      ". forgot-password-text ." min-content
      /
      10fr auto 0.5fr
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridArea: 'forgot-password-container',
  },
  forgotPasswordText: {
    gridArea: 'forgot-password-text',
  },
  errorContainer: {
    gridArea: 'error-container',

    display: 'flex',
    alignItems: 'center',

    marginLeft: 8,
  },
  errorText: {
    color: invalidColor,
    fontSize: resizeByHeight(25),
  },
  signinButtonContainer: {
    display: 'grid',
    grid: `
      ". signin-button ."
      /
      auto ${711/796 * 100}% auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridArea: 'signin-button-container',
  },
  signinButton: {
    position: 'relative',
    gridArea: 'signin-button',
  },
  createAccountContainer: {
    gridArea: 'create-account-container',

    display: 'flex',
    justifyContent: 'center',
  },
  signinButtonSpinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonSpinner: {
    width: '100%',
    height: '100%',
    color: 'white',
  },
})

function Form() {
  const [ login, setLogin ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const loginState = useSelector(
    (state: ApplicationState) => state.login,
  )
  const [ responseResult, setResponseResult ] = React.useState(loginState.state)

  React.useEffect(() => {
    setResponseResult(loginState.state)
  }, [loginState.state])

  const dispatch = useDispatch()

  const isResponseError =
    responseResult[0] === 'RESOLVED'
    && responseResult[1][0] === 'ERROR'

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
          <Input
            inputTitle="Email or phone"
            onChange={e => {
              setResponseResult(['HAS_NOT_STARTED_YET'])
              setLogin(e.target.value)
            }}
            isDisabled={responseResult[0] === 'IN_PROGRESS'}
            isLoading={false}
            isInvalid={isResponseError ? 'INVALID' : 'NORMAL'}
          />
        </div>
        <div className={css(styles.passwordInputContainer)}>
          <Input
            inputTitle="Password"
            onChange={e => {
              setResponseResult(['HAS_NOT_STARTED_YET'])
              setPassword(e.target.value)
            }}
            isDisabled={responseResult[0] === 'IN_PROGRESS'}
            isLoading={false}
            isInvalid={isResponseError ? 'INVALID' : 'NORMAL'}
            type="password"
          />
        </div>
        <div className={css(styles.forgotPasswordContainer)}>
          <div className={css(styles.forgotPasswordText, styles.forgotPassword)}>
            <a onClick={() => void alert("Not implemented yet")}>
              {'Forgot Password?'}
            </a>
          </div>
        </div>
        <Call f={() => {
          switch (responseResult[0]) {
            case 'RESOLVED':
              const res = responseResult[1]
              switch (res[0]) {
                case 'OK':
                  return (<div>Ok</div>)
                  break
                case "ERROR":
                  return (
                    <div className={css(styles.errorContainer, styles.errorText)}>
                      {res[1]}
                    </div>
                  )
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
        <div className={css(styles.signinButtonContainer)}>
          <div className={css(styles.signinButton)}>
            <button
              className={css(sharedStyles.button)}
              onClick={() => {
                login
                && password
                && responseResult[0] !== 'IN_PROGRESS'
                && dispatch(SignUpSlicer.actionCreators.requestLogin(login, password))
              }}
              disabled={login === '' || password === '' || responseResult[0] === 'IN_PROGRESS'}
            >
              <div className={css(sharedStyles.buttonLabel)}>
                {'Sign In'}
              </div>
              { responseResult[0] === 'IN_PROGRESS' && (
                <div
                  className={css(styles.signinButtonSpinnerContainer)}
                >
                  <FontAwesomeIcon
                    className={css(styles.signinButtonSpinner)}
                    icon={['fas', 'spinner']}
                    fixedWidth={true}
                    size="2x"
                    pulse
                  />
                </div>
              )}
            </button>
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
