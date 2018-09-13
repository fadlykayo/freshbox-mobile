import React,{ PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import Button from './components/Button';
import SignIn from './components/SignIn';
import styles from './styles';

class Register extends PureComponent {
    constructor(){
        super();
        this.state={
            user:{
              fullName: '',
              phone: '',
              email: '',
              password: '',
              confirmPassword: '',
              comparePassword: false
            }
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitFullName = this.submitFullName.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.submitConfirmPassword = this.submitConfirmPassword.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
    }

    onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
    }

    submitFullName(){
        let userFullName = this.state.user.fullName.trim();
        if(userFullName.length > 0) {
            this.onChangeText('fullName', userFullName);
            this.formEmail.focus();
        }
        else {
            alert('failure name');
        }
    }

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        if(userEmail.length > 0){
            validation.email(userEmail)
            .then(() => {
                this.formPhone.focus();
            })
            .catch(() => {
                alert('failure email');
            })
        }
    }

    submitPhone(){
        let userPhone = this.state.user.phone.trim();
        if(userPhone.length > 0){
            validation.phone(userPhone)
            .then(() => {
                this.formPassword.focus();
            })
            .catch(() => {
                alert('failure phone number');
            })
        }
    }

    submitPassword(){
        let userPassword = this.state.user.password.trim();
        if(userPassword.length > 0){
            validation.password(userPassword)
            .then(() => {
                this.formConfirmPassword.focus();
            })
            .catch(() => {
                alert('failure password');
            })
        }
    }

    submitConfirmPassword() {
        let userConfirmPassword = this.state.user.confirmPassword.trim();
        if(userConfirmPassword.length > 0){
            validation.confirmPassword(this.state.user.password, userConfirmPassword)
            .then(() => {
                this.onChangeText('comparePassword', true)
                this.signInHandler();
            })
            .catch(() => {
                alert('password doesn\'t match');
            })
        }
    }

    signInHandler(){
        alert(`${this.state.user.fullName} => ${this.state.user.phone} => ${this.state.user.email} => ${this.state.user.password} => ${this.state.user.confirmPassword} => ${this.state.user.comparePassword}`)
    }

    render(){
        return(
            <Container>
                <NavigationBar 
                    title={'register.navigationTitle'}
                    onPress={actNav.goBack}
                />
                <ScrollView 
                    style={styles.container}
                >
                    <FormInput 
                        ref={c => {this.formFullName = c}}
                        type={'fullName'}
                        autoFocus={true}
                        value={this.state.fullName}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.fullName'}
                        placeholder={'register.formLabel.fullName'}
                        onSubmitEditing={this.submitFullName}
                    />
                    <FormInput 
                        ref={c => {this.formEmail = c}}
                        type={'email'}
                        keyboardType={'email-address'}
                        value={this.state.email}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.email'}
                        placeholder={'register.formLabel.email'}
                        onSubmitEditing={this.submitEmail}
                    />
                    <FormInput 
                        ref={c => {this.formPhone = c}}
                        type={'phone'}
                        keyboardType={'number-pad'}
                        value={this.state.phone}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.phone'}
                        placeholder={'register.formLabel.phone'}
                        onSubmitEditing={this.submitPhone}
                    />
                    <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        isPassword={true}
                        value={this.state.password}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.password'}
                        placeholder={'register.formLabel.password'}
                        onSubmitEditing={this.submitPassword}
                    />

                    <FormInput 
                        ref={c => {this.formConfirmPassword = c}}
                        type={'confirmPassword'}
                        isPassword={true}
                        value={this.state.confirmPassword}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.confirmPassword'}
                        placeholder={'register.formLabel.confirmPassword'}
                        onSubmitEditing={this.submitConfirmPassword}
                    />
                    <Button 
                        title={'register.button.register'}
                        onPress={this.signInHandler}
                    />
                    <SignIn 
                        onPress={actNav.goBack}
                    />
                </ScrollView>
            </Container>
        )
    }
}

export default Register;