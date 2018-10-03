import React, { Component } from 'react';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '@reducers';

const persistConfig = {
	key: 'root',
	storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer,compose(applyMiddleware(thunk,logger)));
// const store = createStore(persistedReducer,compose(applyMiddleware(thunk)));
// persistStore(store)
// .purge()

import Application from '@src';

export default class App extends Component {
	render(){
		return(
			<Provider store={store}>
				<Application />
			</Provider>
		);
	}
}