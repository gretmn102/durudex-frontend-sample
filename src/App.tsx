import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import Counter from './components/Counter'
import SignIn from './components/SignIn'

import './custom.css'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/login' component={SignIn} />
  </Layout>
)
