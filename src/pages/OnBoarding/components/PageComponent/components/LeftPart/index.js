import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import CircleComponent from './components/CircleComponent';
import Content from './components/Content';
import styles from './styles';

class LeftPart extends Component {
    constructor() {
        super();
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.navigateToMenu()
    }

    render() {
        return (
            <View style={styles.subContainer.red}>
                <CircleComponent />
                <Content data={this.props.data} index={this.props.index}/>
                <View style={styles.skip.place}>
                    <TouchableOpacity onPress={this.onPress} style={styles.skip.button}>
                        <StaticText
                            property={this.props.data.button}
                            style={styles.skip.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LeftPart;
