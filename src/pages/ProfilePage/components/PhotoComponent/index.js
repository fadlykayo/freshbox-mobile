import React, { Component } from 'react';
import { Text, ImageBackground, Image, TouchableOpacity } from 'react-native';

import images from '@assets';
import styles from './styles';

class PhotoComponent extends Component {
    constructor() {
        super()
    }

    render() {
        console.log(`http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/media/profile/10/original-${this.props.user.user.image}`)
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
					<Image
						resizeMode={'contain'} 
                        source={ 
                            this.props.user.user.image == '' 
                            ? images.icon_img_ava_grey
                            : {uri: `http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/media/profile/10/original-${this.props.user.user.image}`}
                        }
						style={
                            this.props.user.user.image == ''
                            ? styles.dummyPhoto
                            : styles.photo
                        }
					/>
				</TouchableOpacity>
                <Text style={styles.userName}>{this.props.user.user.name}</Text>
                <Text style={styles.userEmail}>{this.props.user.user.email}</Text>
                
            </ImageBackground>
        );
    }
}

export default PhotoComponent;
