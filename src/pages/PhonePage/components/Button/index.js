import React,{ PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Button extends PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        // console.log(this.props.isEdit)
        return (
            <TouchableOpacity 
                style={ 
                    this.props.isEdit == true
                    ? styles.buttonSave 
                    : styles.buttonEdit
                } 
                onPress={this.props.onPress}
            >
                <StaticText 
                    style={ 
                        this.props.isEdit 
                        ? styles.titleSave
                        : styles.titleEdit
                    }
                    property={this.props.title}
                />
            </TouchableOpacity>
        )    
    }
}

export default Button;