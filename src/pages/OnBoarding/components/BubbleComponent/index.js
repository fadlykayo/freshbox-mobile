import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

class BubbleComponent extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.page.place}>
                { this.props.button.map((data, index) => {
                    if (this.props.bubble == index) {
                        return <View key={index} style={styles.page.selected}></View>
                    }
                    else {
                        return <View key={index} style={styles.page.unselected}></View>
                    }
                })}            
            </View>
        );
    }
}

export default BubbleComponent;
