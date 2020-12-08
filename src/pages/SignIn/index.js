import React,{ Component } from 'react';
import { ScrollView, Keyboard, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import actions from '@actions';
import { actNav, navConstant } from '@navigations';
import { validation, language, socmed } from '@helpers';

import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import StaticText from '@components/StaticText';

import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Sosmed from './components/Sosmed';
import styles from './styles';

class SignIn extends Component {
    constructor(){
        super();
        this.state={
            user:{
                phone: '',
                password: ''
            },
            validateStatus:{
                phone: true,
                password: true,
                passwordLength: true,
            },
            credentialStateForUser: -1,
        }
        this.authCredentialListener = null;
        this.user = null;
        this.onChangeText = this.onChangeText.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.signInValidation = this.signInValidation.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
        this.navigateToRegister = this.navigateToRegister.bind(this);
        this.navigateToForgotPassword = this.navigateToForgotPassword.bind(this);
        this.clearData = this.clearData.bind(this);
        this.facebookHandler = this.facebookHandler.bind(this);
        this.googleHandler = this.googleHandler.bind(this);
        this.appleHandler = this.appleHandler.bind(this);
        this.fetchAndUpdateCredentialState = this.fetchAndUpdateCredentialState.bind(this);
    }

    componentDidMount() {
        if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13) {
            this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
                console.log('Credential Revoked');
                this.fetchAndUpdateCredentialState().catch(error =>
                this.setState({ credentialStateForUser: `Error: ${error.code}` }),
                );
            });
    
            this.fetchAndUpdateCredentialState()
                .then(res => this.setState({ credentialStateForUser: res }))
                .catch(error => this.setState({ credentialStateForUser: `Error: ${error.code}` }))
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13) {
            this.authCredentialListener();
        }
        if (this.props.navigation.state.params.closeDrawer) {
			this.props.navigation.state.params.closeDrawer();
		}
    }

    onChangeText(type,value){
        let user = JSON.parse(JSON.stringify(this.state.user));
        user[type] = value;
        this.setState({user});
    }

    setValidation(type,value){
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus.phone = true;
        validateStatus.password = true;
        validateStatus.passwordLength = true;
        this.setState({validateStatus});
    }

    submitPhone(){
        let userPhone = this.state.user.phone.trim();
        this.clearValidation();
        this.onChangeText('phone',userPhone);
        this.formPassword.focus();
    }

    submitPassword(){
        let userPassword = this.state.user.password.trim();
        this.clearValidation();
        this.onChangeText('password',userPassword);
        this.formPassword.blur();
        this.signInValidation();
    }

    signInValidation(){
        Keyboard.dismiss();
        this.clearValidation();
        validation.signInEmail(this.state.user.phone,this.state.user.password)
        .then(() => {
            this.signInHandler();
        })
        .catch(err => {
            this.setValidation(err,false);
        });
    }

    signInHandler(){
        let payload = {
            header: {
                onesignalToken: this.props.userId.userId
            },
            body: {
                phone_number: this.state.user.phone,
                password: this.state.user.password
            }
        }

        this.props.sign_in(payload,
            (res) => {
                if (this.props.navigation.state.params.action == "menuLogin") {
                    // analytics.trackEvent('Login Methods', {type: 'Phone Number'});
                    actNav.reset(navConstant.Product);
                }
                else if (this.props.navigation.state.params.action == "guestLogin") {
                    actNav.goBack();
                }
            },
            (err) => {
                if(err.code == 400) {
                    language.transformText('message.invalidSignIn')
                    .then(message => {
                        this.props.set_error_status({
                            status: true,
                            title: 'formError.title.default',
                            data: message,
                        });
                    });
                }
            }
        );
    }

    clearData() {
        let state = this.state;
        state.user = {
            phone: '',
            password: ''
        }
        this.setState(state);
    }

    navigateToRegister(){
        this.clearData();
        actNav.navigate(navConstant.Register, { action: this.props.navigation.state.params.action, key: this.props.navigation.state.key });
    }

    navigateToForgotPassword(){
        this.clearData();
        actNav.navigate(navConstant.ForgotPassword);
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
                    // analytics.trackEvent('Login Methods', {type: 'Facebook'});
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
                    google_token: result.user.id
                }   
            }
            this.props.sign_in_socmed(payload,
                () => {
                    // analytics.trackEvent('Login Methods', {type: 'Gmail'});
                    actNav.reset(navConstant.Dashboard)
                },
                (err) => {
                    let params = {
                        name: result.user.name,
                        email: result.user.email,
                        sosmed: "google",
                        google_token: result.user.id
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
             console.log('err', err);
        })
    }

    async appleHandler (){
        console.log('Beginning Apple Authentication');
    
        // start a login request
        try {
            console.log('test');

          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [
              appleAuth.Scope.EMAIL,
              appleAuth.Scope.FULL_NAME,
            ],
          });
    
          console.log('appleAuthRequestResponse', appleAuthRequestResponse);
    
          const {
            user: newUser,
            email,
            nonce,
            identityToken,
            realUserStatus /* etc */,
          } = appleAuthRequestResponse;
    
          this.user = newUser;
          console.log(newUser, '====')
          this.fetchAndUpdateCredentialState()
            .then(res => this.setState({ credentialStateForUser: res }))
            .catch(error =>
              this.setState({ credentialStateForUser: `Error: ${error.code}` }),
            );
    
          if (identityToken) {
            // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
            console.log(nonce, identityToken);
          } else {
            // no token - failed sign-in?
          }
    
          if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
            console.log("I'm a real person!");
          }
    
          console.warn(`Apple Authentication Completed, ${this.user}, ${email}`);
        } catch (error) {
          if (error.code === appleAuth.Error.CANCELED) {
            console.log('User canceled Apple Sign in.');
          } else {
            console.log('error', error);
          }
        }
    };

    async fetchAndUpdateCredentialState () {
        if (this.user === null) {
          this.setState({ credentialStateForUser: 'N/A' });
        } else {
          const credentialState = await appleAuth.getCredentialStateForUser(this.user);
          if (credentialState === appleAuth.State.AUTHORIZED) {
            this.setState({ credentialStateForUser: 'AUTHORIZED' });
          } else {
            this.setState({ credentialStateForUser: credentialState });
          }
        }
    }

    render(){
        console.log(typeof Platform.Version)
        return(
            <Container
                bgColorBottom={'white'}
                bgColorTop={'red'}
            >
                <NavigationBar 
                    title={'signIn.navigationTitle'}
                    onPress={actNav.goBack}
                />
                <ScrollView
                    keyboardShouldPersistTaps={'handled'} 
                    style={styles.container}
                >
                    <FormInput 
                        ref={c => {this.formPhone = c}}
                        type={'phone'}
                        autoFocus={true}
                        keyboardType={'number-pad'}
                        value={this.state.user.phone}
                        onChangeText={this.onChangeText}
                        label={'signIn.formLabel.phone'}
                        placeholder={'signIn.formLabel.examplePhone'}
                        onSubmitEditing={this.submitPhone}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.phone}
                        property={'signIn.validation.phone'}
                    />
                    <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        value={this.state.user.password}
                        isPassword={true}
                        onChangeText={this.onChangeText}
                        label={'signIn.formLabel.password'}
                        placeholder={'signIn.formLabel.password'}
                        onSubmitEditing={this.submitPassword}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.password}
                        property={'signIn.validation.password'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.passwordLength}
                        property={'signIn.validation.passwordLength'}
                    />
                    <ForgotPassword 
                        onPress={this.navigateToForgotPassword}
                    />
                    <Button
                        type={'red'}
                        title={'signIn.button.signIn'}
                        onPress={this.signInValidation}
                    />

                    <View style={{flex: -1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <StaticText 
                            style={styles.socmedText}
                            property={'signIn.validation.social'}
                        />

                        <View style={{flex: -1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            {Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13 && <Sosmed type={'apple'} onPress={this.appleHandler}/> }
                            <Sosmed type={'facebook'} onPress={this.facebookHandler}/>
                            <Sosmed type={'google'} onPress={this.googleHandler}/>
                        </View>
                    </View>
                    
                    <Register 
                        onPress={this.navigateToRegister}
                    />
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.user.userId
})

const mapDispatchToProps = dispatch => ({
    sign_in : (req,res,err) => dispatch(actions.auth.api.sign_in(req,res,err)),
    sign_in_socmed: (req,res,err) => dispatch(actions.auth.api.sign_in_socmed(req,res,err)),
    set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);