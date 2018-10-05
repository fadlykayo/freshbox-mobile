import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class Content extends Component {
    constructor() {
        super();
        this.spacePhoneNumber = this.spacePhoneNumber.bind(this);
    }

    spacePhoneNumber(input) {
        return input.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
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
                    <Text style={styles.contentText}>{this.spacePhoneNumber(this.props.user.user.phone_number)}</Text>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_arrow_right}
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
                        <StaticText
                            style={styles.contentText}
                            property={'profilePage.content.address'}
                        />
                    </View>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_arrow_right}
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
                        source={images.icon_arrow_right}
                        style={styles.sendButton}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Content;
