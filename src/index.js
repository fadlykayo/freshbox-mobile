import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { AppNavigator, setNavigator, actNav } from '@navigations';
import actions from '@actions';
// import helpers from '@helper';


class App extends Component {
    constructor(props){
        super(props);
        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onIds = this.onIds.bind(this);
        OneSignal.init("c1f39bb2-11d8-4ebf-b836-61a0131fb3fa")
    }

    componentWillMount(){
        OneSignal.addEventListener('received',this.onReceived);
        OneSignal.addEventListener('opened',this.onOpened);
        OneSignal.addEventListener('ids',this.onIds);
        OneSignal.inFocusDisplaying(2);
    }

    componentWillUnmount(){
        OneSignal.removeEventListener('received',this.onReceived);
        OneSignal.removeEventListener('opened',this.onOpened);
        OneSignal.removeEventListener('ids',this.onIds);
    }

    onReceived(notification){
        if(notification.payload.title == 'Pembayaran Berhasil') {
            // console.warn('test')
            this.props.get_notification(notification.payload)
            // actNav.goBack();
        }
    }

    onOpened(openResult){
        this.props.get_notification(openResult.notification.payload.additionalData)
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    }

    onIds(device){
        // console.log('Device info: ', device);
        this.props.get_user_id(device);
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='black'
                    barStyle={'light-content'}
                />
                <AppNavigator
                    ref={navigatorRef => { setNavigator(navigatorRef) }}
                />
            </View>
        );
    }
}

const styles = {
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
};

// const mapStateToProps = (state) => ({
//     user: state.user,
// })

const mapDispatchToProps = (dispatch) => ({
    get_user_id: (payload) => dispatch(actions.user.reducer.get_user_id(payload)),
    get_notification: (payload) => dispatch(actions.notif.reducer.get_notification(payload)),
    // set_notification: (payload) => dispatch(actions.utility.reducer.set_notification(payload)),
    // add_notification: (payload) => dispatch(actions.utility.reducer.add_notification(payload)),
});

export default connect(null,mapDispatchToProps)(App);
