import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Image, Platform, Text } from 'react-native';
import { actNav, navConstant } from '@navigations';
import images from '@assets';
import config from '@config';
import styles from './styles';

class SplashScreen extends PureComponent {
    constructor(){
        super();
    }
    

    componentDidMount(){
        setTimeout(() => {
            if (this.props.on_boarding) {
                if(this.props.user == null){
                    actNav.reset(navConstant.Menu);
                } 
                else {
                    // console.log(this.props.user)
                    // actNav.reset(navConstant.Menu);
                    actNav.reset(navConstant.Dashboard);
                }
            }
            else {
                actNav.navigate(navConstant.OnBoarding);
            }
        },2000);
    }

    _renderVersion () {
        if(Platform.OS == 'ios') {
            return config.version.ios
        } else {
            return config.version.android
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Image
                    resizeMode={'contain'} 
                    source={images.icon_logo}
                    style={styles.logo}
                />
                <Text style={styles.version}>V{this._renderVersion()}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,
    on_boarding: state.utility.on_boarding
});

export default connect(mapStateToProps,null)(SplashScreen);