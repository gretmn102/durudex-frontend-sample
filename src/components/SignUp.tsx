import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, css, StyleDeclarationValue } from 'aphrodite/no-important'
import * as Reactstrap from 'reactstrap'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignUp'
import { Call, Deferred, deferredMatch } from '../common'
import { Input, resizeByHeight, sharedStyles } from './sharedStyles'
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
  signup: {
    fontWeight: 'bold',
    fontSize: resizeByHeight(50),
    color: '#0263F4',
    lineHeight: 'normal',
  },
})


function Page(props: { coverStyle: StyleDeclarationValue, children?: JSX.Element }) {
  return (
    <div className={css(sharedStyles.centerContainer)}>
      <div className={css(sharedStyles.group_layout)}>
        <div className={css(sharedStyles.window_box)}>
          <div className={css(sharedStyles.flex_content)}>
            {props.children}
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

const firstPageStyles = StyleSheet.create({
  container: {
    display: 'grid',
    grid: `
      ". . ." ${178/977 * 100}%
      ". signup-container ." min-content
      ". . ." ${40/977 * 100}%
      ". form-container ."
      ". . ." ${113/977 * 100}%
      ". next-container ." ${73/977 * 100}%
      ". . ." ${178/977 * 100}%
      /
      auto ${796/1160 * 100}% auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    flexGrow: 1,
    height: '100%',
  },
  signupContainer: {
    gridArea: 'signup-container',

    display: 'flex',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'grid',
    grid: `
      "name-container" ${100/330 * 100}%
      "."
      "email-container" ${100/330 * 100}%
      "."
      "username-container" ${100/330 * 100}%
      /
      auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridArea: 'form-container',
  },
  nameContainer: {
    gridArea: 'name-container',
  },
  emailContainer: {
    gridArea: 'email-container',
  },
  usernameContainer: {
    gridArea: 'username-container',
  },
  nextContainer: {
    display: 'grid',
    grid: `
      ". next ." 1fr
      /
      auto ${711/796 * 100}% auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridArea: 'next-container',
  },
  next: {
    gridArea: 'next',
  },
})

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
    <div className={css(firstPageStyles.container)}>
      <div className={css(firstPageStyles.signupContainer)}>
        <div className={css(styles.signup)}>
          {'Sign Up'}
        </div>
      </div>
      <div className={css(firstPageStyles.formContainer)}>
        <div className={css(firstPageStyles.nameContainer)}>
          <Input
            inputTitle="Name"
            value={user.name}
            onChange={e => {
              dispatch(SignUpSlicer.setName(e.target.value))
            }}
            isDisabled={false}
            isLoading={false}
          />
        </div>
        <div className={css(firstPageStyles.emailContainer)}>
          <Input
            inputTitle="Email"
            value={user.email}
            onChange={e => {
              dispatch(SignUpSlicer.actionCreators.validateEmail(e.target.value))
            }}
            isDisabled={false}
            isLoading={state.isValidEmail[0] === 'IN_PROGRESS'}
            subtitle={(() => {
              const res = state.isValidEmail
              switch (res[0]) {
                case "RESOLVED": {
                  const [, val] = res
                  switch (val[0]) {
                    case "ERROR": {
                      return { color: 'red', text: val[1].toString() }
                    } break
                    case 'AVAILABLE':
                      return undefined
                      break
                  }
                } break

                default:
                  return undefined
              }
              return undefined
            })()}
          />
        </div>
        <div className={css(firstPageStyles.usernameContainer)}>
          <Input
            inputTitle="Username"
            value={user.username}
            onChange={e => {
              dispatch(SignUpSlicer.actionCreators.validateUsername(e.target.value))
            }}
            isDisabled={false}
            isLoading={state.isValidUsername[0] === 'IN_PROGRESS'}
            subtitle={(() => {
              const res = state.isValidUsername
              switch (res[0]) {
                case "RESOLVED": {
                  const [, val] = res
                  switch (val[0]) {
                    case "ERROR": {
                      return { color: 'red', text: val[1].toString() }
                    } break
                    case 'AVAILABLE':
                      return undefined
                      break
                  }
                } break

                default:
                  return undefined
              }
              return undefined
            })()}
          />
        </div>
      </div>
      <div className={css(firstPageStyles.nextContainer)}>
        <div className={css(firstPageStyles.next)}>
          <button
            className={css(sharedStyles.button)}
            onClick={() => {
              isValid
              && dispatch(SignUpSlicer.setPage('SECOND'))
            }}
            disabled={!isValid}
          >
            <div className={css(sharedStyles.buttonLabel)}>
              {'Next'}
            </div>
          </button>
        </div>
      </div>
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
    <>
      <h1 className={css(sharedStyles.sign_in, sharedStyles.sign_in_layout)}>
        {'Sign Up'}
      </h1>
      <div>
        <Input
          inputTitle="Password"
          value={user.password}
          onChange={e => {
            dispatch(SignUpSlicer.setPassword(e.target.value))
          }}
          isDisabled={false}
          isLoading={false}
        />
      </div>
      <div>
        <h2 className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {'Confirm the password'}
        </h2>
        <Input
          inputTitle="Password"
          value={passwordConfirmation}
          onChange={e => {
            setPasswordConfirmation(e.target.value)
          }}
          isDisabled={false}
          isLoading={false}
          subtitle={
            user.password !== passwordConfirmation ?
              {color: 'red', text: 'Password mismatch'}
            : undefined
          }
        />
      </div>
      <div>
        <Input
          inputTitle="Phone"
          value={user.phone}
          onChange={e => {
            dispatch(SignUpSlicer.actionCreators.validatePhone(e.target.value))
          }}
          isDisabled={false}
          isLoading={state.isValidPhone[0] === 'IN_PROGRESS'}
          subtitle={(() => {
            const res = state.isValidPhone
            switch (res[0]) {
              case "RESOLVED": {
                const [, val] = res
                switch (val[0]) {
                  case "ERROR": {
                    return { color: 'red', text: val[1].toString() }
                  } break
                  case 'AVAILABLE':
                    return undefined
                    break
                }
              } break

              default:
                return undefined
            }
            return undefined
          })()}
        />
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
