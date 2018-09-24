import React, { Component } from 'react';
import { Text, ImageBackground, Image, TouchableOpacity } from 'react-native';

import images from '@assets';
import styles from './styles';

class PhotoComponent extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <ImageBackground
                resizeMode={'stretch'} 
                source={images.background_profile}
                style={styles.background}
            >
                <TouchableOpacity
                    onPress={() => this.props.navigateBack()}
                    style={styles.touchableBackButton}
                >
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back_white}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Image
                    resizeMode={'contain'} 
                    source={this.props.user.photo}
                    style={styles.photo}
                />
                <Text style={styles.userName}>{this.props.user.name}</Text>
                <Text style={styles.userEmail}>{this.props.user.email}</Text>
            </ImageBackground>
        );
    }
}

export default PhotoComponent;
