import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import goods from './goods'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    goods
  })

export default createRootReducer
