import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '@reducers';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native


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

export {store, persistor}