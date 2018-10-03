import React,{ PureComponent } from 'react';
import { View, Image } from 'react-native';
import images from '@assets';
import styles from './styles';

class Logo extends PureComponent {
    constructor(){
        super();
    }

    render(){
        return(
            <View style={styles.container}>
                <Image
                    resizeMode={'contain'} 
                    source={images.icon_logo_red}
                    style={styles.logo}
                />
            </View>
        )
    }
}

export default Logo;