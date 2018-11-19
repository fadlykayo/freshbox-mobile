import React,{ PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Button extends PureComponent {
    constructor(){
        super();
    }

    render(){
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <StaticText 
                    style={styles.title}
                    property={this.props.title}
                />
            </TouchableOpacity>
        )
    }
}

export default Button;