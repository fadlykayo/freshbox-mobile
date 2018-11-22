import React,{ Component } from 'react';
import { View, ScrollView, Keyboard, Text } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation, language } from '@helpers';
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
        this.navigateBack = this.navigateBack.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.forgotPasswordValidation = this.forgotPasswordValidation.bind(this);
        this.forgotPasswordHandler = this.forgotPasswordHandler.bind(this);
        this.closeDialogResetPasswordSuccess = this.closeDialogResetPasswordSuccess.bind(this);
    }

    navigateBack() {
        actNav.goBack();
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

        actNav.navigate(navConstant.ResetPasswordPage, {action: 'forgotPassword', phone: this.state.user.phone})
        // this.props.forgot_password(payload,
        //     (success) => {
        //         actNav.navigate(navConstant.ResetPasswordPage)
        //     },
        //     (err) => {
        //         language.transformText('message.invalidPhone')
        //         .then(message => {
        //             this.props.set_error_status({
        //                 status: true,
        //                 title: 'formError.title.default',
        //                 data: message,
        //             });
        //         });
        //     })
        
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
                    onPress={this.navigateBack}
                />
                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
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
                        placeholder={'signIn.formLabel.examplePhone'}
                        onSubmitEditing={this.submitPhone}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.phone}
                        property={'forgotPassword.validation.phone'}
                    />
                    { this.state.isWrong ? (<Text style={styles.messageWrong}>{ this.state.messageWrong }</Text>) : null }
                    <View style={styles.button}>
                        <Button
                            type={'red'}
                            title={'forgotPassword.button.request'}
                            onPress={this.forgotPasswordValidation}
                        />
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    forgot_password: (req,res,err) => dispatch(actions.auth.api.forgot_password(req,res,err)),
    set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
    set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
})

export default connect(null,mapDispatchToProps)(ForgotPassword);