import React,{ PureComponent } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { actNav, navConstant } from '@navigations';
import { socmed } from '@helpers';
import Logo from './components/Logo';
import Content from './components/Content';
import TermsConditions from './components/TermsConditions';
import StaticText from '@components/StaticText';
import Container from '@components/Container';
import images from '@assets';
import styles from './styles';

class Menu extends PureComponent {
    constructor(){
        super();
        this.navigateToProduct = this.navigateToProduct.bind(this);
        this.navigateToSignIn = this.navigateToSignIn.bind(this);
        this.facebookHandler = this.facebookHandler.bind(this);
        this.setupGoogleClient = this.setupGoogleClient.bind(this);
        this.navigateToTermsConditions = this.navigateToTermsConditions.bind(this);
    }

    componentDidMount() {
        this.setupGoogleClient();
    }

    navigateToTermsConditions() {
        actNav.navigate(navConstant.TermsConditions)
    }

    navigateToProduct() {
        actNav.reset(navConstant.Product)
    }

    navigateToSignIn() {
        actNav.navigate(navConstant.SignIn, { action: 'menuLogin' });
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
                    <Container
                        noBackground={true}
                    >
                        <Logo />
                        <Content 
                            getStartedHandler={this.navigateToProduct}
                            facebookHandler={this.facebookHandler}
                            emailHandler={this.navigateToSignIn}
                            googleHandler={this.googleHandler}
                        />
                        <TermsConditions
                            navigateToTermsConditions={this.navigateToTermsConditions}
                        />
                    </Container>
                </ImageBackground>
            </View>
            
        )
    }
}

export default Menu;