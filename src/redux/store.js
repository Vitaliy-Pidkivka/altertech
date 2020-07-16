import {applyMiddleware, combineReducers, createStore} from "redux";
import appReducer from "./appReducer";
import {reducer as formReducer} from 'redux-form';
import thunkMiddleWare from 'redux-thunk'
import {save, load} from "redux-localstorage-simple"

const reducers = combineReducers({
    app: appReducer,
    form: formReducer,
})

const createStoreWithMiddleware = applyMiddleware(save({ namespace: "altertech" }),thunkMiddleWare)(createStore)
const store = createStoreWithMiddleware(reducers, load({ namespace: "altertech" }))
// const store = createStore(reducers, applyMiddleware(thunkMiddleware, stateSaver))
window.__store__ = store

export default store
