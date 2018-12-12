import React,{ PureComponent } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import StaticText from '@components/StaticText';
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
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]} onPress={this.props.onPress}>
                        <StaticText 
                            style={styles.content(this.props.type)}
                            property={'welcome.button.getStarted'}
                        />
                    </TouchableOpacity>
                )
            case 'facebook':
                return(
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]} onPress={this.props.onPress}>
                        <StaticText 
                            style={styles.content(this.props.type)}
                            property={'welcome.button.facebook'}
                        />
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_facebook}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                )
            case 'phone':
                return(
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]} onPress={this.props.onPress}>
                        <StaticText 
                            style={styles.content(this.props.type)}
                            property={'welcome.button.phone'}
                        />
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_phone}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                )
            case 'google':
                return(
                    <TouchableOpacity style={[styles.container,styles.button(this.props.type)]} onPress={this.props.onPress}>
                        <StaticText 
                            style={styles.content(this.props.type)}
                            property={'welcome.button.google'}
                        />
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_google}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                )
            default:
                return null
        }
    }
}

export default Button;