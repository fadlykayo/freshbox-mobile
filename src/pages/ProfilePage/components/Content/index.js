import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class Content extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.middleComponent}>
                <TouchableOpacity 
                    onPress={() => this.props.navigateToPhonePage()}
                    style={styles.phoneComponent}
                >
                    <StaticText
                        style={styles.staticText}
                        property={'profilePage.content.phone'}
                    />
                    <Text style={styles.contentText}>{this.props.user.phone}</Text>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.sendButton}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => this.props.navigateToAddressPage()}
                    style={styles.addressComponent}
                >
                    <View style={styles.addressSpace}>
                        <StaticText
                            style={styles.staticText}
                            property={'profilePage.content.address'}
                        />
                        <Text>{this.props.user.address}<StaticText 
                        property={'profilePage.content.comma'}/>{this.props.user.city}<StaticText
                        property={'profilePage.content.comma'}/>{this.props.user.province}<StaticText 
                        property={'profilePage.content.kecamatan'}/>{this.props.user.kecamatan}<StaticText
                        property={'profilePage.content.kelurahan'}/>{this.props.user.kelurahan}</Text>
                    </View>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.sendButton}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => this.props.navigateToResetPasswordPage()}
                    style={styles.passwordComponent}
                >
                    <StaticText
                        style={styles.staticText}
                        property={'profilePage.content.password'}
                    />
                    <StaticText
                        style={styles.contentText}
                        property={'profilePage.content.resetPassword'}
                    />
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.sendButton}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Content;
