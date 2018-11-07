import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import images from '@assets';

class Button extends Component {
    constructor() {
        super()
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.navigateToNextPage();
    }

    render() {
        if(this.props.bubble < this.props.length) {
            return (
                <View style={styles.button}>
                    <TouchableOpacity onPress={this.navigateToNextPage}>
                        <Image
                            style={styles.logo}
                            source={images.icon_right_red}
                        />
                    </TouchableOpacity>
                </View>
            ) 
        }
        else return null;
    }
}

export default Button;
