import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { validation } from '@helpers';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import Button from '@components/Button';
import StaticText from '@components/StaticText';
import CountDown from './components/CountDown';
import Verification from './components/Verification';
import styles from './styles';
import actions from '@actions';
import { connect } from 'react-redux';

class OTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            seconds: 60,
            countDownOver: false,
            otp: '',
        };
        this.seconds = null;
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.clickOTP = this.clickOTP.bind(this);
        this._renderCountDown = this._renderCountDown.bind(this);
        this.resendOTP = this.resendOTP.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.submitOTP = this.submitOTP.bind(this);
    }

    componentDidMount() {
        this.startTimer()
        if(this.props.navigation.state.params.verifyOTP) {
            this.resendOTP();
        };
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    resendOTP() {
        let state = this.state;
        state.seconds = 60;
        state.countDownOver = false;

        let payload = {
            header: {},
            body: {
                phone_number: this.props.navigation.state.params.phone_number
            }
        }
        this.setState(state, () => {
            this.startTimer();
            this.props.otp_resend(payload,
                () => {},
                (err) => {
                    // console.log(err)
                })
        })
    }

    _renderCountDown() {
        let seconds = this.state.seconds;
        let minute = seconds/60;
        let rminute = Math.floor(minute);
        let newSeconds = Math.floor((minute-rminute)*60);
        
        if (seconds >= 0) {
            return (<Text style={styles.static.text.red}>(0{rminute}.{newSeconds < 10 ? `0${newSeconds}` : newSeconds})</Text>)
        }
    }

    startTimer() {
        let newSeconds = this.state.seconds;

        if (newSeconds > 0) {
            setTimeout(() => {
                newSeconds -= 1;
                this.setState({seconds: newSeconds}, () => {
                    this.startTimer()
                })
            }, 1000)
        }
        else {
            this.setState({ countDownOver: true }, () => {
                this.stopTimer()
            })
        }
    }

    stopTimer() {
        clearTimeout(this.seconds)
    }

    onChangeText(type, value) {
        let state = this.state;
        state[type] = value;
        this.setState(state);
        if(this.state.otp.length == 4) {
            this.submitOTP();
        };
    }

    navigateBack() {
        actNav.goBack();
    }

    blur(){
        this.TextInput.blur();
    }

    focus(){
        this.TextInput.focus();
    }

    clickOTP() {
        let state = this.state;
        if (state.isFocused) {
            state.isFocused = false;
            this.setState(state, () => {
                this.blur();
            })
        }
        else {
            state.isFocused = true;
            this.setState(state, () => {
                this.focus()
            })
        }
    }

    submitOTP() {
        validation.otp(this.state.otp)
        .then(() => {
            let payload = {
                header: {},
                body: {
                    phone_number: this.props.navigation.state.params.phone_number,
                    otp: this.state.otp
                }
            }

            this.props.otp_verification(payload,
                () => {
                    this.stopTimer();
                    if (this.props.navigation.state.params.action == 'guestLogin') {
                        this.props.navigation.goBack(this.props.navigation.state.params.key)
                    }
                    else {
                        actNav.reset(navConstant.Product)
                    }
                },
                (err) => {
                    language.transformText('message.invalidOTP')
			        .then(message => {
			        	this.props.set_error_status({
			        		status: true,
			        		title: 'formError.title.default',
			        		data: message,
                        });
                    });
                })
            
        })
        .catch(() => {
            language.transformText('message.invalidPhoneFormat')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.default',
					data: message,
                });
            });
        })
    }

    render() {
        return (
            <Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
			>
                <NavigationBar
                    title={'otp.navigationTitle'}
                    onPress={this.navigateBack}
                />
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={styles.content}
                >
                    <TouchableOpacity style={styles.otp.place} onPress={this.clickOTP}>
                        <Verification data={this.state.otp[0]} />
                        <Verification data={this.state.otp[1]} />
                        <Verification data={this.state.otp[2]} />
                        <Verification data={this.state.otp[3]} />
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={this.clickOTP}>
                        <View style={styles.static.place}>
                            <Text style={styles.static.text.red}>{this.props.navigation.state.params.phone_number == undefined ? '' : this.props.navigation.state.params.phone_number}</Text>

                            <StaticText
                                property={'otp.content.info'}
                                style={styles.static.text.grey}
                            />
                            <CountDown
                                resendOTP={this.resendOTP}
                                countDownOver={this.state.countDownOver}
                                _renderCountDown={this._renderCountDown}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TextInput
                        ref={c => {this.TextInput = c}}
                        autoFocus={true}
                        keyboardType={'number-pad'}
                        contextMenuHidden={true}
                        returnKeyType={'done'}
                        value={this.state.otp}
                        caretHidden={true}
                        maxLength={4}
                        style={styles.textinput.text}
                        onChangeText={(value) => this.onChangeText('otp', value)}
                        onSubmitEditing={this.submitOTP}
                    />
                    <View style={styles.button.container}>
                        <Button
                            type={'red'}
                            title={'otp.button.submit'}
                            onPress={this.submitOTP}
                        />
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    otp_verification: (req,res,err) => dispatch(actions.auth.api.otp_verification(req,res,err)),
    otp_resend: (req,res,err) => dispatch(actions.auth.api.otp_resend(req,res,err)),
    set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
})

export default connect(null, mapDispatchToProps)(OTP);
