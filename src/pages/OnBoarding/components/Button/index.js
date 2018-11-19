import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import images from '@assets';

class Button extends Component {
    constructor() {
        super()
        this.navigateToNextPage = this.navigateToNextPage.bind(this);
    }

    navigateToNextPage(index) {
        this.props.navigateToNextPage(index);
    }

    render() {
        if(this.props.bubble < this.props.length) {
            return (
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => this.navigateToNextPage(this.props.bubble)}>
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
