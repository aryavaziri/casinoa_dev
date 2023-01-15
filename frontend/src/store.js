import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { tableListReducers, tableDetailsReducers } from './reducers/tableReducers'

const reducer = combineReducers({
    tableList: tableListReducers,
    tableDetails: tableDetailsReducers,
})

const intialState = {}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store