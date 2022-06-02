
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import User from './user'
import Custom from './custom'

//used for creating the redux library 

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    User,
    Custom
})

const persistedReducer = persistReducer(persistConfig, reducers)

export default persistedReducer
