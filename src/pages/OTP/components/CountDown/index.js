import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class CountDown extends Component {
    constructor() {
        super();
        this.resendOTP = this.resendOTP.bind(this);
        this._renderCountDown = this._renderCountDown.bind(this);
    }

    resendOTP() {
        this.props.resendOTP()
    }

    _renderCountDown() {
        return this.props._renderCountDown()
    }

    render() {
        return (
            <View style={styles.resend.place}>
                { this.props.countDownOver ? (
                    <TouchableOpacity style={styles.resend.button} onPress={this.resendOTP}>
                        <StaticText
                            style={styles.static.text.darkGrey(this.props.countDownOver)}
                            property={'otp.button.resend'}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.resend.button}>
                        <StaticText
                            style={styles.static.text.darkGrey(this.props.countDownOver)}
                            property={'otp.button.resend'}
                        />
                    </View>
                )}
                { this._renderCountDown() }
            </View>
        );
    }
}

export default CountDown;
