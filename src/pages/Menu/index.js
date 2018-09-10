import React,{ PureComponent } from 'react';
import { View, ImageBackground } from 'react-native';
import Logo from './components/Logo';
import Content from './components/Content';
import images from '@assets';
import styles from './styles';

class Menu extends PureComponent {
    constructor(){
        super();
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground
                    resizeMode={'stretch'} 
                    source={images.background_welcome}
                    style={styles.background}
                >
                    <Logo />
                    <Content />
                </ImageBackground>
            </View>
        )
    }
}

export default Menu;