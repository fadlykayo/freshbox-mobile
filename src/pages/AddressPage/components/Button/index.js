import React,{ Component } from 'react';
import { TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Button extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity style={styles.buttonEdit} onPress={this.props.onPress}>
                <StaticText 
                    style={styles.titleEdit}
                    property={this.props.title}
                />
            </TouchableOpacity>
        )
    }
}

export default Button;