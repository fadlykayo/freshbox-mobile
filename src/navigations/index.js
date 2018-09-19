import { Animated, Easing } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';

import SplashScreen from '@pages/SplashScreen';
import Menu from '@pages/Menu';
import SignIn from '@pages/SignIn';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import Cart from '@pages/Cart';
import ProductList from '@pages/ProductList';
import HistoryPage from '@pages/HistoryPage';
import HistoryDetail from '@pages/HistoryDetail';
import ProfilePage from '@pages/ProfilePage';

let _navigator;

export const AppNavigator = createStackNavigator({
    SplashScreen: {screen: SplashScreen},
    Menu: {screen: Menu},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
    ForgotPassword: {screen:ForgotPassword},
    Cart: {screen: Cart},
    ProductList: {screen: ProductList},
    HistoryPage: {screen: HistoryPage},
    HistoryDetail: {screen:HistoryDetail},
    ProfilePage: {screen:ProfilePage},
},{
    initialRouteName  : 'ProfilePage',
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
    ProductList: 'ProductList',
    HistoryPage: 'HistoryPage',
    HistoryDetail: 'HistoryDetail',
    ProfilePage: 'ProfilePage',
}

export const setNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
}

export const actNav = {
    reset: (route) => {
        _navigator.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route})
            ]
        }))
    },
    navigate: (route,params = {}) => {
        _navigator.dispatch(NavigationActions.navigate({
            routeName: route,
            params: params
        }))
    },
    goBack: () => {
        _navigator.dispatch(NavigationActions.back())
    }
};