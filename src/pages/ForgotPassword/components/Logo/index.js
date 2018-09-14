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
                <View style={styles.border.outer}>
                    <View style={styles.border.inner}>
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_forgot_password}
                            style={styles.logo}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default Logo;