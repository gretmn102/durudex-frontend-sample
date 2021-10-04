import * as React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { ApplicationState } from './store'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NavMenu from './components/NavMenu'
import * as SessionSlice from './store/sessionSlice'

import './custom.css'

const App = (props: SessionSlice.Session) => {
  const loc = useLocation()

  if (props.isLogin) {
    return (
      <>
        <NavMenu />
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
          </Switch>
        </Container>
      </>
    )
  }

  switch (loc.pathname) {
    case '/sign-up': {
      return <SignUp />
    } break
    default: {
      return <SignIn />
    } break
  }
}

export default connect(
  (state: ApplicationState) => state.session, // Selects which state properties are merged into the component's props
  // SessionSlicer.actionCreators // Selects which action creators are merged into the component's props
)(App as any) // eslint-disable-line @typescript-eslint/no-explicit-any
