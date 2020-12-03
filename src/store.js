import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '@reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['product'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer,compose(applyMiddleware(thunk,logger)));
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
let persistor = persistStore(store);
// persistor.purge()

export {store, persistor};
