import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogsReducer: blogsReducer,
  notification: notificationReducer,
  userReducer: userReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
)

export default store