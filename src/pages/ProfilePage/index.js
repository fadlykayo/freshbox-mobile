import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import StaticText from '@components/StaticText';
import PhotoComponent from './components/PhotoComponent';
import Content from './components/Content';
import images from '@assets';
import styles from './styles';
import actions from '@actions';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.navigateBack = this.navigateBack.bind(this);
        this.navigateToPhonePage = this.navigateToPhonePage.bind(this);
        this.navigateToAddressPage = this.navigateToAddressPage.bind(this);
        this.navigateToResetPasswordPage = this.navigateToResetPasswordPage.bind(this);
        this.navigateLogOut = this.navigateLogOut.bind(this);
        this.choosePhoto = this.choosePhoto.bind(this);
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

    navigateLogOut() {
        this.props.log_out();
        this.props.clear_products();
		actNav.reset(navConstant.Menu);
    }
    
    choosePhoto() {
        ImagePicker.showImagePicker( options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log(source)
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        })
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <PhotoComponent
                        user={this.props.user}
                        navigateBack={this.navigateBack}
                        choosePhoto={this.choosePhoto}
                    />

                    <Content
                        user={this.props.user}
                        navigateToPhonePage={this.navigateToPhonePage}
                        navigateToAddressPage={this.navigateToAddressPage}
                        navigateToResetPasswordPage={this.navigateToResetPasswordPage}
                    />
                    <View style={styles.bottomComponent}>
                        <TouchableOpacity style={styles.signOutButton} onPress={this.navigateLogOut}>
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

const mapStateToProps = (state) => {
	return {
		user: state.user.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        log_out : () => dispatch(actions.auth.reducer.log_out()),
        clear_products : () => dispatch(actions.product.reducer.clear_products())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(ProfilePage);
