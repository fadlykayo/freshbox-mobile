import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import StaticText from '@components/StaticText';
import PhotoComponent from './components/PhotoComponent';
import Content from './components/Content';
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
        this.navigateToPhonePage = this.navigateToPhonePage.bind(this);
        this.navigateToAddressPage = this.navigateToAddressPage.bind(this);
        this.navigateToResetPasswordPage = this.navigateToResetPasswordPage.bind(this);
    }

    navigateBack() {
        actNav.goBack();
    }

    navigateToPhonePage() {
        actNav.navigate(navConstant.PhonePage)
    }

    navigateToAddressPage() {
        actNav.navigate(navConstant.AddressPage)
    }

    navigateToResetPasswordPage() {
        actNav.navigate(navConstant.ResetPasswordPage)
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <PhotoComponent
                        user={this.state.user}
                        navigateBack={this.navigateBack}
                    />

                    <Content
                        user={this.state.user}
                        navigateToPhonePage={this.navigateToPhonePage}
                        navigateToAddressPage={this.navigateToAddressPage}
                        navigateToResetPasswordPage={this.navigateToResetPasswordPage}
                    />
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
