import React,{ Component } from 'react';
import { ScrollView, View, Keyboard } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import SignIn from './components/SignIn';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{
                fullName: props.navigation.state.params.socmed == undefined ? '' : props.navigation.state.params.socmed.name,
                phone: '',
                email: props.navigation.state.params.socmed == undefined ? '' : props.navigation.state.params.socmed.email,
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
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.submitFullName = this.submitFullName.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitPhone = this.submitPhone.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.submitConfirmPassword = this.submitConfirmPassword.bind(this);
        this.registerValidation = this.registerValidation.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
        this.closeDialogRegisterSuccess = this.closeDialogRegisterSuccess.bind(this);
        this.registerSocmed = this.registerSocmed.bind(this);
    }

    navigateBack() {
        actNav.goBack()
    }

    closeDialogRegisterSuccess(){
        Keyboard.dismiss();
        if (this.props.navigation.state.params.action == 'guestLogin') {
            actNav.goBack(this.props.navigation.state.params.key)
        }
        else {
            actNav.reset(navConstant.Menu);
        }
    }

    onChangeText(type,value){
        let user = JSON.parse(JSON.stringify(this.state.user));
        user[type] = value;
        this.setState({user})
    }

    setValidation(type,value){
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
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
        if (this.props.navigation.state.params.socmed == undefined) {
            this.formPassword.focus();
        }
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
        this.clearValidation();
        validation.register(this.state.user, this.props.navigation.state.params.socmed)
        .then(() => {
            if(this.props.navigation.state.params.socmed == undefined) {
                this.registerHandler();
            } else {
                this.registerSocmed();
            }
        })
        .catch((err) => {
            // console.log(err);
            this.setValidation(err,false);
        });
    }

    registerHandler(){
        let payload = {
            header: {
                onesignalToken: this.props.userId.userId
            },
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
                actNav.navigate(navConstant.OTP, {
                    action: this.props.navigation.state.params.action,
                    key: this.props.navigation.state.params.key,
                    phone_number: this.state.user.phone
                })
            },
            (err)=> {
                // console.log(err);
            }
        )
    }

    registerSocmed() {
        let payload = {
            header: {
                onesignalToken: this.props.userId.userId
            },
            body: {
                name: this.state.user.fullName,
                email: this.state.user.email,
                phone_number: this.state.user.phone,
                // password: this.state.user.password,
                // password_confirmation: this.state.user.confirmPassword,
                sosmed: this.props.navigation.state.params.socmed !== undefined ? this.props.navigation.state.params.socmed.sosmed : '',
                fb_token: this.props.navigation.state.params.socmed !== undefined ? this.props.navigation.state.params.socmed.fb_token !== undefined ? this.props.navigation.state.params.socmed.fb_token : '' : '',
                google_token: this.props.navigation.state.params.socmed !== undefined ? this.props.navigation.state.params.socmed.google_token !== undefined ? this.props.navigation.state.params.socmed.google_token : '' : '',
            }
        }

        this.props.register_user_socmed(payload,
            (res) => {
                if(res.code == 201) {
                    actNav.navigate(navConstant.OTP, {
                        action: this.props.navigation.state.params.action,
                        key: this.props.navigation.state.params.key,
                        phone_number: this.state.user.phone
                    })
                } else {
                    // console.log(res)
                    // actNav.reset(navConstant.Product)
                }
            },
            (err)=> {
                console.log(err);
            }
        )
    }

    renderPasswordForm() {
        if(this.props.navigation.state.params.socmed == undefined) {
            return (
                <>
                <FormInput 
                    ref={c => {this.formPassword = c}}
                    type={'password'}
                    isPassword={true}
                    value={this.state.user.password}
                    onChangeText={this.onChangeText}
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
                    onChangeText={this.onChangeText}
                    label={'register.formLabel.confirmPassword'}
                    placeholder={'register.formLabel.confirmPassword'}
                    onSubmitEditing={this.submitConfirmPassword}
                />
                <VerificationText
                    validation={this.state.validateStatus.confirmPassword}
                    property={'register.validation.confirmPassword'}
                />
                </>

            )
        } else {
            return null
        }
    }

    render(){
        return(
            <Container
                bgColorBottom={'white'}
                bgColorTop={'red'}
            >
                <NavigationBar 
                    title={'register.navigationTitle'}
                    onPress={this.navigateBack}
                />
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={styles.content}
                >
                    <FormInput 
                        ref={c => {this.formFullName = c}}
                        type={'fullName'}
                        autoFocus={this.props.navigation.state.params.socmed == undefined ? true : false}
                        value={this.state.user.fullName}
                        editable={this.props.navigation.state.params.socmed == undefined ? true : false}
                        onChangeText={this.onChangeText}
                        label={'register.formLabel.fullName'}
                        placeholder={'register.formLabel.fullName'}
                        onSubmitEditing={this.submitFullName}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.fullName}
                        property={'register.validation.fullName'}
                    />
                    <FormInput 
                        ref={c => {this.formEmail = c}}
                        type={'email'}
                        keyboardType={'email-address'}
                        value={this.state.user.email}
                        editable={this.props.navigation.state.params.socmed == undefined ? true : false}
                        onChangeText={this.onChangeText}
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
                        onChangeText={this.onChangeText}
                        label={'register.formLabel.phone'}
                        placeholder={'register.formLabel.examplePhone'}
                        onSubmitEditing={this.submitPhone}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.phone}
                        property={'register.validation.phone'}
                    />
                    {this.renderPasswordForm()}
                    {/* <FormInput 
                        ref={c => {this.formPassword = c}}
                        type={'password'}
                        isPassword={true}
                        value={this.state.user.password}
                        onChangeText={this.onChangeText}
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
                        onChangeText={this.onChangeText}
                        label={'register.formLabel.confirmPassword'}
                        placeholder={'register.formLabel.confirmPassword'}
                        onSubmitEditing={this.submitConfirmPassword}
                    />
                    <VerificationText
                        validation={this.state.validateStatus.confirmPassword}
                        property={'register.validation.confirmPassword'}
                    /> */}
                    <View style={styles.subcontainer.button}>
                        <Button
                            type={'red'}
                            title={'register.button.register'}
                            onPress={this.registerValidation}
                        />
                    </View>
                    <SignIn 
                        onPress={this.navigateBack}
                    />
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.user.userId
})

const mapDispatchToProps = (dispatch) => ({
    register_user: (req,res,err) => dispatch(actions.registration.api.register_user(req,res,err)),
    register_user_socmed: (req,res,err) => dispatch(actions.registration.api.register_user_socmed(req,res,err))
})

export default connect(mapStateToProps,mapDispatchToProps)(Register);