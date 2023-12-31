import React, {Component} from 'react';
import {ScrollView, Keyboard, View, Platform} from 'react-native';
import {connect} from 'react-redux';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import actions from '@actions';
import {actNav, navConstant} from '@navigations';
import {validation, language, socmed} from '@helpers';

import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import StaticText from '@components/StaticText';

import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Sosmed from './components/Sosmed';
import Modal from './components/ModalConfirmation';
import styles from './styles';

class SignIn extends Component {
    constructor () {
        super();
        this.state = {
            user: {
                phone: '',
                password: ''
            },
            validateStatus: {
                phone: true,
                password: true,
                passwordLength: true,
            },
            showModal: false,
            params: null,
        };
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
        this.onCloseModal = this.onCloseModal.bind(this);
        this.registerSocmed = this.registerSocmed.bind(this);
    }

    componentDidMount() {
        // if(this.props.cart_product.length > 0 && this.props.navigation.state.params.action !== "guestLogin") {
        //     this.props.clear_products()
        // }
    }

    componentWillUnmount() {
        if (this.props.navigation.state.params.closeDrawer) {
            this.props.navigation.state.params.closeDrawer();
        }
    }

    onChangeText(type, value) {
        let user = JSON.parse(JSON.stringify(this.state.user));
        user[type] = value;
        this.setState({user});
    }

    setValidation(type, value) {
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation() {
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus.phone = true;
        validateStatus.password = true;
        validateStatus.passwordLength = true;
        this.setState({validateStatus});
    }

    submitPhone() {
        let userPhone = this.state.user.phone.trim();
        this.clearValidation();
        this.onChangeText('phone', userPhone);
        this.formPassword.focus();
    }

    submitPassword() {
        let userPassword = this.state.user.password.trim();
        this.clearValidation();
        this.onChangeText('password', userPassword);
        this.formPassword.blur();
        this.signInValidation();
    }

    signInValidation() {
        Keyboard.dismiss();
        this.clearValidation();
        validation.signInEmail(this.state.user.phone, this.state.user.password)
            .then(() => {
                this.signInHandler();
            })
            .catch(err => {
                this.setValidation(err, false);
            });
    }

    signInHandler() {
        let payload = {
            header: {
                onesignalToken: this.props.userId.userId
            },
            body: {
                phone_number: this.state.user.phone,
                password: this.state.user.password
            }
        };

        this.props.sign_in(payload,
            (res) => {
                if (this.props.navigation.state.params.action == "menuLogin") {
                    actNav.reset(navConstant.Product);
                }
                else if (this.props.navigation.state.params.action == "guestLogin") {
                    if(this.props.navigation.state.params.totalProduct > 0) {
                        actNav.reset(navConstant.Dashboard);
                        // this.props.clear_products()
                    } else {
                        actNav.goBack();
                    }
                }
            },
            (err) => {
                if (err.code == 400) {
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
        };
        this.setState(state);
    }

    navigateToRegister() {
        this.clearData();
        actNav.navigate(navConstant.Register, {action: this.props.navigation.state.params.action, key: this.props.navigation.state.key});
    }

    navigateToForgotPassword() {
        this.clearData();
        actNav.navigate(navConstant.ForgotPassword);
    }

    facebookHandler() {
        socmed.facebookLogin()
            .then((result) => {
                let payload = {
                    header: {
                        onesignalToken: this.props.userId.userId
                    },
                    body: {
                        sosmed: "facebook",
                        fb_token: result.id,
                        email: result.email,
                    }
                };

                this.props.sign_in_socmed(payload,
                    () => {
                        actNav.reset(navConstant.Dashboard);
                    },
                    (err) => {
                        let params = {
                            name: result.name,
                            email: result.email,
                            sosmed: "facebook",
                            fb_token: result.id
                        };
                        switch (err.code) {
                            case 404:
                                actNav.navigate(navConstant.Register, {action: 'menuLogin', socmed: params});
                                break;
                            case 400:
                                actNav.navigate(navConstant.OTP, {phone_number: err.data.phone_number, verifyOTP: true});
                                break;
                            default:
                                break;
                        }
                    });
            })
            .catch((err) => {});
    }

    googleHandler() {
        socmed.googleLogin()
            .then((result) => {
                let payload = {
                    header: {
                        onesignalToken: this.props.userId.userId
                    },
                    body: {
                        sosmed: "google",
                        google_token: result.user.id,
                        email: result.user.email,
                    }
                };
                this.props.sign_in_socmed(payload,
                    () => {
                        actNav.reset(navConstant.Dashboard);
                    },
                    (err) => {
                        let params = {
                            name: result.user.name,
                            email: result.user.email,
                            sosmed: "google",
                            google_token: result.user.id
                        };
                        switch (err.code) {
                            case 404:
                                actNav.navigate(navConstant.Register, {action: 'menuLogin', socmed: params});
                                break;
                            case 400:
                                actNav.navigate(navConstant.OTP, {phone_number: err.data.phone_number, verifyOTP: true}); break;
                            default:
                                break;
                        }
                    });
            })
            .catch((err) => {});
    }

    registerSocmed(email, apple_token, name) {
        let payload = {
            header: {
                onesignalToken: this.props.userId.userId
            },
            body: {
                name: name,
                email,
                sosmed: 'apple',
                fb_token: '',
                google_token: '',
                apple_token,
            }
        };

        this.props.register_user_socmed(payload,
            (res) => {
                if (res.code == 201) {
                    let payloadSignin = {
                        header: {
                            onesignalToken: this.props.userId.userId
                        },
                        body: {
                            sosmed: "apple",
                            apple_token: apple_token,
                        }
                    };
                    this.props.sign_in_socmed(payloadSignin,
                        () => {
                            actNav.reset(navConstant.Dashboard);
                        },
                        (err) => {
                        });
                }

            },
            (err) => {}
        );
    }

    async appleHandler() {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [
                    appleAuth.Scope.EMAIL,
                    appleAuth.Scope.FULL_NAME,
                ],
            });

            const {
                email,
                fullName,
                identityToken
            } = appleAuthRequestResponse;

            let payload = {
                header: {
                    onesignalToken: this.props.userId.userId
                },
                body: {
                    sosmed: "apple",
                    apple_token: identityToken,
                }
            };

            this.props.sign_in_socmed(payload,
                () => {
                    actNav.reset(navConstant.Dashboard);
                },
                (err) => {
                    let params = {
                        name: fullName?.givenName ? `${fullName.givenName} ${fullName.familyName}` : '',
                        email: err.data.email,
                        sosmed: "apple",
                        apple_token: identityToken
                    };

                    switch (err.code) {
                        case 404:
                            this.registerSocmed(params.email, params.apple_token, params.name);
                            break;
                        case 400:
                            actNav.navigate(navConstant.OTP, {phone_number: err.data.phone_number, verifyOTP: true}); break;
                        default:
                            break;
                    }
                });

        } catch (error) {
        }
    };

