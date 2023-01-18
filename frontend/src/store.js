import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { tableListReducers, tableDetailsReducers } from './reducers/tableReducers'
import { UserLoginReducers } from './reducers/userReducers'



//list of reducers and deployment
//combineReducers uses when it's mor than 1
const reducer = combineReducers({
    tableList: tableListReducers,
    tableDetails: tableDetailsReducers,
    userLogin: UserLoginReducers,
})

const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const intialState = {
    userLogin:{userInfo:userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store 