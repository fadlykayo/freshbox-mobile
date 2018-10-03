import React,{ Component } from 'react';
import { ScrollView, Text, Keyboard } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from './components/Button';
import SignIn from './components/SignIn';
import RegisterSuccess from './components/RegisterSuccess';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class Register extends Component {
    constructor(){
        super();
        this.state={
            user:{
                fullName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            validateStatus:{
                fullName: true,
                emailLength: true,
                emailFormat: true,
                phone: true,
                password: true,
                passwordLength: true,
                confirmPassword: true,
            },
            modalVisible:{
                registerSuccess: false,
            },
            message: '',
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitFullName = this.submitFullName.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.submitConfirmPassword = this.submitConfirmPassword.bind(this);
        this.registerValidation = this.registerValidation.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.closeDialogRegisterSuccess = this.closeDialogRegisterSuccess.bind(this);
    }

    setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

    closeDialogRegisterSuccess(){
        Keyboard.dismiss();
        actNav.navigate(navConstant.Menu);
    }

    onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user})
    }

    setValidation(type,value){
        let validateStatus = this.state.validateStatus;
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = this.state.validateStatus;
        validateStatus.fullName = true;
        validateStatus.emailLength = true;
        validateStatus.emailFormat = true;
        validateStatus.phone = true;
        validateStatus.password = true;
        validateStatus.passwordLength = true;
        validateStatus.confirmPassword = true;
        this.setState({validateStatus});
    }

    submitFullName(){
        let userFullName = this.state.user.fullName.trim();
        this.clearValidation();
        this.onChangeText('fullName',userFullName);
        this.formEmail.focus();
    }

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        this.clearValidation();
        this.onChangeText('email',userEmail);
        this.formPhone.focus();
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
        this.formConfirmPassword.focus();
    }

    submitConfirmPassword() {
        let userConfirmPassword = this.state.user.confirmPassword.trim();
        this.clearValidation();
        this.onChangeText('confirmPassword',userConfirmPassword);
        this.registerValidation();
    }

    registerValidation(){
        validation.fullName(this.state.user.fullName)
        .then(() => {
            if(this.state.validateStatus.fullName == false) this.setValidation('fullName',true);
            validation.emailLength(this.state.user.email)
            .then(() => {
                if(this.state.validateStatus.emailLength == false) this.setValidation('emailLength',true);
                validation.emailFormat(this.state.user.email)
                .then(() => {
                    if(this.state.validateStatus.emailFormat == false) this.setValidation('emailFormat',true);
                    validation.phone(this.state.user.phone)
                    .then(() => {
                        if(this.state.validateStatus.phone == false) this.setValidation('phone',true);
                        validation.passwordLength(this.state.user.password)
                        .then(() => {
                            if(this.state.validateStatus.passwordLength == false) this.setValidation('passwordLength',true);
                            validation.password(this.state.user.password)
                            .then(() => {
                                validation.confirmPassword(this.state.user.password,this.state.user.confirmPassword)
                                .then(() => {
                                    if(this.state.validateStatus.confirmPassword == false) this.setValidation('confirmPassword',true);
                                    this.registerHandler();
                                })
                                .catch(() => {
                                    this.setValidation('confirmPassword',false);
                                })
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
                        this.setValidation('phone',false);
                    })
                })
                .catch(() => {
                    this.setValidation('emailFormat',false);
                })
            })
            .catch(() => {
                this.setValidation('emailLength',false);
            });
        })
        .catch(() => {
            this.setValidation('fullName',false);
        })
    }

    registerHandler(){
        let payload = {
            header: {},
            body: {
                name: this.state.user.fullName,
                email: this.state.user.email,
                phone_number: this.state.user.phone,
                password: this.state.user.password,
                password_confirmation: this.state.user.confirmPassword
            }
        }

        this.props.register_user(payload,
            (res) => {
                this.setModalVisible('registerSuccess', true)
                this.setState({message: res.code_message})

            },
            (err)=> {
                console.log(err);
            })
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
                        value={this.state.user.fullName}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.fullName'}
                        placeholder={'register.formLabel.fullName'}
                        onSubmitEditing={this.submitFullName}
                    />
                    <Text>{JSON.stringify(this.props.user)}</Text>
                    <VerificationText
                        validation={this.state.validateStatus.fullName}
                        property={'register.validation.fullName'}
                    />
                    <FormInput 
                        ref={c => {this.formEmail = c}}
                        type={'email'}
                        keyboardType={'email-address'}
                        value={this.state.user.email}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.email'}
                        placeholder={'register.formLabel.email'}
                        onSubmitEditing={this.submitEmail}
                    />
                    
                    <VerificationText
                        validation={this.state.validateStatus.emailFormat}
                        property={'register.validation.emailFormat'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.emailLength}
                        property={'register.validation.emailLength'}
                    />
                    <FormInput 
                        ref={c => {this.formPhone = c}}
                        type={'phone'}
                        keyboardType={'number-pad'}
                        value={this.state.user.phone}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.phone'}
                        placeholder={'register.formLabel.phone'}
                        onSubmitEditing={this.submitPhone}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.phone}
                        property={'register.validation.phone'}
                    />
                    <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        isPassword={true}
                        value={this.state.user.password}
                        onChangeText={(type,value) => this.onChangeText(type,value)}
                        label={'register.formLabel.password'}
                        placeholder={'register.formLabel.password'}
                        onSubmitEditing={this.submitPassword}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.passwordLength}
                        property={'register.validation.passwordLength'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.password}
                        property={'register.validation.password'}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.confirmPassword}
                        property={'register.validation.confirmPassword'}
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
                    <VerificationText
                        validation={this.state.validateStatus.confirmPassword}
                        property={'register.validation.confirmPassword'}
                    />
                    <Button 
                        title={'register.button.register'}
                        onPress={this.registerValidation}
                    />
                    <SignIn 
                        onPress={actNav.goBack}
                    />
                </ScrollView>
                <RegisterSuccess
                    modalVisible={this.state.modalVisible.registerSuccess}
                    closeDialogRegisterSuccess={this.closeDialogRegisterSuccess}
                    message={this.state.message}
                />
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        register_user: (req,res,err) => dispatch(actions.registration.api.register_user(req,res,err))
    }
}

export default connect(
    null,
    mapDispatchToProps)(Register);