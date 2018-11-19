import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

class CircleComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.topComponent}>
                <View style={styles.circle.outer}>
                    <View style={styles.circle.inner}></View>
                </View>
            </View>
        );
    }
}

export default CircleComponent;
