import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

class BubbleComponent extends Component {
    constructor() {
        super()
    }

    render() {
        if (this.props.images && this.props.images.length > 0) {
            return (
                <View style={styles.page.place}>
                    { this.props.images.map((data, index) => {
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
        else return null
    }
}

export default BubbleComponent;
