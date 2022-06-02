

import { createStore, applyMiddleware } from "redux";
import {persistStore} from 'redux-persist';
import thunk from "redux-thunk";

import reducers from './reducer';

//used for creating the redux library 

export const store = createStore(
    reducers,
    applyMiddleware(thunk)

)

export const persistor = persistStore(store)

