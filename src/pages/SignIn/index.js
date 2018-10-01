import React,{ Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from './components/Button';
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
                email: '',
                password: ''
            },
            validateStatus:{
                emailFormat: true,
                emailLength: true,
                password: true,
                passwordLength: true,
                login: true,
            },
            isWrong: false,
            messageWrong: '',
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.signInValidation = this.signInValidation.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
        this.navigateToRegister = this.navigateToRegister.bind(this);
        this.navigateToForgotPassword = this.navigateToForgotPassword.bind(this);
    }

    onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
    }

    setValidation(type,value){
        let validateStatus = this.state.validateStatus;
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = this.state.validateStatus;
        validateStatus.emailFormat = true;
        validateStatus.emailLength = true;
        validateStatus.password = true;
        validateStatus.passwordLength = true;
        validateStatus.login = true;
        this.setState({validateStatus});
    }

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        this.clearValidation();
        this.onChangeText('email',userEmail);
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
        validation.emailLength(this.state.user.email)
        .then(() => {
            if(this.state.validateStatus.emailLength == false) this.setValidation('emailLength',true);
            validation.emailFormat(this.state.user.email)
            .then(() => {
                if(this.state.validateStatus.emailFormat == false) this.setValidation('emailFormat',true);
                validation.passwordLength(this.state.user.password)
                .then(() => {
                    if(this.state.validateStatus.passwordLength == false) this.setValidation('passwordLength',true);
                    validation.password(this.state.user.password)
                    .then(() => {
                        this.signInHandler();
                    })
                    .catch(() => {
                        this.setValidation('password',false);
                    })
                })
                .catch(() => {
                    this.setValidation('passwordLength',false);
                });
            })
            .catch(() => {
                this.setValidation('emailFormat',false);
            })
        })
        .catch(() => {
            this.setValidation('emailLength',false);
        });
    }

    signInHandler(){
        let payload = {
            header: {},
            body: {
                email: this.state.user.email,
                password: this.state.user.password
            }
        }

        this.props.sign_in_user(payload,
            (success) => {
                actNav.navigate(navConstant.Product)
            },
            (err) => {
                let state = this.state;
                state.isWrong = true;
                state.messageWrong = err.code_message;
                this.setState({state})
            })
    }

    navigateToRegister(){
        let state = this.state;
        state.user = {
            email: '',
            password: ''
        },
        state.isWrong= false,
        state.messageWrong= '',
        this.setState({state});
        actNav.navigate(navConstant.Register);
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
            <Container>
                <NavigationBar 
                    title={'signIn.navigationTitle'}
                    onPress={actNav.goBack}
                />
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={styles.content}
                >
                    <FormInput 
                        ref={c => {this.formEmail = c}}
                        type={'email'}
                        autoFocus={true}
                        keyboardType={'email-address'}
                        value={this.state.user.email}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'signIn.formLabel.email'}
                        placeholder={'signIn.formLabel.email'}
                        onSubmitEditing={this.submitEmail}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.emailLength}
                        property={'signIn.validation.emailLength'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.emailFormat}
                        property={'signIn.validation.emailFormat'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.login}
                        property={'signIn.validation.login'}
                    />
                    { this.state.isWrong ? (<Text style={styles.messageWrong}>{ this.state.messageWrong }</Text>) : (null) }

                    <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        autoFocus={false}
                        value={this.state.user.password}
                        isPassword={true}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'signIn.formLabel.password'}
                        placeholder={'signIn.formLabel.password'}
                        onSubmitEditing={this.submitPassword}
                    />

                    <ForgotPassword 
                        onPress={this.navigateToForgotPassword}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.password}
                        property={'signIn.validation.password'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.passwordLength}
                        property={'signIn.validation.passwordLength'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.login}
                        property={'signIn.validation.login'}
                    />
                    <Button 
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

const mapDispatchToProps = dispatch => {
    return {
        sign_in_user : (req, success, failure) => dispatch(actions.auth.api.signin_user(req, success, failure))
    }
}

export default connect(
    null,
    mapDispatchToProps )(SignIn);