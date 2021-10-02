import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'
import * as Reactstrap from 'reactstrap'

import { ApplicationState } from '../store'
import * as Login from '../store/SignIn'
import LogoBackground from './logoBackground.png'
import Logo from './logo.png'
import { Deferred, deferredMatch, Call } from '../common'


const styles = StyleSheet.create({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  group: {
    display: 'flex',
  },
  group_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 1050,
    maxWidth: 1680,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flex: {
    display: 'flex',
    '@media (max-width: 991.98px)': {
      flexWrap: 'wrap',
    },
    background: 'rgb(255,255,255)',
    borderRadius: 20,
    boxShadow: "0 .25rem .75rem rgba(0, 0, 0, .05)",
  },
  flex_layout: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: '42px 73px 48px',
  },
  flex_logo: {
    display: 'flex',
    flex: '0 1 584px',
    '@media (max-width: 991.98px)': {
      flex: '0 0 100%',
    },
  },
  cover_group: {
    display: 'flex',
    '--src': `url(${LogoBackground})`,
    background: 'var(--src) center center / cover no-repeat',
    '@media (min-width: 991.98px)': {
      borderRadius: '20px 0px 0px 20px',
    },
    '@media (max-width: 991.98px)': {
      borderRadius: '20px 20px 0px 0px',
    },
  },
  cover_group_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 960,
    flexGrow: 1,
    margin: 0,
  },
  image: {
    '--src': `url(${Logo})`,
    background: 'var(--src) center center / contain no-repeat',
  },
  image_layout: {
    position: 'relative',
    height: 117,
    flexGrow: 1,
    margin: '706px 51px 137px 52px',
  },
  flex_content: {
    display: 'flex',
    flex: '1 1 694px',
    '@media (max-width: 991.98px)': {
      flex: '0 0 100%',
    },
  },
  flex_content_box: {
    display: 'flex',
    flexDirection: 'column',
  },
  flex_content_box_layout: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    '@media (min-width: 991.98px)': {
      margin: '128px 115px 195px',
    },
    '@media (max-width: 991.98px)': {
      margin: '96px 115px 195px',
    },
  },
  welcome: {
    font: '700 40px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(3,99,245)',
  },
  welcome_layout: {
    position: 'relative',
    '@media (min-width: 991.98px)': {
      margin: 0,
    },
    '@media (max-width: 991.98px)': {
      margin: '0px auto 0px',
    },
  },
  sign_in: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '700 32px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(0,0,0)',
    textAlign: 'right',
  },
  sign_in_layout: {
    position: 'relative',
    '@media (min-width: 991.98px)': {
      margin: '26px auto 0px',
    },
    '@media (max-width: 991.98px)': {
      margin: '56px auto 0px',
    },
  },
  email: {
    font: '700 25px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(0,0,0)',
  },
  email_layout: {
    position: 'relative',
    margin: '34px 11px 0px',
  },
  input: {
    backgroundColor: 'rgb(255,255,255)',
    border: '1px solid rgb(3,99,245)',
    borderRadius: '5px 5px 5px 5px',
  },
  input_layout: {
    position: 'relative',
    height: 52,
    margin: '15px 2px 0px 0px',
  },
  password: {
    font: '700 25px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(0,0,0)',
  },
  password_layout: {
    position: 'relative',
    margin: '34px 11px 0px',
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '700 20px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(0,0,0)',
    textAlign: 'right',
  },
  subtitle_layout: {
    position: 'relative',
    margin: '35px 0px 0px',
  },
  cover_group1: {
    display: 'flex',
    backgroundColor: 'rgb(3,99,245)',
    borderRadius: '7px 7px 7px 7px',
  },
  cover_group1_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 73,
    margin: '78px 2px 0px 0px',
  },
  sign_in1: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '700 30px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'right',
  },
  sign_in1_layout: {
    position: 'relative',
    margin: '18px auto 19px',
  },
  create_account: {
    font: '700 20px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: 'rgb(0,0,0)',
  },
  create_account_layout: {
    position: 'relative',
    display: 'block',
    margin: '28px auto 0px',
  },
})

// At runtime, Redux will merge together...
type LoginProps =
  Login.LoginState // ... state we've requested from the Redux store
  & typeof Login.actionCreators // ... plus action creators we've requested
  // eslint-disable-next-line @typescript-eslint/ban-types
  & RouteComponentProps<{}> // ... plus incoming routing parameters


export function SignIn(props: LoginProps) {
  const [ login, setLogin ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  return (
    <div className={`${css(styles.root)}`}>
      <div className={`${css(styles.group, styles.group_layout)}`}>
        <div className={css(styles.flex, styles.flex_layout)}>
          <div className={css(styles.flex_logo)}>
            <div className={css(styles.cover_group, styles.cover_group_layout)}>
              <div className={css(styles.image, styles.image_layout)} />
            </div>
          </div>
          <div className={css(styles.flex_content)}>
            <div className={css(styles.flex_content_box, styles.flex_content_box_layout)}>
              <h1 className={css(styles.welcome, styles.welcome_layout)}>
                {'Welcome'}
              </h1>
              <h1 className={css(styles.sign_in, styles.sign_in_layout)}>
                {'Sign In'}
              </h1>
              <h2 className={css(styles.email, styles.email_layout)}>
                {'Email or phone'}
              </h2>
              <Reactstrap.Input
                className={css(styles.input, styles.input_layout)}
                onChange={e => { setLogin(e.target.value)  }}
                disabled={props.state[0] === 'IN_PROGRESS'}
              />
              <h2 className={css(styles.password, styles.password_layout)}>
                {'Password'}
              </h2>
              <Reactstrap.Input
                className={css(styles.input, styles.input_layout)}
                onChange={e => { setPassword(e.target.value) }}
                disabled={props.state[0] === 'IN_PROGRESS'}
              />
              <h3 className={css(styles.subtitle, styles.subtitle_layout)} >
                <a onClick={() => void alert("Not implemented yet")}>
                  {'Forgot Password?'}
                </a>
              </h3>
              <div>
                <Reactstrap.Button
                  className={css(styles.cover_group1, styles.cover_group1_layout)}
                  onClick={() => {
                    login
                    && password
                    && props.state[0] !== 'IN_PROGRESS'
                    && props.requestLogin(login, password)
                  }}
                  disabled={login === '' || password === '' || props.state[0] === 'IN_PROGRESS'}
                >
                  <h1 className={css(styles.sign_in1, styles.sign_in1_layout)}>
                    {'Sign In'}
                  </h1>
                </Reactstrap.Button>
                { props.state[0] === 'IN_PROGRESS' && (
                    <Reactstrap.Spinner role="status">
                      Loading...
                    </Reactstrap.Spinner>
                )}
                <Call f={() => {
                  switch (props.state[0]) {
                    case 'RESOLVED':
                      const res = props.state[1]
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
                  styles.create_account_layout
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

export default connect(
  (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
  Login.actionCreators // Selects which action creators are merged into the component's props
)(SignIn as any) // eslint-disable-line @typescript-eslint/no-explicit-any