    onCloseModal() {
        actNav.navigate(navConstant.Register, {action: 'menuLogin', socmed: this.state.params});
    }

    render() {
        return (
            <Container
                bgColorBottom={'white'}
                bgColorTop={'red'}
            >
                {/*<Modal
                    modalVisible={this.state.showModal}
                    closeModal={() => this.setState({
                        showModal: false
                    })}
                    onCloseModal={this.onCloseModal}
                />*/}
                <NavigationBar
                    title={'signIn.navigationTitle'}
                    onPress={actNav.goBack}
                />
                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    style={styles.container}
                >
                    <FormInput
                        ref={c => {this.formPhone = c;}}
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
                        ref={c => {this.formPassword = c;}}
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
                            {Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13 && <Sosmed type={'apple'} onPress={this.appleHandler} />}
                            <Sosmed type={'facebook'} onPress={this.facebookHandler} />
                            <Sosmed type={'google'} onPress={this.googleHandler} />
                        </View>
                    </View>

                    <Register
                        onPress={this.navigateToRegister}
                    />
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.user.userId,
    cart_product: state.product.cart.products,
});

const mapDispatchToProps = dispatch => ({
    sign_in: (req, res, err) => dispatch(actions.auth.api.sign_in(req, res, err)),
    sign_in_socmed: (req, res, err) => dispatch(actions.auth.api.sign_in_socmed(req, res, err)),
    set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
    register_user_socmed: (req, res, err) => dispatch(actions.registration.api.register_user_socmed(req, res, err)),
    clear_products: () => dispatch(actions.product.reducer.clear_products()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);