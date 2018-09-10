import { Animated, Easing } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';

import SplashScreen from '@pages/SplashScreen';
import Menu from '@pages/Menu';

let _navigator;

export const AppNavigator = createStackNavigator({
    SplashScreen: {screen: SplashScreen},
    Menu: {screen: Menu},
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
};