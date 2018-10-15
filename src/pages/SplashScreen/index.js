import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import images from '@assets';
import styles from './styles';

class SplashScreen extends PureComponent {
    constructor(){
        super();
    }

    componentDidMount(){
        setTimeout(() => {
            if(this.props.user == null){
                actNav.reset(navConstant.Menu);
            } 
            else {
                actNav.reset(navConstant.Product);
            }
        },2000);
    }

    render(){
        return (
            <View style={styles.container}>
                <Image
                    resizeMode={'contain'} 
                    source={images.icon_logo}
                    style={styles.logo}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
});

export default connect(mapStateToProps,null)(SplashScreen);