import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class CountDown extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <View style={styles.top.place}>
                <View style={styles.top.innerPlace}>
                    <StaticText
                        style={styles.top.text.top}
                        property={'transferInstruction.content.top.info'}
                    />
                    {/* <Text style={styles.top.text.middle}>{this.props.countDown}</Text> */}
                    <StaticText
                        style={styles.top.text.bottom}
                        property={'transferInstruction.content.top.dateInfo'}
                        params={this.props.params}
                    />
                </View>
            </View>
        );
    }
}

export default CountDown;
