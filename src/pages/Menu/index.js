import React,{ PureComponent } from 'react';
import { View, ImageBackground } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { actNav, navConstant } from '@navigations';
import { socmed } from '@helpers';
import Logo from './components/Logo';
import Content from './components/Content';
import images from '@assets';
import styles from './styles';

class Menu extends PureComponent {
    constructor(){
        super();
        this.navigateToSignIn = this.navigateToSignIn.bind(this);
        this.facebookHandler = this.facebookHandler.bind(this);
        this.setupGoogleClient = this.setupGoogleClient.bind(this);
    }

    componentDidMount(){
        this.setupGoogleClient();
    }

    navigateToSignIn(){
        actNav.navigate(navConstant.SignIn);
    }

    async setupGoogleClient(){
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                iosClientId: '73889112804-3fj95ig6g7t9g75n2evct60npcvla02l.apps.googleusercontent.com',
                offlineAccess: false
            });
        }
        catch(err) {
            // console.log("Google signin error", err.code, err.message);
        }
    }

    facebookHandler(){
        socmed.facebookLogin()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    googleHandler(){
        socmed.googleLogin()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground
                    resizeMode={'stretch'} 
                    source={images.background_welcome}
                    style={styles.background}
                >
                    <Logo />
                    <Content 
                        getStartedHandler={this.navigateToSignIn}
                        facebookHandler={this.facebookHandler}
                        emailHandler={this.navigateToSignIn}
                        googleHandler={this.googleHandler}
                    />
                </ImageBackground>
            </View>
        )
    }
}

export default Menu;