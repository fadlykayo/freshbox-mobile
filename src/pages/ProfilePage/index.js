import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: 'John Doe',
                photo: images.icon_img_ava,
                email: 'john.doe@freshbox.com',
                phone: '0822 1234 5678',
                province: 'Jawa Barat',
                city: 'Bandung',
                zipCode: '14016',
                kecamatan: 'Ujungberung',
                kelurahan: 'Passanggrahan',
                address: 'Jl. Jatiluhur III No. 167 B',
                addressDetail: 'Pagar Hijau Dekat Tiang Listrik'
            }
        }
        this.navigateBack = this.navigateBack.bind(this);
    }

    navigateBack() {
        actNav.goBack();
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <ImageBackground
                        resizeMode={'stretch'} 
                        source={images.background_profile}
                        style={styles.background}
                    >
                        <TouchableOpacity
                            onPress={() => alert('go Back')}
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
                            source={this.state.user.photo}
                            style={styles.photo}
                        />
                        <Text style={styles.userName}>{this.state.user.name}</Text>
                        <Text style={styles.userEmail}>{this.state.user.email}</Text>
                    </ImageBackground>

                    <View style={styles.middleComponent}>
                        <TouchableOpacity style={styles.phoneComponent}>
                            <StaticText
                                style={styles.staticText}
                                property={'profilePage.content.phone'}
                            />
                            <Text style={styles.contentText}>{this.state.user.phone}</Text>

                            <Image
                                resizeMode={'contain'} 
                                source={images.icon_back}
                                style={styles.sendButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addressComponent}>
                            <View style={styles.addressSpace}>
                                <StaticText
                                    style={styles.staticText}
                                    property={'profilePage.content.address'}
                                />
                                <Text>{this.state.user.address}<StaticText 
                                property={'profilePage.content.comma'}/>{this.state.user.city}<StaticText
                                property={'profilePage.content.comma'}/>{this.state.user.province}<StaticText 
                                property={'profilePage.content.kecamatan'}/>{this.state.user.kecamatan}<StaticText
                                property={'profilePage.content.kelurahan'}/>{this.state.user.kelurahan}</Text>
                            </View>
                            <Image
                                resizeMode={'contain'} 
                                source={images.icon_back}
                                style={styles.sendButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.passwordComponent}>
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
                    <View style={styles.bottomComponent}>
                        <TouchableOpacity style={styles.signOutButton}>
                            <StaticText
                                style={styles.signOutText}
                                property={'profilePage.button.signOut'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

export default ProfilePage;
