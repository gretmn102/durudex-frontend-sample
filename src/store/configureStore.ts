import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { ApplicationState, reducers } from './'
import { stringify } from 'querystring'
import * as Counter from './Counter'
import * as Login from './WeatherForecasts'

export default function configureStore(history: History, initialState?: ApplicationState) {
  const middleware = [
    thunk,
    routerMiddleware(history),
  ]

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  })

  const enhancers = []
  // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
  const windowIfDefined = typeof window === 'undefined' ? null : window as any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const initStates = (): ApplicationState => {
    return {
      counter: Counter.initState,
      login: Login.initState,
    }
  }

  return createStore(
    rootReducer,
    initialState ? initialState : initStates(),
    compose(applyMiddleware(...middleware), ...enhancers)
  )
}
