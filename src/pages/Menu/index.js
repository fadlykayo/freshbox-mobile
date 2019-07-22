import React,{ Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import { actNav, navConstant } from '@navigations';
import { socmed, analytics } from '@helpers';
import Logo from './components/Logo';
import Content from './components/Content';
import TermsConditions from './components/TermsConditions';
import Container from '@components/Container';
import images from '@assets';
import styles from './styles';
import actions from '@actions';

class Menu extends Component {
    constructor(){
        super();
        this.googleHandler = this.googleHandler.bind(this);
        this.facebookHandler = this.facebookHandler.bind(this);
        this.navigateToSignIn = this.navigateToSignIn.bind(this);
        this.navigateToProduct = this.navigateToProduct.bind(this);
        this.setupGoogleClient = this.setupGoogleClient.bind(this);
        this.navigateToPrivacyPolicy = this.navigateToPrivacyPolicy.bind(this);
        this.navigateToTermsConditions = this.navigateToTermsConditions.bind(this);
    }

    componentDidMount() {
        this.setupGoogleClient();
    }

    navigateToTermsConditions() {
        actNav.navigate(navConstant.TermsConditions)
    }

    navigateToPrivacyPolicy() {
        actNav.navigate(navConstant.PrivacyPolicy)
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
                iosClientId: '73889112804-3iv7l3inaun9sgidmmrloovl864ffhfa.apps.googleusercontent.com',
                offlineAccess: false
            });
        }
        catch(err) {
            // console.log("Google signin error", err.code, err.message);
        }
    }

    facebookHandler(){
        socmed.facebookLogin()
        .then((result) => {
            let payload = {
                header: {
                    onesignalToken: this.props.userId.userId
                },
                body: {
                    sosmed: "facebook",
                    fb_token: result.id
                }   
            }

            this.props.sign_in_socmed(payload,
                () => {
                    analytics.trackEvent('Login Methods', {type: 'Facebook'});
                    actNav.reset(navConstant.Product)
                },
                (err) => {
                    let params = {
                        name: result.name,
                        email: result.email,
                        sosmed: "facebook",
                        fb_token: result.id
                    }
                    // if(err.code == 404) {
                    //     actNav.navigate(navConstant.Register,{action: 'menuLogin', socmed: params})
                    // }
                    switch (err.code) {
                        case 404:
                            actNav.navigate(navConstant.Register,{action: 'menuLogin', socmed: params})
                            break;
                        case 400:
                            actNav.navigate(navConstant.OTP, {phone_number: err.data.phone_number, verifyOTP: true});
                            break;
                        default:
                            break;
                    }
                })
        })
        .catch((err) => {
            // console.log(err);
        })
    }

    googleHandler(){
        socmed.googleLogin()
        .then((result) => {
            let payload = {
                header: {
                    onesignalToken: this.props.userId.userId
                },
                body: {
                    sosmed: "google",
                    google_token: result.id
                }   
            }

            this.props.sign_in_socmed(payload,
                () => {
                    analytics.trackEvent('Login Methods', {type: 'Google'});
                    actNav.reset(navConstant.Product)
                },
                (err) => {
                    let params = {
                        name: result.name,
                        email: result.email,
                        sosmed: "google",
                        google_token: result.id
                    }
                    // if(err.code == 404) {
                    //     actNav.navigate(navConstant.Register,{action: 'menuLogin', socmed: params})
                    // }
                    switch (err.code) {
                        case 404:
                            actNav.navigate(navConstant.Register,{action: 'menuLogin', socmed: params})
                            break;
                        case 400:
                            actNav.navigate(navConstant.OTP, {phone_number: err.data.phone_number, verifyOTP: true});                            break;
                        default:
                            break;
                    }
                })
        })
        .catch((err) => {
            // console.log(err);
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
                            navigateToPrivacyPolicy={this.navigateToPrivacyPolicy}
                        />
                    </Container>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.user.userId
})

const mapDispatchToProps = dispatch => ({
    sign_in_socmed: (req,res,err) => dispatch(actions.auth.api.sign_in_socmed(req,res,err))
})

export default connect(mapStateToProps,mapDispatchToProps)(Menu);