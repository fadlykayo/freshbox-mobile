import React,{ Component } from 'react';
import { ScrollView, StatusBar, Platform } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation, language } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

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
            }
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.signInValidation = this.signInValidation.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
        this.navigateToRegister = this.navigateToRegister.bind(this);
        this.navigateToForgotPassword = this.navigateToForgotPassword.bind(this);
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
        validateStatus.login = true;
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
            header: {},
            body: {
                phone_number: this.state.user.phone,
                password: this.state.user.password
            }
        }

        this.props.sign_in(payload,
            (success) => {
                if (this.props.navigation.state.params.action == "menuLogin") {
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

    navigateToRegister(){
        let state = this.state;
        state.user = {
            phone: '',
            password: ''
        },
        state.isWrong= false,
        state.messageWrong= '',
        this.setState({state});
        actNav.navigate(navConstant.Register, { action: this.props.navigation.state.params.action, key: this.props.navigation.state.key });
    }

    navigateToForgotPassword(){
        let state = this.state;
        state.user = {
            email: '',
            password: ''
        },
        state.isWrong= false,
        state.messageWrong= '',
        this.setState({state});
        actNav.navigate(navConstant.ForgotPassword);
    }

    render(){
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
                    keyboardShouldPersistTaps={'always'} 
                    style={styles.container}
                    contentContainerStyle={styles.content}
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
                        autoFocus={false}
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
                    <Register 
                        onPress={this.navigateToRegister}
                    />
                </ScrollView>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    sign_in : (req,res,err) => dispatch(actions.auth.api.sign_in(req,res,err)),
    set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
});

export default connect(null,mapDispatchToProps)(SignIn);