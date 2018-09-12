import React,{ PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import Button from './components/Button';
import Register from './components/Register';
import styles from './styles';

class SignIn extends PureComponent {
    constructor(){
        super();
        this.state={
            user:{
                email: '',
                password: ''
            }
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.signInHandler = this.signInHandler.bind(this);
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
                this.formPassword.focus();
            })
            .catch(() => {
                alert('failure');
            })
        }
    }

    signInHandler(){
        alert(`${this.state.user.email} => ${this.state.user.password}`)
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
                        value={this.state.email}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'signIn.formLabel.email'}
                        placeholder={'signIn.formLabel.email'}
                        onSubmitEditing={this.submitEmail}
                    />
                    <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        autoFocus={false}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'signIn.formLabel.password'}
                        placeholder={'signIn.formLabel.password'}
                        onSubmitEditing={this.signInHandler}
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