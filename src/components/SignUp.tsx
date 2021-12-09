import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, css, StyleDeclarationValue } from 'aphrodite/no-important'

import { ApplicationState } from '../store'
import * as SignUpSlicer from '../store/SignUp'
import { Call, Deferred, deferredMatch } from '../common'
import { Input, invalidColor, resizeByHeight, sharedStyles } from './sharedStyles'
import LogoBackground2 from './logoBackground2.jpg'
import LogoBackground3 from './logoBackground3.jpg'
import LogoBackground4 from './logoBackground4.jpg'
import * as SessionSlice from '../store/sessionSlice'


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
  },
  signup: {
    fontWeight: 'bold',
    fontSize: resizeByHeight(50),
    color: '#0263F4',
    lineHeight: 'normal',
  },
  footerButtonsContainer: {
    display: 'grid',
    grid: `
      "left-button . right-button" auto
      /
      1fr 0.1fr 1fr
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridArea: 'next',
  },
  leftButton: {
    gridArea: 'left-button',
  },
  rightButton: {
    gridArea: 'right-button',
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
  agreeWithConditions: {
    display: 'flex',
    gap: 10,
  },
  agreeWithConditionsText: {
    fontSize: resizeByHeight(15),
    display: 'flex',
    alignItems: 'center',
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

  const isPasswordEquals =
    user.password === passwordConfirmation

  const isValid =
    user.password !== ''
    && isPasswordEquals
    && user.phone !== ''
    && isAvailable(state.isValidPhone)

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
            type="password"
            inputTitle="Password"
            value={user.password}
            onChange={e => {
              dispatch(SignUpSlicer.setPassword(e.target.value))
            }}
            isDisabled={false}
            isLoading={false}
            isInvalid={isPasswordEquals ? 'SUCCESS' : 'INVALID'}
          />
        </div>
        <div className={css(firstPageStyles.emailContainer)}>
          <Input
            type="password"
            inputTitle="Confirm password"
            value={passwordConfirmation}
            onChange={e => {
              setPasswordConfirmation(e.target.value)
            }}
            isDisabled={false}
            isLoading={false}
            subtitle={
              user.password !== passwordConfirmation ?
                { color: invalidColor, text: 'Password mismatch' }
              : undefined
            }
            isInvalid={isPasswordEquals ? 'SUCCESS': 'INVALID'}
          />
        </div>
        <div className={css(firstPageStyles.usernameContainer)}>
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
                      return { color: invalidColor, text: val[1].toString() }
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
        <div className={css(styles.footerButtonsContainer)}>
          <div className={css(styles.leftButton)}>
            <button
              className={css(sharedStyles.button)}
              onClick={e => {
                dispatch(SignUpSlicer.setPage('FIRST'))
              }}
            >
              <div className={css(sharedStyles.buttonLabel)}>
                {'Previous'}
              </div>
            </button>
          </div>
          <div className={css(styles.rightButton)}>
            <button
              className={css(sharedStyles.button)}
              onClick={e => {
                isValid
                && dispatch(SignUpSlicer.setPage('THIRD'))
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
    </div>
  )
}

const dropdownStyles = StyleSheet.create({
  rightBorders: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  leftBorders: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  select: {
    background: '#fff',
    border: '1px solid #0363f5',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',

    ':after': {
      borderColor: 'grey transparent transparent transparent',
      borderStyle: 'solid',
      borderWidth: '9px 7px 0 9px',
      content: '\'\'',
      height: '0',
      pointerEvents: 'none',
      position: 'absolute',
      right: '10px',
      speak: 'none',
      top: '14px',
      width: '0',
    },
  },
  clearSelect: {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
    background: 'none',
    border: '0',
    color: '#000',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    height: '100%',
    margin: '0',
    paddingLeft: 10,
    paddingRight: 28,
    width: '100%',
    zIndex: 2,
  },
})


const thirdPageStyles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 5,
  },
  yearsContainer: {
    flexGrow: 2,
  },
  monthsContainer: {
    flexGrow: 5,
  },
  daysContainer: {
    flexGrow: 1,
  },
})

const range = (start: number, end: number) => {
  const length = end - start

  return length > 0 ? Array.from({ length }, (_, i) => start + i) : []
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function Days(props: {
  daysInMonth: number,
  state: number,
  setState: (state: number) => void,
}) {
  const { daysInMonth, state, setState } = props

  return (
    <div className={css(thirdPageStyles.daysContainer)}>
      <div className={css(dropdownStyles.select)}>
        <select
          className={css(dropdownStyles.clearSelect)}
          value={state}
          onChange={e => {
            setState(Number(e.target.value))
          }}
        >
          {range(1, daysInMonth + 1).map(day => {
            return (
              <option key={day} value={day}>{day}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

function Months(props: {
  state: number,
  setState: (state: number) => void,
}) {
  const { state, setState } = props

  return (
    <div className={css(thirdPageStyles.monthsContainer)}>
      <div className={css(dropdownStyles.select, dropdownStyles.leftBorders)}>
        <select
          className={css(dropdownStyles.clearSelect)}
          value={state}
          onChange={e => {
            setState(Number(e.target.value))
          }}
        >
          {Array.from({length: 12}, (_, monthIndex) => {
            const month = new Date(0, monthIndex).toLocaleString('en-EN', { month: 'long' })
            return (
              <option key={monthIndex} value={monthIndex}>{month}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

const Years = (() => {
  const minYear = new Date(0).getFullYear()
  const maxYear = new Date().getFullYear() - 13
  const years = range(minYear, maxYear + 1).reverse()

  // eslint-disable-next-line react/display-name
  return (props: {
    state: number,
    setState: (state: number) => void,
  }) => {
    const { state, setState } = props

    return (
      <div className={css(thirdPageStyles.yearsContainer)}>
        <div className={css(dropdownStyles.select, dropdownStyles.rightBorders)}>
          <select
            className={css(dropdownStyles.clearSelect)}
            value={state}
            onChange={e => {
              setState(Number(e.target.value))
            }}
          >
            {years.map(year => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    )
  }
})()

const GenderInput = (props: {
  state: SessionSlice.Gender,
  setState: (state: SessionSlice.Gender) => void,
}) => {
  const { state, setState } = props

  return (
    <div>
      <div className={css(dropdownStyles.select)}>
        <select
          className={css(dropdownStyles.clearSelect)}
          value={state}
          onChange={e => {
            setState(e.target.value as SessionSlice.Gender)
          }}
        >
          {SessionSlice.genders.map(([genderKey, genderValue]) => {
            return (
              <option key={genderKey} value={genderKey}>{genderValue}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

function ThirdPage() {
  const state = useSelector(
    (state: ApplicationState) => state.signUp,
  )
  const dispatch = useDispatch()
  const birthDate = state.user.dateOfBirth
  const currentYear = birthDate.getFullYear()
  const currentMonth = birthDate.getMonth()
  const currentDay = birthDate.getDate()

  const [agreeWithConditions, setAgreeWithConditions] = React.useState(false)

  const isValid = agreeWithConditions

  return (
    <div className={css(firstPageStyles.container)}>
      <div className={css(firstPageStyles.signupContainer)}>
        <div className={css(styles.signup)}>
          {'Sign Up'}
        </div>
      </div>
      <div className={css(firstPageStyles.formContainer)}>
        <div className={css(firstPageStyles.nameContainer)}>
          <div className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
            Date of birth
          </div>
          <div className={css(thirdPageStyles.container)}>
            <Months
              state={currentMonth}
              setState={newMonth => {
                const date = new Date(currentYear, newMonth, currentDay)

                dispatch(SignUpSlicer.setBirthDate(date))
              }}
            />
            <Days
              daysInMonth={
                daysInMonth(currentYear, currentMonth)
              }
              state={currentDay}
              setState={newDay => {
                const date = new Date(currentYear, currentMonth, newDay)

                dispatch(SignUpSlicer.setBirthDate(date))
              }}
            />
            <Years
              state={currentYear}
              setState={newYear => {
                const date = new Date(newYear, currentMonth, currentDay)

                dispatch(SignUpSlicer.setBirthDate(date))
              }}
            />
          </div>
        </div>
        <div className={css(firstPageStyles.emailContainer)}>
          <div className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
            Gender
          </div>
          <GenderInput
              state={state.user.gender}
              setState={newGender => {
                dispatch(SignUpSlicer.setGender(newGender))
              }}
          />
        </div>
        <div className={css(firstPageStyles.usernameContainer, firstPageStyles.agreeWithConditions)}>
          <input
            type='checkbox'
            id='agreeWithConditions'
            checked={agreeWithConditions}
            onChange={_ => void setAgreeWithConditions(!agreeWithConditions)}
          />
          <label
            className={css(firstPageStyles.agreeWithConditionsText)}
            htmlFor='agreeWithConditions'
          >
            I have read all the terms of Durudex and conditions and I agree with them.
          </label>
        </div>
      </div>
      <div className={css(firstPageStyles.nextContainer)}>
        <div className={css(styles.footerButtonsContainer)}>
          <div className={css(styles.leftButton)}>
            <button
              className={css(sharedStyles.button)}
              onClick={e => {
                dispatch(SignUpSlicer.setPage('SECOND'))
              }}
            >
              <div className={css(sharedStyles.buttonLabel)}>
                {'Previous'}
              </div>
            </button>
          </div>
          <div className={css(styles.rightButton)}>
            <button
              className={css(sharedStyles.button)}
              disabled={!isValid}
              onClick={() => {
                if (isValid) {
                  alert('Not implemented yet')
                }
              }}
            >
              <div className={css(sharedStyles.buttonLabel)}>
                {'Done'}
              </div>
            </button>
          </div>
        </div>
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
