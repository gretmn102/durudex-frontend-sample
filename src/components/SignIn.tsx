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
    background: `url(${LogoBackground}) center center / cover no-repeat`,
    borderRadius: '20px 0px 0px 20px',
  },
  welcome: {
    font: '700 40px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(3,99,245)',
    fontSize: resizeByHeight(40),
  },
  welcome_layout: {
    position: 'relative',
    margin: 0,
    [`@media (max-width:  ${breakSize}px)`]: {
      margin: '0px auto 0px',
    },
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '700 20px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(20),
    color: 'rgb(0,0,0)',
    textAlign: 'right',
  },
  subtitle_layout: {
    position: 'relative',
    marginTop: resizeByHeight(35),
  },
  create_account: {
    font: '700 20px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(20),
    color: 'rgb(0,0,0)',
  },
  create_account_layout: {
    position: 'relative',
    display: 'block',
    marginTop: resizeByHeight(28),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
})

export default function SignIn() {
  const [ login, setLogin ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const loginState = useSelector(
    (state: ApplicationState) => state.login,
  )
  const dispatch = useDispatch()

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
            <div className={css(sharedStyles.flex_content_box, sharedStyles.flex_content_box_layout)}>
              <h1 className={css(styles.welcome, styles.welcome_layout)}>
                {'Welcome'}
              </h1>
              <h1 className={css(sharedStyles.sign_in, sharedStyles.sign_in_layout)}>
                {'Sign In'}
              </h1>
              <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
                {'Email or phone'}
              </h2>
              <input
                className={css(sharedStyles.input, sharedStyles.input_layout)}
                onChange={e => { setLogin(e.target.value)  }}
                disabled={loginState.state[0] === 'IN_PROGRESS'}
              />
              <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
                {'Password'}
              </h2>
              <input
                className={css(sharedStyles.input, sharedStyles.input_layout)}
                onChange={e => { setPassword(e.target.value) }}
                disabled={loginState.state[0] === 'IN_PROGRESS'}
              />
              <h3 className={css(styles.subtitle, styles.subtitle_layout)} >
                <a onClick={() => void alert("Not implemented yet")}>
                  {'Forgot Password?'}
                </a>
              </h3>
              <div>
                <Reactstrap.Button
                  className={css(sharedStyles.button, sharedStyles.button_layout)}
                  onClick={() => {
                    login
                    && password
                    && loginState.state[0] !== 'IN_PROGRESS'
                    && dispatch(SignUpSlicer.actionCreators.requestLogin(login, password))
                  }}
                  disabled={login === '' || password === '' || loginState.state[0] === 'IN_PROGRESS'}
                >
                  <h1 className={css(sharedStyles.buttonLabel, sharedStyles.buttonLabel_layout)}>
                    {'Sign In'}
                  </h1>
                </Reactstrap.Button>
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
              <h3
                className={css(
                  styles.create_account,
                  styles.create_account_layout,
                )}>
                <Link to="/sign-up">
                  {'Create Account'}
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
