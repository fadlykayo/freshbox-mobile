import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {actNav, navConstant} from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import {connect} from 'react-redux';
import actions from '@actions';
import {validation} from '@helpers';
import styles from './styles';

class AppleSignIn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        email: '',
        appleToken: props.navigation.state.params.apple_token,
      },
      validateStatus: {
        emailLength: true,
        emailFormat: true,
      },
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.validationSignIn = this.validationSignIn.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.setValidation = this.setValidation.bind(this);
  }

  clearValidation() {
    let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
    validateStatus.emailLength = true;
    validateStatus.emailFormat = true;
    validateStatus.email = true;
    this.setState({validateStatus});
  }

  setValidation(type, value) {
    let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
    validateStatus[type] = value;
    this.setState({validateStatus});
  }

  validationSignIn() {
    this.clearValidation();
    validation.appleSignIn(this.state.user)
      .then(() => {
        let payload = {
          header: {
            onesignalToken: this.props.userId.userId
          },
          body: {
            sosmed: "apple",
            apple_token: this.state.user.appleToken,
            email: this.state.user.email,
          }
        };
        this.props.sign_in_socmed(payload,
          () => {
            actNav.reset(navConstant.Dashboard);
          },
          (err) => {
            let params = {
              name: '',
              email: this.state.user.email,
              sosmed: "apple",
              apple_token: this.state.user.appleToken,
            };

            console.log('param', params, err);
            switch (err.code) {
              case 404:
                actNav.navigate(navConstant.Register, {action: 'menuLogin', socmed: params});
                break;
              case 400:
                actNav.navigate(navConstant.OTP, {phone_number: err.data.phone_number, verifyOTP: true}); break;
              default:
                break;
            }
          });
      })
      .catch((err) => {
        this.setValidation(err, false);
      });
  }

  onChangeText(type, value) {
    let user = JSON.parse(JSON.stringify(this.state.user));
    user[type] = value;
    this.setState({user});
  }

  submitEmail() {
    let userEmail = this.state.user.email.trim();
    this.clearValidation();
    this.onChangeText('email', userEmail);
    this.formPhone.focus();
  }

  navigateBack() {
    actNav.goBack();
  };

  render() {
    return (
      <Container
        bgColorBottom={'white'}
        bgColorTop={'red'}
      >
        <NavigationBar
          title={'signIn.navigationTitle'}
          onPress={this.navigateBack} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
        >
          <FormInput
            type={'email'}
            keyboardType={'email-address'}
            value={this.state.user.email}
            editable={true}
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
          <View style={styles.subcontainer.button}>
            <Button
              type={'red'}
              title={'signIn.button.signIn'}
              onPress={this.validationSignIn}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
};

const mapStateToProps = state => ({
  userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({
  sign_in_socmed: (req, res, err) => dispatch(actions.auth.api.sign_in_socmed(req, res, err)),
  set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppleSignIn);