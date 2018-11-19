import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class Verification extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.data === undefined)  {
            return <View style={[styles.otp.box, styles.otp.empty]}></View>
        }
        else {
            return (
                <View style={styles.otp.box}>
                    <Text style={styles.otp.text}>{this.props.data}</Text>
                </View>
            )
        }
    }
}

export default Verification;
