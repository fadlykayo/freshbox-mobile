import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

class CircleComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.topComponent}>
                <View style={styles.circle.outer}>
                    <View style={styles.circle.inner}>
                        <Image source={this.props.data.image} resizeMode='contain' style={styles.circle.image}></Image>
                    </View>
                </View>
            </View>
        );
    }
}

export default CircleComponent;
