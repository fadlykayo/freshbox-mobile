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
            <View style={styles.container}>
                <View style={styles.subcontainer.inner}>
                    <StaticText
                        style={styles.text.top}
                        property={'transferInstruction.content.top.info'}
                    />
                    <StaticText
                        style={styles.text.bottom}
                        property={'transferInstruction.content.top.dateInfo'}
                        params={this.props.params}
                    />
                </View>
            </View>
        );
    }
}

export default CountDown;
