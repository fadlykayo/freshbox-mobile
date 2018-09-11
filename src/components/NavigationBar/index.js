import React,{ PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import StaticText from '../StaticText';
import styles from './styles';
import images from '@assets';

class NavigationBar extends PureComponent {
    constructor(){
        super();
    }
    
    render(){
        return(
            <View style={styles.container}>
                <StaticText 
                    style={styles.title}
                    property={this.props.title}
                />
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default NavigationBar;