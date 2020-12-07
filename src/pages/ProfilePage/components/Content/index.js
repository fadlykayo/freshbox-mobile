import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class Content extends Component {
    constructor() {
        super();
        this.spacePhoneNumber = this.spacePhoneNumber.bind(this);
        this.navigateToPhonePage = this.navigateToPhonePage.bind(this);
        this.navigateToAddressPage = this.navigateToAddressPage.bind(this);
        this.navigateToResetPasswordPage = this.navigateToResetPasswordPage.bind(this);
    }

    spacePhoneNumber(input) {
        return input?.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
    }

    navigateToPhonePage() {
        this.props.navigateToPhonePage()
    }

    navigateToAddressPage() {
        this.props.navigateToAddressPage();
    }

    navigateToResetPasswordPage() {
        this.props.navigateToResetPasswordPage();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={this.navigateToPhonePage}
                    style={styles.subcontainer.phone}
                >
                    <StaticText
                        style={styles.text.title}
                        property={'profilePage.content.phone'}
                    />
                    <Text style={styles.text.content}>{this.spacePhoneNumber(this.props.user?.user?.phone_number)}</Text>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_arrow_right}
                        style={styles.icon.send}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.navigateToAddressPage}
                    style={styles.subcontainer.address}
                >
                    <View style={styles.addressSpace}>
                        <StaticText
                            style={styles.text.title}
                            property={'profilePage.content.address'}
                        />
                        <StaticText
                            style={styles.text.content}
                            property={'profilePage.content.address'}
                        />
                    </View>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_arrow_right}
                        style={styles.icon.send}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.navigateToResetPasswordPage}
                    style={styles.subcontainer.password}
                >
                    <StaticText
                        style={styles.text.title}
                        property={'profilePage.content.password'}
                    />
                    <StaticText
                        style={styles.text.content}
                        property={'profilePage.content.resetPassword'}
                    />
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_arrow_right}
                        style={styles.icon.send}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Content;
