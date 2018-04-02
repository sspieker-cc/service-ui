import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { connectRoutes } from 'redux-first-router'
import queryString from 'qs';

import routesMap from 'routes/routesMap';
import reducers from './reducers';

export const configureStore = async (history, preloadedState) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routesMap,
	{ querySerializer: queryString }
  )

  const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 30 }) : f => f;

  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const middlewares = applyMiddleware(middleware)
  const enhancers = composeEnhancers(enhancer, middlewares, reduxLogger)
  const store = createStore(rootReducer, preloadedState, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers')
      const rootReducer = combineReducers({ ...reducers, location: reducer })
      store.replaceReducer(rootReducer)
    })
  }

  await thunk(store)

  return { store };
};

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({})(...args)
    : compose(...args)
