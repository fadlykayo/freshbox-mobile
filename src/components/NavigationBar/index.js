import React,{ PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { actNav } from '@navigations';
import StaticText from '../StaticText';
import styles from './styles';
import images from '@assets';

class NavigationBar extends PureComponent {
    constructor(){
        super();
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        if(this.props.onPress){
            this.props.onPress();
        }
        else{
            actNav.goBack();
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <StaticText 
                    style={styles.title}
                    property={this.props.title}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.onPress}
                >
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