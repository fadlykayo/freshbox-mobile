import React,{ PureComponent } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { actNav, navConstant } from '@navigations';
import { socmed } from '@helpers';
import Logo from './components/Logo';
import Content from './components/Content';
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
    }

    componentDidMount() {
        this.setupGoogleClient();
    }

    navigateToProduct() {
        actNav.reset(navConstant.Product)
    }

    navigateToSignIn() {
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
            <Container
                backgroundColor={false}
            >
                <View style={styles.container}>
                    <ImageBackground
                        resizeMode={'stretch'} 
                        source={images.background_welcome}
                        style={styles.background}
                    >
                        <Logo />
                        <Content 
                            getStartedHandler={this.navigateToProduct}
                            facebookHandler={this.facebookHandler}
                            emailHandler={this.navigateToSignIn}
                            googleHandler={this.googleHandler}
                        />
                        <View style={styles.termsAndConditionPlace}>
                            <Text style={styles.termsAndCondition}>
                                <StaticText 
                                    property={'welcome.content.info'}
                                /> <StaticText 
                                style={styles.underline}
                                property={'welcome.content.termsCondition'}
                            /></Text>
                        </View>
                    </ImageBackground>
                </View>
            </Container>
            
        )
    }
}

export default Menu;