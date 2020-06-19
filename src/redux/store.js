import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./appReducer";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    app: appReducer,
    form: formReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.__store__ = store

export default store