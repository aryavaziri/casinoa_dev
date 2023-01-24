import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  tableListReducers,
  tableDetailsReducers,
} from "./reducers/tableReducers";
import {
  UserLoginReducers,
  UserRegisterReducers,
  UserDetailsReducers,
  UserUpdateProfileReducers,
} from "./reducers/userReducers";
import { pokerReducers } from "./reducers/pokerReducers";
// import { orderPaymentReducers } from './reducers/paymentReducers'
// import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

//list of reducers and deployment
//combineReducers uses when it's mor than 1
const reducer = combineReducers({
  tableList: tableListReducers,
  tableDetails: tableDetailsReducers,
  userLogin: UserLoginReducers,
  userRegister: UserRegisterReducers,
  userDetails: UserDetailsReducers,
  userUpdateProfile: UserUpdateProfileReducers,
  poker: pokerReducers,
  // paypal: usePayPalScriptReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
  poker: {
    info: {},
    Players: {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
