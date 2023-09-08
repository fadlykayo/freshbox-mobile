import React, { Component } from 'react';
import { StatusBar, View, AppState, Linking } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';

import { AppContainer, setNavigator, actNav, navConstant } from '@navigations';
import actions from '@actions';

const mapStateToProps = (state) => ({
	user: state.user,
	product: state.product.products,
	promoProduct: state.product.promoProduct.filter(x => !x.isClaim && x),
	setModalVisible: state.product.setModalVisible,
});

const mapDispatchToProps = (dispatch) => ({
	get_user_id: (payload) => dispatch(actions.user.reducer.get_user_id(payload)),
	get_notification: (payload) =>
		dispatch(actions.notif.reducer.get_notification(payload)),
	// set_notification: (payload) => dispatch(actions.utility.reducer.set_notification(payload)),
	// add_notification: (payload) => dispatch(actions.utility.reducer.add_notification(payload)),
	get_detail_banner: (req, res, err) =>
		dispatch(actions.banner.api.get_detail_banner(req, res, err)),
	set_modal_visible: (payload) =>
		dispatch(actions.product.reducer.set_modal_visible(payload)),
	detail_product: (payload) =>
		dispatch(actions.product.reducer.detail_product(payload)),
	get_product_detail: (req, res, err) =>
		dispatch(actions.product.api.get_product_detail(req, res, err)),
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appState: AppState.currentState,
			onRestart: false,
		};
	}

	async componentDidMount() {
		OneSignal.setAppId('70a7c916-7f43-4d7d-96a9-c5ab66b28397');
		OneSignal.setLogLevel(6, 0);
		AppState.addEventListener('change', this.handleAppStateChange);
		Linking.addEventListener('url', this.handleDeepLink);
		await notificationHandler()
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	notificationHandler = async () => {
		OneSignal.setNotificationWillShowInForegroundHandler(this.onReceived);
		OneSignal.setNotificationOpenedHandler(this.onOpened);
		await this.onIds()
	} 

	handleDeepLink = (e) => {
		if (e) {
			this.navigateWithDeepLink(e);
		}
	};

	navigateWithDeepLink = (e) => {
		const url = e.url.replace(/.*?:\/\//g, '');
		const id = url.match(/\/([^\/]+)\/?$/)[1];
		const routname = url.split('/')[0];
		if (routname === '0') {
			actNav.reset(navConstant.Dashboard);
		} else if (routname === '1' && id) {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : '',
				},
				body: {},
				params: {
					bannerID: id,
				},
			};

			this.props.get_detail_banner(
				payload,
				(res) => {
					if (res) {
						actNav.navigate(navConstant.BannerDetail, {
							onbackground: true,
						});
					}
				},
				(err) => {
					actNav.reset(navConstant.Dashboard);
				},
			);
			Linking.removeEventListener('url', this.handleDeepLink);
		} else if (routname === '2' && id) {
			this.setDetailProduct(id);
		} else {
		}
	};

	setDetailProduct = (code) => {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : '',
			},
			body: {},
			params: {
				product_code: code,
			},
		};

		this.props.get_product_detail(
			payload,
			(res) => {
				if (res.code === 200) {
					this.props.set_modal_visible(true);
				}
				// if(res) {
				//     actNav.navigate(navConstant.BannerDetail, {
				//         onbackground: true
				//     })
				// }
			},
			(err) => {
				actNav.reset(navConstant.Dashboard);
			},
		);
	};

	handleAppStateChange = (nextAppState) => {
		// if(nextAppState !== "active") {
		//     this.props.set_modal_visible(!true)
		// }
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			Linking.addEventListener('url', this.handleDeepLink);
			if (this.props.setModalVisible) {
				this.props.set_modal_visible(false);
			}
		}
		this.setState({ appState: nextAppState });
	};

	onReceived = (notificationReceivedEvent) => {
		const notification = notificationReceivedEvent.getNotification();
		const title = notification?.title
		
		if (title == 'Pembayaran Berhasil') {
			const payload = typeof notification?.rawPayload === 'string' ? 
				JSON.parse(notification?.rawPayload) :
				notification?.rawPayload

			this.props.get_notification(payload);
		}
	}

	onOpened = (openedEvent) => {
		const { notification } = openedEvent;
		const additionalData = notification?.additionalData

		this.props.get_notification(additionalData);
	}

	async onIds() {
		const deviceID = await OneSignal.getDeviceState();

		this.props.get_user_id(deviceID.userId);
	}

	render() {
		return (
			<View style={ styles.container }>
				<StatusBar backgroundColor="black" barStyle={ 'light-content' } />
				<AppContainer
					ref={ (navigatorRef) => {
						setNavigator(navigatorRef);
					} }
					uriPrefix={ 'freshboxapp://' }
				/>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);