import React, { Component } from 'react';
import { Alert } from 'react-native';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from '@reducers';
import codePush from "react-native-code-push";
import ct from '@constants';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['product']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer,compose(applyMiddleware(thunk,logger)));
const store = createStore(persistedReducer,compose(applyMiddleware(thunk)));
let persistor = persistStore(store);
// persistor.purge()

import Application from '@src';

class App extends Component {
	
		codePushStatusDidChange(status) {

		switch(status) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				store.dispatch({
					type: ct.UPDATE_APP,
					payload: 'Checking for Updates...'
				})
				break;
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				store.dispatch({
					type: ct.UPDATE_APP,
					payload: 'Downloading Updates...'
				})
				break;
			case codePush.SyncStatus.INSTALLING_UPDATE:
				store.dispatch({
					type: ct.UPDATE_APP,
					payload: 'Installing Updates...'
				})
				break;
			case codePush.SyncStatus.UP_TO_DATE:
				store.dispatch({
					type: ct.UPDATE_APP,
					payload: ''
				})
				break;
			case codePush.SyncStatus.UPDATE_INSTALLED:
				store.dispatch({
					type: ct.UPDATE_APP,
					payload: ''
				})
				break;
		}
	}

	codePushDownloadDidProgress(progress) {
		store.dispatch({
			type: ct.UPDATE_BYTES,
			payload: {
				receivedBytes: progress.receivedBytes,
				totalBytes: progress.totalBytes
			}
		})
		console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
	}
	render(){
		return(
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Application />
				</PersistGate>
			</Provider>
		);
	}
}

App = codePush(App);
export default App