import { StyleSheet, css } from 'aphrodite/no-important'
import Logo from './logo.png'

export const initHeight = 1050
export const initWidth = 1680

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
  group_layout: {
    width: initWidth,
    marginTop: resizeByHeight(42),
    marginRight: resizeByWidth(73),
    marginBottom: resizeByHeight(48),
    marginLeft: resizeByWidth(73),
  },
  window_box: {
    display: 'flex',
    borderRadius: 20,
    boxShadow: "0 .25rem .75rem rgba(0, 0, 0, .05)",
    background: 'rgb(255,255,255)',
  },
  flex_logo: {
    display: 'flex',
    flex: '0 1 584px',
  },
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

  sign_in: {
    display: 'flex',
    font: '700 32px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(32),
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
    font: '700 25px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(25),
    padding: '0.375rem 0.75rem',
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
    display: 'flex',
    width: '100%',
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
    font: '700 30px/1.2 "Montserrat", Helvetica, Arial, serif',
    fontSize: resizeByHeight(30),
    color: 'rgb(255,255,255)',
  },
  buttonLabel_layout: {
    position: 'relative',
    marginTop: resizeByHeight(18),
    marginRight: 'auto',
    marginBottom: resizeByHeight(18),
    marginLeft: 'auto',
  },
})
