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
                    property={'register.content.haveAnAccount'}
                />
                <TouchableOpacity onPress={this.props.onPress}>
                    <StaticText 
                        style={styles.signIn}
                        property={'register.content.signIn'}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default Button;