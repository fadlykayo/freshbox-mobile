import React,{ PureComponent } from 'react';
import { View, Image } from 'react-native';
import images from '@assets';
import styles from './styles';

class SplashScreen extends PureComponent {
    constructor(){
        super();
    }

    render(){
        return(
            <View style={styles.container}>
                <Image
                    resizeMode={'contain'} 
                    source={images.icon_logo}
                    style={styles.logo}
                />
            </View>
        )
    }
}

export default SplashScreen;