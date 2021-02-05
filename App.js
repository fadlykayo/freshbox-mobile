import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';
import ct from '@constants';
import {store, persistor} from './src/store';

import Application from '@src';

console.warn = function() {}

Sentry.init({
  dsn: 'https://1d867be8f53c4413b0d4dc715e55975d@sentry.io/1722769',
});

class App extends Component {
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Checking for Updates...',
        });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Downloading Updates...',
        });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Installing Updates...',
        });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Up To Date',
        });
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Update installed. Restarting app..',
        });
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Update ignored',
        });
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        store.dispatch({
          type: ct.CODEPUSH_ERR,
          payload: true,
        });
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Sync in progress',
        });
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        store.dispatch({
          type: ct.UPDATE_APP,
          payload: 'Awaiting user action',
        });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    store.dispatch({
      type: ct.UPDATE_BYTES,
      payload: {
        receivedBytes: progress.receivedBytes,
        totalBytes: progress.totalBytes,
      },
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Application />
        </PersistGate>
      </Provider>
    );
  }
}

App = codePush(App);
export default App;
