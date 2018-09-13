import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { AppNavigator, setNavigator } from '@navigations';
// import actions from '@action';
// import helpers from '@helper';

class App extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){
        
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='black'
                    barStyle={Platform.OS == 'android' ? 'light-content' : 'dark-content'}
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

// const mapDispatchToProps = (dispatch) => ({
//     set_notification: (payload) => dispatch(actions.utility.reducer.set_notification(payload)),
//     add_notification: (payload) => dispatch(actions.utility.reducer.add_notification(payload)),
// });

export default connect(null,null)(App);
