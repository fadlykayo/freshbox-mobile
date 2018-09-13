import React,{ PureComponent } from 'react';
import { View, Text, Keyboard, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
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
            viewVisible: false,
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
        this.setViewVisible = this.setViewVisible.bind(this);
        this.hideView = this.hideView.bind(this)
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

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        if(userEmail.length > 0){
            validation.email(userEmail)
            .then(() => {
                this.setViewVisible(true)
                this.signInHandler();
            })
            .catch(() => {
                alert('failure');
            })
        }
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