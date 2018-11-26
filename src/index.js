import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { AppNavigator, setNavigator } from '@navigations';
import actions from '@actions';
// import helpers from '@helper';

class App extends Component {
    constructor(props){
        super(props);
        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onIds = this.onIds.bind(this);
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
        console.log("Notification received: ", notification);
    }

    onOpened(openResult){
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device){
        console.log('Device info: ', device);
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
    // set_notification: (payload) => dispatch(actions.utility.reducer.set_notification(payload)),
    // add_notification: (payload) => dispatch(actions.utility.reducer.add_notification(payload)),
});

export default connect(null,mapDispatchToProps)(App);
