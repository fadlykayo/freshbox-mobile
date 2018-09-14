import React,{ PureComponent } from 'react';
import { View, Text, Keyboard, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import VerificationText from '@components/VerificationText';
import FormInput from '@components/FormInput';
import Button from './components/Button';
import styles from './styles';
import Logo from './components/Logo';
import ResetPasswordSuccess from './components/ResetPasswordSuccess';

class ForgotPassword extends PureComponent {
    constructor(){
        super();
        this.state={
            user:{
                email: '',
                autoFocus: true,
            },
            validateStatus:{
                email: true,
                emailLength: true,
                login: true,
            },
            viewVisible: false,
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
        this.setViewVisible = this.setViewVisible.bind(this);
        this.hideView = this.hideView.bind(this)
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
    }

    setViewVisible(visible) {
      this.setState({viewVisible: visible});
    }

    hideView() {
        this.setViewVisible(!this.state.viewVisible);
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
        setTimeout(() => {
            this.setState({validateStatus});
        },1000)
    }

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        validation.emailLength(userEmail)
        .then(() => {
            validation.emailFormat(userEmail)
            .then(() => {
                this.onChangeText('email',userEmail);
                this.setViewVisible(true)
                this.signInHandler();
            })
            .catch(() => {
                this.setValidation('email',false);
                this.clearValidation();
            })
        })
        .catch(() => {
            this.setValidation('emailLength',false);
            this.clearValidation();
        });
    }

    signInHandler(){
        Keyboard.dismiss()
        setTimeout(() => {
            actNav.navigate(navConstant.Menu);
        },3000);
    }

    render(){
        return(
            <Container>
                <NavigationBar 
                    title={'forgotPassword.navigationTitle'}
                    onPress={actNav.goBack}
                />

                <View 
                    style={styles.container}
                    contentContainerStyle={styles.content}
                >
                    <Logo />
                </View>
                
                <View 
                style={styles.container}
                contentContainerStyle={styles.content}
                >
                    <FormInput 
                        ref={c => {this.formEmail = c}}
                        type={'email'}
                        autoFocus={this.state.user.autoFocus}
                        keyboardType={'email-address'}
                        value={this.state.email}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'forgotPassword.formLabel.email'}
                        placeholder={'forgotPassword.formLabel.email'}
                        onSubmitEditing={this.submitEmail}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.emailLength}
                        property={'forgotPassword.validation.emailLength'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.email}
                        property={'forgotPassword.validation.email'}
                    />
                    <Button 
                        title={'forgotPassword.button.submit'}
                        onPress={this.submitEmail}
                    />

                </View>
                <ResetPasswordSuccess
                    viewVisible={this.state.viewVisible}
                />
                
            </Container>
        )
    }
}

export default ForgotPassword;