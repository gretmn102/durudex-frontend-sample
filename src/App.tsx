import * as React from 'react'
import { Route, Switch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'reactstrap'

import { ApplicationState } from './store'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import * as SessionSlice from './store/sessionSlice'

import './custom.css'

export default function App() {
  const sessionState = useSelector(
    (state: ApplicationState) => state.session,
  )
  const dispatch = useDispatch()

  if (sessionState.isLogin) {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={SignIn} />
        <Route path='/sign-up'><SignUp /></Route>
        <Route component={Home} />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/sign-up' component={SignUp} />
      <Route component={SignIn} />
    </Switch>
  )
}
