import React,{ PureComponent } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import images from '@assets';
import styles from './styles';

class Button extends PureComponent {
    constructor(){
        super();
    }

    render(){
        switch(this.props.type){
            case 'get_started':
                return(
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]}>
                        <Text style={styles.content(this.props.type)}>Get Started</Text>
                    </TouchableOpacity>
                )
            case 'facebook':
                return(
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]}>
                        <Text style={styles.content(this.props.type)}>Continue with Facebook</Text>
                        {/* <Image
                            resizeMode={'contain'} 
                            source={images.icon_logo}
                            style={styles.logo}
                        /> */}
                    </TouchableOpacity>
                )
            case 'email':
                return(
                    <TouchableOpacity 
                    onPress={() => {this.props.navigate.navigate('Login')}}
                    style={[styles.container,styles.button(this.props.type)]}>
                        <Text style={styles.content(this.props.type)}>Continue with Email</Text>
                        {/* <Image
                            resizeMode={'contain'} 
                            source={images.icon_logo}
                            style={styles.logo}
                        /> */}
                    </TouchableOpacity>
                )
            case 'google':
                return(
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]}>
                        <Text style={styles.content(this.props.type)}>Continue with Google</Text>
                        {/* <Image
                            resizeMode={'contain'} 
                            source={images.icon_logo}
                            style={styles.logo}
                        /> */}
                    </TouchableOpacity>
                )
            default:
                return null
        }
    }
}

export default Button;