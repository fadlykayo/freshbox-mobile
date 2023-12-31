import React, {Component} from 'react';
import {StatusBar, View, AppState, Linking} from 'react-native';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {AppContainer, setNavigator, actNav, navConstant} from '@navigations';
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
    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onIds = this.onIds.bind(this);
    OneSignal.init('c1f39bb2-11d8-4ebf-b836-61a0131fb3fa');
    this.state = {
      appState: AppState.currentState,
      onRestart: false,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    Linking.addEventListener('url', this.handleDeepLink);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    AppState.removeEventListener('change', this.handleAppStateChange);
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
    this.setState({appState: nextAppState});
  };

  onReceived(notification) {
    if (notification.payload.title == 'Pembayaran Berhasil') {
      this.props.get_notification(notification.payload);
    }
  }

  onOpened(openResult) {
    this.props.get_notification(openResult.notification.payload.additionalData);
  }

  onIds(device) {
    this.props.get_user_id(device);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle={'light-content'} />
        <AppContainer
          ref={(navigatorRef) => {
            setNavigator(navigatorRef);
          }}
          uriPrefix={'freshboxapp://'}
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