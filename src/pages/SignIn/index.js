import React,{ Component } from 'react';
import { ScrollView } from 'react-native';
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
            }
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
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
        validateStatus.email = true;
        validateStatus.emailLength = true;
        validateStatus.password = true;
        validateStatus.passwordLength = true;
        setTimeout(() => {
            this.setState({validateStatus});
        },1000)
    }

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        this.onChangeText('email',userEmail);
        this.formPassword.focus();
    }

    submitPassword(){
        let userPassword = this.state.user.password.trim();
        this.onChangeText('password',userPassword);
        this.formPassword.blur();
        this.signInHandler();
    }

    signInHandler(){
        let userEmail = this.state.user.email;
        let userPassword = this.state.user.password;
        validation.emailLength(userEmail)
        .then(() => {
            if(this.state.validateStatus.emailLength == false) this.setValidation('emailLength',true);
            validation.emailFormat(userEmail)
            .then(() => {
                if(this.state.validateStatus.emailFormat == false) this.setValidation('emailFormat',true);
                validation.passwordLength(userPassword)
                .then(() => {
                    validation.password(userPassword)
                    .then(() => {
                        alert('success')
                    })
                    .catch(() => {
                        this.setValidation('password',false);
                        // this.clearValidation();
                    })
                })
                .catch(() => {
                    this.setValidation('passwordLength',false);
                    // this.clearValidation();
                });
            })
            .catch(() => {
                this.setValidation('emailFormat',false);
                // this.clearValidation();
            })
        })
        .catch(() => {
            this.setValidation('emailLength',false);
            // this.clearValidation();
        });
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
                    keyboardShouldPersistTaps={'always'}
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
                        property={'signIn.validation.email'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.login}
                        property={'signIn.validation.login'}
                    />
                    <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        autoFocus={false}

                        secureTextEntry={true}
                        value={this.state.user.password}
                        isPassword={true}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'signIn.formLabel.password'}
                        placeholder={'signIn.formLabel.password'}
                        onSubmitEditing={this.signInHandler}
                    />

                    <ForgotPassword 
                        onPress={() => actNav.navigate(navConstant.ForgotPassword)}
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
                        onPress={this.signInHandler}
                    />
                    <Register 
                        onPress={() => actNav.navigate(navConstant.Register)}
                    />
                </ScrollView>
            </Container>
        )
    }
}

export default SignIn;