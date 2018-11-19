import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class CreditCardNumber extends Component {
    constructor() {
        super();
        this.focusForm = this.focusForm.bind(this);
    }

    focusForm() {
        this.props.focusForm('creditNumber')
    }

    render() {
        return (
            <View style={styles.top.main}>
                <TouchableWithoutFeedback onPress={this.focusForm}>
                    <View>
                        <StaticText
                            style={styles.text.title}
                            property={'creditCard.content.creditCard'}
                        />
                        <View style={styles.creditCard.place}>
                            <View style={styles.creditCard.part(this.props.focused.creditNumber)}>
                                <Text style={styles.text.content}>{this.props.user.creditNumber.slice(0,4)}</Text>
                            </View>
                            <View style={styles.creditCard.part(this.props.focused.creditNumber)}>
                                <Text style={styles.text.content}>{this.props.user.creditNumber.slice(4,8)}</Text>
                            </View>
                            <View style={styles.creditCard.part(this.props.focused.creditNumber)}>
                                <Text style={styles.text.content}>{this.props.user.creditNumber.slice(8,12)}</Text>
                            </View>
                            <View style={styles.creditCard.part(this.props.focused.creditNumber)}>
                                <Text style={styles.text.content}>{this.props.user.creditNumber.slice(12,16)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default CreditCardNumber;
