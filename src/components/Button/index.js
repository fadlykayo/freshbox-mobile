import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StaticText from '@components/StaticText';
import styles from './styles';
import { colour } from '@styles';

class Button extends PureComponent {
    constructor() {
        super()
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress();
    }

    render() {
        switch(this.props.type){
            case 'red' :
            return (
                    <TouchableOpacity 
                        onPress={this.onPress} 
                        style={[styles.container.base(this.props.borderRadius),styles.container.red]}
                    >
                        <StaticText 
                            style={styles.staticText.white(this.props.fontSize)}
                            property={this.props.title}
                        />
                    </TouchableOpacity>
            );
            case 'white':
            return (
                <TouchableOpacity 
                    onPress={this.onPress}
                    style={[styles.container.base(this.props.borderRadius),styles.container.white]} 
                >
                    <StaticText 
                        style={styles.staticText.red(this.props.fontSize)}
                        property={this.props.title}
                    />
                </TouchableOpacity>
            );
            default: return null
        }
    }
}

export default Button;
