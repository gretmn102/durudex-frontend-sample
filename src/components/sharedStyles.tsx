import { StyleSheet, css } from 'aphrodite/no-important'
import React from 'react'
import * as Reactstrap from 'reactstrap'

import Logo from './logo.png'

export const initHeight = 1050
export const initWidth = 1920

export const resizeByHeight = (coeff: number) => `calc((100vh * ${coeff}) / ${initHeight})`
export const resizeByWidth = (coeff: number) => `calc((100vw * ${coeff}) / ${initWidth})`

export const breakSize = 450

export const sharedStyles = StyleSheet.create({
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  group_layout: {
    height: resizeByHeight(960),

    flexGrow: 1,
    maxWidth: resizeByHeight(1744),

    marginLeft: resizeByWidth(73),
    marginRight: resizeByWidth(73),
  },
  window_box: {
    display: 'flex',
    borderRadius: 20,
    boxShadow: "0 .25rem .75rem rgba(0, 0, 0, .05)",
    background: 'rgb(255,255,255)',
    width: '100%',
    height: '100%',
  },
  flex_logo: {
    display: 'flex',
    flexBasis: 584,
    [`@media (max-width:  ${breakSize}px)`]: {
      display: 'none',
    },
  },
  flex_content: {
    display: 'flex',
    flexBasis: 1160,
    [`@media (max-width:  ${breakSize}px)`]: {
      display: 'initial',
    },
    justifyContent: 'center',
    flexGrow: 1,
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
    marginRight: resizeByWidth(183),
    marginLeft: resizeByWidth(183),
  },
  cover_group_layout: {
    flexGrow: 1,
  },

  logo: {
    background: `url(${Logo}) center center / contain no-repeat`,
  },
  logo_grid: {
    display: 'grid',
    grid: `
      "." ${719/977 * 100}%
      "logo_layout"
      "." ${173/977 * 100}%
      /
      auto
    `,
    gap: '0px 0px',
    gridAutoFlow: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  logo_grid_layout: {
    position: 'relative',
    flexGrow: 1,
  },
  logo_layout: { gridArea: 'logo_layout' },

  sign_in: {
    fontSize: resizeByHeight(32),
    fontWeight: 700,

    color: 'rgb(0,0,0)',
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
    fontSize: resizeByHeight(25),
    fontWeight: 'bold',

    color: '#4F506A',

    whiteSpace: 'nowrap',
  },
  inputTitle_layout: {
    position: 'relative',
    marginLeft: 8,
    marginBottom: 7,
  },
  input: {
    backgroundColor: 'rgb(255,255,255)',
    border: '1px solid rgb(3,99,245)',
    borderRadius: '8px',

    fontSize: resizeByHeight(25),
    fontWeight: 700,

    padding: '4px 8px',
    color: '#495057',
    backgroundClip: 'padding-box',
    width: '100%',
    ':focus': {
      color: 'rgb(73, 80, 87)',
      backgroundColor: 'rgb(255, 255, 255)',
      borderColor: 'rgb(128, 189, 255)',
      outline: 'currentcolor none 0px',
      boxShadow: 'rgba(0, 123, 255, 0.25) 0px 0px 0px 0.2rem',
    },
  },
  input_layout: {
    position: 'relative',
    height: resizeByHeight(52),
    marginTop: resizeByHeight(15),
  },
  button: {
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: 'rgb(3,99,245)',
    borderRadius: '7px 7px 7px 7px',
    cursor: 'pointer',
    border: '1px solid transparent',
    ':hover': {
      color: '#fff',
      backgroundColor: 'rgb(0, 146, 255)',
      borderColor: 'rgb(0, 146, 255)',
    },
    ':focus': {
      color: '#fff',
      backgroundColor: 'rgb(0, 146, 255)',
      borderColor: 'rgb(22, 100, 176)',
      boxShadow: 'rgba(6, 137, 251, 0.5) 0px 0px 0px 0.2rem',
    },
    ':disabled': {
      color: '#fff',
      backgroundColor: '#6c757d',
      borderColor: '#6c757d',
    },
  },
  button_layout: {
    position: 'relative',
    overflow: 'visible',
    marginTop: resizeByHeight(78),
  },
  buttonLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: resizeByHeight(30),
    fontWeight: 700,

    color: 'white',

    marginRight: '0.3rem',
    marginLeft: '0.3rem',

    whiteSpace: 'nowrap',
  },

  level: {
    display: 'flex',
  },
  levelLeft: {
    flexGrow: 1,
  },
  levelRight: {
    marginLeft: 10,
  },

  columns: {
    display: 'flex',
    gap: 10,
  },
  column: {
  },
})

export function Input(props: {
  inputTitle?: string
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void)
  isDisabled: boolean
  isLoading: boolean
  subtitle?: { color: string | undefined, text: string }
  value?: string | string []
}) {
  const { inputTitle } = props
  const subtitle = props.subtitle

  return (
    <div>
      {inputTitle && (
        <div className={css(sharedStyles.inputTitle, sharedStyles.inputTitle_layout)}>
          {inputTitle}
        </div>
      )}
      <input
        className={css(sharedStyles.input)}
        onChange={props.onChange}
        disabled={props.isDisabled}
        value={props.value}
      />
      {props.isLoading && (
        <Reactstrap.Spinner role="status">
          Loading...
        </Reactstrap.Spinner>
      )}
      {subtitle && (
        <div style={subtitle.color ? {color: subtitle.color} : {}}>
          {subtitle.text}
        </div>
      )}
    </div>
  )
}
