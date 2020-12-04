import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StaticText from '@components/StaticText';
import styles from './styles';
import { colour } from '@styles';
import { language, analytics } from '@helpers';

class Button extends PureComponent {
    constructor() {
        super()
        this.onPress = this.onPress.bind(this);
    }

    onPress () {
        const newName = `${this.props.title.split(".")[0]}_${this.props.title.split(".")[this.props.title.split(".").length -1]}`;
        analytics.log(`Btn_${newName}_Prsd`);
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
