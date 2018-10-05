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

                <TouchableOpacity
                    onPress={() => this.props.choosePhoto()}
				>
				{ this.props.user.user.images == null ? (
					<Image
						resizeMode={'contain'} 
						source={images.icon_img_ava_grey}
						style={styles.photo}
					/>
				) : (
					<Image
						resizeMode={'contain'} 
						source={this.props.user.user.images}
						style={styles.photo}
					/>
				) }
				</TouchableOpacity>
                <Text style={styles.userName}>{this.props.user.user.name}</Text>
                <Text style={styles.userEmail}>{this.props.user.user.email}</Text>





                {/* <TouchableOpacity
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
                /> */}
                
            </ImageBackground>
        );
    }
}

export default PhotoComponent;
