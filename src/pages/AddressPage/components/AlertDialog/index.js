import React, { Component } from 'react';
import { View, Keyboard, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class AlertDialog extends Component {
    constructor() {
        super();
        this.requestCancel = this.requestCancel.bind(this);
        this.requestHandler = this.requestHandler.bind(this);
        this.getInformText = this.getInformText.bind(this);
    }

    requestCancel() {
        this.props.setModalVisible(this.props.type)
    }

    requestHandler() {
        if (this.props.isEdit) {
            if(this.props.action == 'delete') {
                this.props.deleteAddress()
            }
            else {
                this.props.setModalVisible(this.props.type)
				this.props.addressValidation()
            }
        }
        else {
            if(this.props.action == 'delete') {
                this.props.deleteAddress()
            }
        }
    }

    getInformText(action) {
        switch(action) {
            case 'delete': return 'addressPage.info.delete'
            case 'edit': return 'addressPage.info.edit'
            default: return null
        }
    }

    render() {
        const informText = this.getInformText(this.props.action)
        if (this.props.modalVisible) {
            return (
                <View style={styles.container}>
                    <View style={styles.boxPlace}>
                        <View style={styles.textPlace}>
                            <StaticText
                                property={informText}
                                style={styles.staticText}
                            />
                        </View>
                        <View style={styles.answerPlace}>
                            <TouchableOpacity style={styles.button.red} onPress={this.props.isEdit ? this.props.navigateBack : this.requestCancel}>
                                <StaticText
                                    property={'addressPage.info.no'}
                                    style={styles.text.white}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button.white} onPress={this.requestHandler}>
                                <StaticText
                                    property={'addressPage.info.yes'}
                                    style={styles.text.white}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
        else return null
    }
}

export default AlertDialog;
