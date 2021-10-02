import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

import './custom.css'

// eslint-disable-next-line react/display-name
export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={SignIn} />
    <Route path='/sign-up' component={SignUp} />
  </Layout>
)
