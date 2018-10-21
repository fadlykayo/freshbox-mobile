import React,{ Component } from 'react';
import { ScrollView, StatusBar, Platform } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
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
                email: 'alibaihaqi1704@gmail.com',
                password: 'ali12346'
            },
            validateStatus:{
                emailFormat: true,
                emailLength: true,
                password: true,
                passwordLength: true,
            }
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
        this.clearValidation();
        validation.signInEmail(this.state.user.email,this.state.user.password)
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
                email: this.state.user.email,
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

            }
        );
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
    sign_in : (req,res,err) => dispatch(actions.auth.api.sign_in(req,res,err))
});

export default connect(null,mapDispatchToProps)(SignIn);