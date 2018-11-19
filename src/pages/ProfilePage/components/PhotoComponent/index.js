import React, { Component } from 'react';
import { Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import images from '@assets';
import styles from './styles';

class PhotoComponent extends Component {
    constructor() {
        super()
        this.choosePhoto = this.choosePhoto.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
    }

    choosePhoto() {
        this.props.choosePhoto();
    }

    navigateBack() {
        this.props.navigateBack();
    }

    render() {
        return (
            <ImageBackground
                resizeMode={'stretch'} 
                source={images.background_profile}
                style={styles.background}
            >
                <TouchableOpacity
                    onPress={this.navigateBack}
                    style={styles.touchableBackButton}
                >
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back_white}
                        style={styles.button.back}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.choosePhoto}>
					<Image
						resizeMode={'contain'} 
                        source={ 
                            this.props.user.user.image == '' || this.props.user.user.image == null
                            ? images.icon_img_ava_grey
                            : {uri: `http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/media/profile/10/original-${this.props.user.user.image}`}
                        }
						style={
                            this.props.user.user.image == '' || this.props.user.user.image == null
                            ? styles.photo.dummy
                            : styles.photo.real
                        }
					/>
				</TouchableOpacity>
                <Text style={styles.user.name}>{this.props.user.user.name}</Text>
                <Text style={styles.user.phone}>{this.props.user.user.phone_number}</Text>
                
            </ImageBackground>
        );
    }
}

export default PhotoComponent;
