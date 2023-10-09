import React, { Component } from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import { actNav, navConstant } from '@navigations';
import { language } from '@helpers';
import Container from '@components/Container';
import Button from '@components/Button';
import AlertDialog from '@components/AlertDialog';
import actions from '@actions';

import PhotoComponent from './components/PhotoComponent';
import Content from './components/Content';
import styles from './styles';

class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			loading: false
		};
		this.navigateBack = this.navigateBack.bind(this);
		this.navigateToPhonePage = this.navigateToPhonePage.bind(this);
		this.navigateToAddressPage = this.navigateToAddressPage.bind(this);
		this.navigateToResetPasswordPage = this.navigateToResetPasswordPage.bind(this);
		this.navigateToEmailPage = this.navigateToEmailPage.bind(this);
		this.navigateLogOut = this.navigateLogOut.bind(this);
		this.choosePhoto = this.choosePhoto.bind(this);
		this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this);
		this.resetData = this.resetData.bind(this);
		this.onRemoveAccount = this.onRemoveAccount.bind(this);
		this.setLoading = this.setLoading.bind(this);
	}

	componentWillUnmount() {
		if (this.props.navigation.state.params.closeDrawer) {
			this.props.navigation.state.params.closeDrawer();
		}
	}

	navigateBack() {
		actNav.goBack();
	}

	navigateToPhonePage() {
		actNav.navigate(navConstant.PhonePage);
	}

	navigateToNamePage() {
		actNav.navigate(navConstant.NamePage);
	}

	navigateToAddressPage() {
		actNav.navigate(navConstant.ChooseAddress);
	}

	navigateToResetPasswordPage() {
		actNav.navigate(navConstant.ResetPasswordPage, { action: 'profile' });
	}

	resetData() {
		this.props.reset_products();
		this.props.reset_transaction();
		actNav.reset(navConstant.Dashboard);
	};

	navigateLogOut() {
		this.props.log_out();
		this.resetData();
	}

	onRemoveAccount() {
		this.setLoading(true)
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
		}

		this.props.remove_account( payload,
			() => {
				this.toggleModalConfirmation()
				this.resetData();
				this.setLoading()
			},
			() => {
				this.setLoading()
			})
	};

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

		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				// console.log('User cancelled image picker');
			} else if (response.error) {
				// console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				// console.log('User tapped custom button: ', response.customButton);
			} else {
				let data = {
					uri: response.uri,
					type: response.type ? response.type : 'image/jpeg',
					name: response.fileName == undefined ? 'ImageProfile.jpg' : response.fileName,
					data: response.data
				};

				let formData = new FormData();
				formData.append('image', data);

				let payload = {
					header: {
						apiToken: this.props.user.authorization ? this.props.user.authorization : ''
					},
					body: formData
				};

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
								}, 1000);
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
					});
			}
		});
	}

	toggleModalConfirmation() {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
	};

	navigateToEmailPage() {
		actNav.navigate(navConstant.EmailPage);
	};

	setLoading(loading = false) {
		this.setState({
			loading
		})
	};

	render() {
		return (
			<Container
				bgColorBottom={ 'veryLightGrey' }
				bgColorTop={ 'red' }
			>
				<View style={ styles.container }>
					<PhotoComponent
						user={ this.props.user ? this.props.user : {} }
						navigateBack={ this.navigateBack }
						choosePhoto={ this.choosePhoto }
						onChangeName={ this.navigateToNamePage }
					/>

					<Content
						user={ this.props.user ? this.props.user : {} }
						navigateToPhonePage={ this.navigateToPhonePage }
						navigateToAddressPage={ this.navigateToAddressPage }
						navigateToResetPasswordPage={ this.navigateToResetPasswordPage }
						navigateToEmailPage={ this.navigateToEmailPage }
						email={ this.props.user ? this.props.user.user.email : '' }
					/>
					<View style={ styles.subcontainer.bottom }>
						<Button
							type={ 'white' }
							onPress={ this.navigateLogOut }
							title={ 'profilePage.button.signOut' }
						/>
					</View>
					<View style={ styles.subcontainer.bottom }>
						<Button
							type={ 'red' }
							onPress={ this.toggleModalConfirmation }
							title={ 'profilePage.button.removeAccount' }
						/>
					</View>
				</View>
				<AlertDialog
					modalVisible={ this.state.modalVisible }
					content={ 'dialog.removeAccount' }
					requestHandler={ this.onRemoveAccount }
					requestCancel={ this.toggleModalConfirmation }
					showLoading={this.state.loading}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	log_out: () => dispatch(actions.auth.reducer.log_out()),
	reset_products: () => dispatch(actions.product.reducer.reset_products()),
	reset_transaction: () => dispatch(actions.transaction.reducer.reset_transaction()),
	upload_photo: (req, success, failure) => dispatch(actions.user.api.upload_photo(req, success, failure)),
	remove_account: (req ,res, err) => dispatch(actions.auth.api.remove_account(req ,res ,err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
