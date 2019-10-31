import React,{ PureComponent } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { actNav } from '@navigations';
import StaticText from '../StaticText';
import styles from './styles';
import images from '@assets';

class NavigationBar extends PureComponent {
    constructor(){
        super();
        this.state = {
            isLoading: false
        }
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        if(this.props.onPress){
            

                this.props.onPress();
                
            }
            else{
                if(this.props.cancelVoucher){
                    this.props.cancelVoucher();
                    
                    actNav.goBack();
                } else {
                    
                    actNav.goBack();
                }
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

                {
                    this.state.isLoading ? 
                    <ActivityIndicator/> :
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.icon}
                    />
                }
                    
                </TouchableOpacity>
            </View>
        )
    }
}

export default NavigationBar;