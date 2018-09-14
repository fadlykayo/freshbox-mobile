import React,{ PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
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
            },
            validateStatus:{
                email: true,
                emailLength: true,
                password: true,
                passwordLength: true,
                login: true,
            }
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitFullName = this.submitFullName.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.submitConfirmPassword = this.submitConfirmPassword.bind(this);
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

    submitFullName(){
      let userFullName = this.state.user.fullName.trim();
      if(userFullName.length > 0) {
        this.onChangeText('fullName', userFullName);
        this.formEmail.focus()
      }
      else {
        alert('failure name')
      }
    }

    submitEmail(){
      let userEmail = this.state.user.email.trim();
      validation.emailLength(userEmail)
      .then(() => {
          validation.emailFormat(userEmail)
          .then(() => {
              this.onChangeText('email',userEmail);
              this.formPassword.focus();
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
      validation.passwordLength(userPassword)
      .then(() => {
          validation.password(userPassword)
          .then(() => {
              this.onChangeText('password',userPassword);
              this.formPassword.blur();
              this.signInHandler();
          })
          .catch(() => {
              this.setValidation('password',false);
              this.clearValidation();
          })
      })
      .catch(() => {
          this.setValidation('passwordLength',false);
          this.clearValidation();
      });
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
                        value={this.state.user.confirmPassword}
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