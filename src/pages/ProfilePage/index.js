import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { language } from '@helpers';
import Container from '@components/Container';
import Button from '@components/Button';
import PhotoComponent from './components/PhotoComponent';
import Content from './components/Content';
import styles from './styles';
import actions from '@actions';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

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

    componentWillUnmount() {
        if(this.props.navigation.state.params.closeDrawer) {
			this.props.navigation.state.params.closeDrawer();
		}
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
        actNav.navigate(navConstant.ResetPasswordPage, {action: 'profile'})
    }

    navigateLogOut() {
        this.props.log_out();
        this.props.reset_products();
        this.props.reset_transaction();
		actNav.reset(navConstant.Menu);
    }
    
    choosePhoto() {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: Platform.OS == 'android' ? 0.9 : 0.6,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        

        ImagePicker.showImagePicker( options, (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // console.log("===>",response)
                

                let data = {
                    uri: response.uri,
                    type: response.type == undefined ? 'image/jpeg' : response.type,
                    name: response.fileName == undefined ? 'ImageProfile.jpg' : response.fileName,
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
                    (res) => {
                        language.transformText('message.uploadPhotoSuccess')
				        .then(message => {
				        	this.props.set_success_status({
				        		status: true,
				        		data: message,
				        		title: 'formSuccess.title.default'
				        	});
				        	setTimeout(() => {
				        		this.props.set_success_status({
				        			status: false,
				        			data: '',
				        			title: ''
				        		});
				        	},1000);
				        });
                    },
                    (err) => {
                        language.transformText('message.uploadPhotoError')
			            .then(message => {
			            	this.props.set_error_status({
			            		status: true,
			            		title: 'formError.title.default',
			            		data: message,
                            });
                        });
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
                    <View style={styles.subcontainer.bottom}>
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

const mapStateToProps = (state) => ({
	user: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
    set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
    log_out : () => dispatch(actions.auth.reducer.log_out()),
    reset_products : () => dispatch(actions.product.reducer.reset_products()),
    reset_transaction: () => dispatch(actions.transaction.reducer.reset_transaction()),
    upload_photo: (req, success, failure) => dispatch(actions.user.api.upload_photo(req, success, failure))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
