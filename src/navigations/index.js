import { Animated, Easing, Dimensions } from 'react-native';
import { createStackNavigator, StackActions ,NavigationActions, createDrawerNavigator } from 'react-navigation';

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
import OTP from '@pages/OTP'

let _navigator;

export const DrawerBar = createDrawerNavigator({
    ProductList: {screen: ProductList},
    HistoryPage: {screen: HistoryPage},
    Favourites: {screen: Favourites},
    TermsConditions: {screen: TermsConditions},
    PrivacyPolicy: {screen: PrivacyPolicy},
    ContactUs: {screen: ContactUs},
}, {
    contentComponent: DrawerPage,
    drawerWidth: Dimensions.get('window').width - 80,
})

export const AppNavigator = createStackNavigator({
    SplashScreen: {screen: SplashScreen},
    Menu: {screen: Menu},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
    ForgotPassword: {screen:ForgotPassword},
    Cart: {screen: Cart},
    Product: DrawerBar,
    Detail: {screen: Detail},
    PhonePage: {screen: PhonePage},
    AddressPage: {screen: AddressPage},
    ResetPasswordPage: {screen: ResetPasswordPage},
    Checkout: {screen: Checkout},
    HistoryPage: {screen: HistoryPage},
    ChooseAddress: {screen: ChooseAddress},
    ChoosePayment: {screen: ChoosePayment},
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
},{
    initialRouteName  : 'SplashScreen',
    headerMode        : 'none',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            
            return { opacity, transform: [{ translateX }] };
        },
    }),
});

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
}

export const setNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
}

export const actNav = {
    reset: (route, params = {}) => {
        _navigator.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ 
                    routeName: route,
                    params: params
                })
            ]
        }));
    },
    navigate: (route,params = {}) => {
        _navigator.dispatch(NavigationActions.navigate({
            routeName: route,
            params: params
        }));
    },
    goBack: (key) => {
        if(key){
            _navigator.dispatch(NavigationActions.back({
                key: key,
            }));
        } 
        else {
            _navigator.dispatch(NavigationActions.back());
        }
        
    },
    goBackToTop: () => {
        _navigator.dispatch(StackActions.popToTop());
    }
};