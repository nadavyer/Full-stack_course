import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogsReducer: blogsReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
)

export default store