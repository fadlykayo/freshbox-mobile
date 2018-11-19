import React, { Component } from 'react';
import { View } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Content extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.info}>
                <View style={styles.title.place}>
                    <StaticText
                        property={this.props.data.title}
                        style={styles.title.text}
                    />
                </View>
                <View style={styles.contentText.place}>
                    <StaticText
                        property={this.props.data.content}
                        style={styles.contentText.text}
                    />
                </View>   
            </View>
        );
    }
}

export default Content;
