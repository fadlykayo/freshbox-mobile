import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import PhotoComponent from './components/PhotoComponent';
import Content from './components/Content';
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
        actNav.navigate(navConstant.ChooseAddress)
    }

    navigateToResetPasswordPage() {
        actNav.navigate(navConstant.ResetPasswordPage)
    }

    navigateLogOut() {
        this.props.log_out();
        this.props.reset_products();
		actNav.reset(navConstant.Menu);
    }
    
    choosePhoto() {
        ImagePicker.showImagePicker( options, (response) => {
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
                // console.log("===>",response)
                let data = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                    data: response.data
                }

                let formData = new FormData();
                formData.append('image', data)

                let payload = {
                    header: {
                        apiToken: this.props.user.authorization
                    },
                    body: formData
                }

                this.props.upload_photo(payload,
                    (success) => {
                    },
                    (err) => {
                        console.log(err)
                    })

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        })
    }

    render() {
        return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
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
                        <Button
                            type={'white'}
                            onPress={this.navigateLogOut}
                            title={'profilePage.button.signOut'}
                        />
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
        reset_products : () => dispatch(actions.product.reducer.reset_products()),
        upload_photo: (req, success, failure) => dispatch(actions.user.api.upload_photo(req, success, failure))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(ProfilePage);
