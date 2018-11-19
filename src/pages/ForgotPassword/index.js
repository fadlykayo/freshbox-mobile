import React,{ Component } from 'react';
import { ScrollView, Keyboard, Text } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import VerificationText from '@components/VerificationText';
import FormInput from '@components/FormInput';
import Button from '@components/Button';
import styles from './styles';
import Logo from './components/Logo';
import ResetPasswordSuccess from './components/ResetPasswordSuccess';
import { connect } from 'react-redux';
import actions from '@actions';

class ForgotPassword extends Component {
    constructor(){
        super();
        this.state={
            user:{
                phone: '',
            }, 
            validateStatus:{
                phone: true,
            },
            modalVisible:{
                resetPasswordSuccess: false,
            },
            messageResetPassword: '',
            isWrong: false,
            messageWrong: '',
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.forgotPasswordValidation = this.forgotPasswordValidation.bind(this);
        this.forgotPasswordHandler = this.forgotPasswordHandler.bind(this);
        this.closeDialogResetPasswordSuccess = this.closeDialogResetPasswordSuccess.bind(this);
    }

    onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
    }


    setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

    setValidation(type,value){
        let validateStatus = this.state.validateStatus;
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = this.state.validateStatus;
        validateStatus.phone = true;
        this.setState({validateStatus});
    }

    submitPhone(){
        let userPhone = this.state.user.phone.trim();
        this.clearValidation();
        this.onChangeText('phone',userPhone);
        this.forgotPasswordValidation();
    }

    forgotPasswordValidation(){
        validation.phone(this.state.user.phone)
        .then(() => {
            if(this.state.validateStatus.phone == false) this.setValidation('phone',true);
            this.forgotPasswordHandler();
        })
        .catch(() => {
            this.setValidation('emailFormat',false);
        })
    }

    forgotPasswordHandler(){
        let payload = {
            header: {},
            body: {
                phone_number: this.state.user.phone
            }
        }

        this.props.forgot_password(payload,
            (success) => {
                this.setModalVisible('resetPasswordSuccess',true);
                let state = this.state;
                state.messageResetPassword = success.code_message;
                state.isWrong= false,
                state.messageWrong= '',
                this.setState({state});
            },
            (err) => {
                let state = this.state;
                state.isWrong = true;
                state.messageWrong = err.code_message;
                this.setState({state})
            })
        
    }

    closeDialogResetPasswordSuccess(){
        Keyboard.dismiss();
        actNav.goBack();
    }

    render(){
        return(
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar 
                    title={'forgotPassword.navigationTitle'}
                    onPress={actNav.goBack}
                />
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={styles.content}
                >
                    <Logo />
                    <FormInput 
                        ref={c => {this.formPhone = c}}
                        type={'phone'}
                        autoFocus={true}
                        keyboardType={'number-pad'}
                        value={this.state.user.phone}
                        onChangeText={this.onChangeText}
                        label={'forgotPassword.formLabel.phone'}
                        placeholder={'forgotPassword.formLabel.phone'}
                        onSubmitEditing={this.submitPhone}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.phone}
                        property={'forgotPassword.validation.phone'}
                    />
                    { this.state.isWrong ? (<Text style={styles.messageWrong}>{ this.state.messageWrong }</Text>) : (null) }
                    <Button
                        type={'red'}
                        title={'forgotPassword.button.submit'}
                        onPress={this.forgotPasswordValidation}
                    />
                </ScrollView>
                <ResetPasswordSuccess
                    messageResetPassword = {this.state.messageResetPassword}
                    modalVisible={this.state.modalVisible.resetPasswordSuccess}
                    closeDialogResetPasswordSuccess={this.closeDialogResetPasswordSuccess}
                />
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forgot_password: (req, success, failure) => dispatch(actions.auth.api.forgot_password(req, success, failure))
    }
}

export default connect(
    null,
    mapDispatchToProps)(ForgotPassword);