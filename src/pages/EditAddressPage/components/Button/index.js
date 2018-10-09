import React,{ Component } from 'react';
import { TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Button extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.isEdit) {
            return (
                <TouchableOpacity style={styles.buttonSave} onPress={this.props.onPress}>
                    <StaticText 
                        style={styles.titleSave}
                        property={this.props.title}
                    />
                </TouchableOpacity>
            )    
        }
        else{
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
}

export default Button;