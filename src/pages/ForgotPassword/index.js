import React,{ Component } from 'react';
import { ScrollView, Keyboard, Text } from 'react-native';
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
import { connect } from 'react-redux';
import actions from '@actions';

class ForgotPassword extends Component {
    constructor(){
        super();
        this.state={
            user:{
                email: '',
            }, 
            validateStatus:{
                emailFormat: true,
                emailLength: true
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
        this.submitEmail = this.submitEmail.bind(this);
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
        validateStatus.emailFormat = true;
        validateStatus.emailLength = true;
        this.setState({validateStatus});
    }

    submitEmail(){
        let userEmail = this.state.user.email.trim();
        this.clearValidation();
        this.onChangeText('email',userEmail);
        this.forgotPasswordValidation();
    }

    forgotPasswordValidation(){
        validation.emailLength(this.state.user.email)
        .then(() => {
            if(this.state.validateStatus.emailLength == false) this.setValidation('emailLength',true);
            validation.emailFormat(this.state.user.email)
            .then(() => {
                if(this.state.validateStatus.emailFormat == false) this.setValidation('emailFormat',true);
                this.forgotPasswordHandler();
            })
            .catch(() => {
                this.setValidation('emailFormat',false);
            })
        })
        .catch(() => {
            this.setValidation('emailLength',false);
        });
    }

    forgotPasswordHandler(){
        let payload = {
            header: {},
            body: {
                email: this.state.user.email
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
                        ref={c => {this.formEmail = c}}
                        type={'email'}
                        autoFocus={true}
                        keyboardType={'email-address'}
                        value={this.state.user.email}
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
                        validation={this.state.validateStatus.emailFormat}
                        property={'forgotPassword.validation.emailFormat'}
                    />
                    { this.state.isWrong ? (<Text style={styles.messageWrong}>{ this.state.messageWrong }</Text>) : (null) }
                    <Button 
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