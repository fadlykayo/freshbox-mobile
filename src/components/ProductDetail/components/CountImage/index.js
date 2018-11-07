import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class CountImage extends Component {
    render() {
        if (this.props.images.length > 0) {
            return (
                <View style={styles.container}>
                    <StaticText
                        style={styles.text}
                        property={'productList.content.count'}
                        params=
                        {{
                            bubble: this.props.bubble+1,
                            length: this.props.images.length
                        }}
                    />
                </View>
            );
        }
        else return null
    }
}

export default CountImage;
