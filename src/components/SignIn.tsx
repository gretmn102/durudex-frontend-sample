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

const initHeight = 1050
const initWidth = 1680

const resizeByHeight = (coeff: number) => `calc((100vh * ${coeff}) / ${initHeight})`
const resizeByWidth = (coeff: number) => `calc((100vw * ${coeff}) / ${initWidth})`

const breakSize = 450

const styles = StyleSheet.create({
  centerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
  },
  white: {
    background: 'rgb(255,255,255)',
  },
  group: {

  },
  group_layout: {
    width: initWidth,
    marginTop: resizeByHeight(42),
    marginRight: resizeByWidth(73),
    marginBottom: resizeByHeight(48),
    marginLeft: resizeByWidth(73),
  },
  group2: {
    display: 'flex',
    borderRadius: 20,
    boxShadow: "0 .25rem .75rem rgba(0, 0, 0, .05)",
    background: 'rgb(255,255,255)',
  },
  flex_logo: {
    display: 'flex',
    flex: '0 1 584px',
  },
  cover_group: {
    display: 'flex',
    background: `url(${LogoBackground}) center center / cover no-repeat`,
    borderRadius: '20px 0px 0px 20px',
  },
  cover_group_layout: {
    height: resizeByHeight(960),
    flexGrow: 1,
  },
  logo: {
    background: `url(${Logo}) center center / contain no-repeat`,
  },
  logo_grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '2.1fr 0.7fr 0.2fr',
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: '\n' +
    '  "."\n' +
    '  "logo_layout"\n' +
    '  "."\n' +
    '',
  },
  logo_grid_layout: {
    position: 'relative',
    flexGrow: 1,
  },
  logo_layout: { gridArea: 'logo_layout' },
  flex_content: {
    display: 'flex',
    flex: '1 1 694px',
    [`@media (max-width:  ${breakSize}px)`]: {
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
    marginTop: resizeByHeight(128),
    marginRight: resizeByWidth(115),
    marginLeft: resizeByWidth(115),
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
  sign_in: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '700 32px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(32),
    color: 'rgb(0,0,0)',
    textAlign: 'right',
  },
  sign_in_layout: {
    position: 'relative',
    marginTop: resizeByHeight(26),
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    [`@media (max-width:  ${breakSize}px)`]: {
      marginTop: resizeByHeight(56),
    },
  },
  inputTitle: {
    font: '700 25px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(25),
    color: 'rgb(0,0,0)',
  },
  inputTitle_layout: {
    position: 'relative',
    marginTop: resizeByHeight(34),
  },
  input: {
    backgroundColor: 'rgb(255,255,255)',
    border: '1px solid rgb(3,99,245)',
    borderRadius: '5px 5px 5px 5px',
    fontSize: 40,
  },
  input_layout: {
    position: 'relative',
    height: resizeByHeight(52),
    marginTop: resizeByHeight(15),
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
  cover_group1: {
    display: 'flex',
    width: '100%',
    padding: 0,
    backgroundColor: 'rgb(3,99,245)',
    borderRadius: '7px 7px 7px 7px',
  },
  cover_group1_layout: {
    position: 'relative',
    overflow: 'visible',
    marginTop: resizeByHeight(78),
  },
  sign_in1: {
    display: 'flex',
    font: '700 30px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(30),
    color: 'rgb(255,255,255)',
  },
  sign_in1_layout: {
    position: 'relative',
    marginTop: resizeByHeight(18),
    marginRight: 'auto',
    marginBottom: resizeByHeight(18),
    marginLeft: 'auto',
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
    <div className={css(styles.centerContainer)}>
      <div className={css(styles.group, styles.group_layout)}>
        <div className={css(styles.group2)}>
          <div className={css(styles.flex_logo)}>
            <div className={css(styles.cover_group, styles.cover_group_layout)}>
              <div className={css(styles.logo_grid, styles.logo_grid_layout)}>
                <div className={css(styles.logo, styles.logo_layout)} />
              </div>
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
              <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
                {'Email or phone'}
              </h2>
              <Reactstrap.Input
                className={css(styles.input, styles.input_layout)}
                onChange={e => { setLogin(e.target.value)  }}
                disabled={props.state[0] === 'IN_PROGRESS'}
              />
              <h2 className={css(styles.inputTitle, styles.inputTitle_layout)}>
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

export default connect(
  (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
  Login.actionCreators, // Selects which action creators are merged into the component's props
)(SignIn as any) // eslint-disable-line @typescript-eslint/no-explicit-any
