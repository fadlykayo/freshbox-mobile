import { Animated, Easing } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import SplashScreen from '@pages/SplashScreen';
import Menu from '@pages/Menu';

export const AppNavigator = StackNavigator({
    SplashScreen: {screen: SplashScreen},
    Menu: {screen: Menu},
},{
    initialRouteName  : 'Menu',
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

export const actNav = {
    reset: (navigator,route) => {
        navigator.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route})
            ]
        }))
    },
    navigate: (navigator,route,params) => {
        navigator.dispatch(NavigationActions.navigate({
            routeName: route,
            params: params
        }))
    },
};