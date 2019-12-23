import React,{ PureComponent } from 'react';
import { View, Image, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
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

    openDrawerMenu = () => {
        
		Keyboard.dismiss();
		this.props.openDrawer();
	}

    renderIconBack = () => {
        if(this.props.menubar) {
            if(this.state.isLoading) {
                return (
                    <ActivityIndicator/>
                )  
            } else {
                return (
                    <Image
                        resizeMode={'contain'} 
                        source={images.ic_menu}
                        style={styles.icon}
                    />
                )
            }
        } else {
            if(this.state.isLoading) {
                return (
                    <ActivityIndicator/>
                )  
            } else {
                return (
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.icon}
                    />
                )
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
                    onPress={this.props.menubar ? this.openDrawerMenu : this.onPress}
                >

                {
                    this.renderIconBack()
                }
                    
                </TouchableOpacity>
            </View>
        )
    }
}

export default NavigationBar;