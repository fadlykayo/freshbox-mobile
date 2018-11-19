import React, { Component } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class ExpiredDate extends Component {
    constructor() {
        super();
        this.focusForm = this.focusForm.bind(this);
        this.onBlurMonth = this.onBlurMonth.bind(this);
        this.onBlurYear = this.onBlurYear.bind(this);
        this.submitExpiredMonth = this.submitExpiredMonth.bind(this);
        this.submitExpiredYear = this.submitExpiredYear.bind(this);
    }

    focusForm(input) {
        this.props.focusForm(input)
    }

    onBlurMonth() {
        this.props.onBlurMonth();
    }

    onBlurYear() {
        this.props.onBlurYear();
    }

    submitExpiredMonth() {
        this.props.submitExpiredMonth();
    }

    submitExpiredYear() {
        this.props.submitExpiredYear();
    }

    render() {
        return (
            <View style={styles.expiredDate.main}>
                <StaticText
                    style={styles.text.title}
                    property={'creditCard.content.expiredDate'}
                />
                <View style={styles.expiredDate.place}>
                    <TouchableWithoutFeedback onPress={() => this.focusForm('expiredMonth')}>
                        <View style={styles.expiredDate.left(this.props.focused.expiredMonth)}>
                            <TextInput
                                ref={e => this.formExpiredMonth = e}
                                keyboardType={'number-pad'}
                                maxLength={2}
                                returnKeyType={'done'}
                                onBlur={this.onBlurMonth}
                                value={this.props.user.expiredMonth}
                                placeholder={'MM'}
                                onChangeText={(value) => this.onChangeText('expiredMonth',value)}
                                onSubmitEditing={this.submitExpiredMonth}
                                style={styles.text.expDate}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.expiredDate.middle}>
                        <Text>/</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.focusForm('expiredYear')}>
                        <View style={styles.expiredDate.right(this.props.focused.expiredYear)}>
                            <TextInput
                                ref={e => this.formExpiredYear = e}
                                keyboardType={'number-pad'}
                                maxLength={2}
                                returnKeyType={'done'}
                                onBlur={this.onBlurYear}
                                value={this.props.user.expiredYear}
                                placeholder={'YY'}
                                onChangeText={(value) => this.onChangeText('expiredYear',value)}
                                onSubmitEditing={this.submitExpiredYear}
                                style={styles.text.expDate}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default ExpiredDate;
