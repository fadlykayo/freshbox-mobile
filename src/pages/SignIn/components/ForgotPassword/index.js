import React,{ PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Button extends PureComponent {
    constructor(){
        super();
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <StaticText 
                        style={styles.register}
                        property={'signIn.content.forgotPassword'}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default Button;