import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';


class Button extends PureComponent {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
				<StaticText 
					style={styles.staticText}
					property={this.props.title}
				/>
			</TouchableOpacity>
        );
    }
}

export default Button;
