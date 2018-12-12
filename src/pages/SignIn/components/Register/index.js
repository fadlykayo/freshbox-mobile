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
                <StaticText 
                    style={styles.content}
                    property={'signIn.content.newToFreshbox'}
                />
                <TouchableOpacity onPress={this.props.onPress}>
                    <StaticText 
                        style={[styles.content,styles.register]}
                        property={'signIn.content.register'}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default Button;