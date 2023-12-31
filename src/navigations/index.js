import {Animated, Easing, Dimensions} from 'react-native';
import {NavigationActions, createAppContainer, StackActions} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SplashScreen from '@pages/SplashScreen';
import Menu from '@pages/Menu';
import SignIn from '@pages/SignIn';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import Cart from '@pages/Cart';
import ProductList from '@pages/ProductList';
import HistoryPage from '@pages/HistoryPage';
import Detail from '@pages/Detail';
import ProfilePage from '@pages/ProfilePage';
import PhonePage from '@pages/PhonePage';
import EmailPage from '@pages/EmailPage';
import NamePage from '@pages/ChangeName';
import AddressPage from '@pages/AddressPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import DrawerPage from '@pages/DrawerPage';
import Favourites from '@pages/Favourites';
import TermsConditions from '@pages/TermsConditions';
import PrivacyPolicy from '@pages/PrivacyPolicy';
import ContactUs from '@pages/ContactUs';
import Checkout from '@pages/Checkout';
import ChooseAddress from '@pages/ChooseAddress';
import ChoosePayment from '@pages/ChoosePayment';
import CreditCard from '@pages/CreditCard';
import TransferBank from '@pages/TransferBank';
import VirtualAccount from '@pages/VirtualAccount';
import OnBoarding from '@pages/OnBoarding';
import TransferInstruction from '@pages/TransferInstruction';
import OTP from '@pages/OTP';
import Dashboard from '@pages/Dashboard';
import BannerDetail from '@pages/BannerDetail';
import Campaigns from '@pages/Campaigns';
import Thanks from '@pages/Thanks';
import {analytics} from '@helpers';

let _navigator;

export const DrawerBar = createDrawerNavigator(
  {
    Dashboard: {screen: Dashboard, path: 'dashboard'},

    HistoryPage: {screen: HistoryPage},
    Favourites: {screen: Favourites},
    TermsConditions: {screen: TermsConditions},
    PrivacyPolicy: {screen: PrivacyPolicy},
    ContactUs: {screen: ContactUs},
  },
  {
    contentComponent: DrawerPage,
    drawerWidth: Dimensions.get('window').width - 80,
  },
);

export const AppNavigator = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    Menu: {screen: Menu},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
    ForgotPassword: {screen: ForgotPassword},
    Cart: {screen: Cart},
    Product: DrawerBar,
    ProductList: {screen: ProductList},
    Detail: {screen: Detail},
    PhonePage: {screen: PhonePage},
    EmailPage: {screen: EmailPage},
    NamePage: {screen: NamePage},
    AddressPage: {screen: AddressPage},
    ResetPasswordPage: {screen: ResetPasswordPage},
    Checkout: {screen: Checkout},
    HistoryPage: {screen: HistoryPage},
    ChooseAddress: {screen: ChooseAddress},
    ChoosePayment: {
      screen: ChoosePayment,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CreditCard: {screen: CreditCard},
    TransferBank: {screen: TransferBank},
    VirtualAccount: {screen: VirtualAccount},
    OnBoarding: {screen: OnBoarding},
    ProfilePage: {screen: ProfilePage},
    Favourites: {screen: Favourites},
    TermsConditions: {screen: TermsConditions},
    PrivacyPolicy: {screen: PrivacyPolicy},
    ContactUs: {screen: ContactUs},
    TransferInstruction: {screen: TransferInstruction},
    OTP: {screen: OTP},
    Dashboard: DrawerBar,
    BannerDetail: {screen: BannerDetail},
    Campaigns: {screen: Campaigns},
    Thanks: {screen: Thanks},
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

export const AppContainer = createAppContainer(AppNavigator);

export const navConstant = {
  SplashScreen: 'SplashScreen',
  Menu: 'Menu',
  SignIn: 'SignIn',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  Cart: 'Cart',
  Product: 'Product',
  ProductList: 'ProductList',
  HistoryPage: 'HistoryPage',
  Detail: 'Detail',
  ProfilePage: 'ProfilePage',
  PhonePage: 'PhonePage',
  EmailPage: 'EmailPage',
  NamePage: 'NamePage',
  AddressPage: 'AddressPage',
  ResetPasswordPage: 'ResetPasswordPage',
  Favourites: 'Favourites',
  TermsConditions: 'TermsConditions',
  PrivacyPolicy: 'PrivacyPolicy',
  ContactUs: 'ContactUs',
  Checkout: 'Checkout',
  ChooseAddress: 'ChooseAddress',
  ChoosePayment: 'ChoosePayment',
  CreditCard: 'CreditCard',
  TransferBank: 'TransferBank',
  VirtualAccount: 'VirtualAccount',
  OnBoarding: 'OnBoarding',
  TransferInstruction: 'TransferInstruction',
  OTP: 'OTP',
  Dashboard: 'Dashboard',
  BannerDetail: 'BannerDetail',
  Campaigns: 'Campaigns',
  Thanks: 'Thanks',
};

export const setNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

export const actNav = {
  reset: (route, params = {}) => {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: route,
            params: params,
          }),
        ],
      }),
    );
  },
  navigate: (route, params = {}) => {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName: route,
        params: params,
      }),
    );
    analytics.setCurrentScreen(route);
    analytics.logEvent(route);
  },
  goBack: (key) => {
    if (key) {
      _navigator.dispatch(
        NavigationActions.back({
          key: key,
        }),
      );
    } else {
      _navigator.dispatch(NavigationActions.back());
    }
  },
  goBackToTop: () => {
    _navigator.dispatch(StackActions.popToTop());
  },
};
