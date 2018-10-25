import React, { Component } from 'react';
import { View, Keyboard, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class AlertDialog extends Component {
    constructor() {
        super();
        this.requestCancel = this.requestCancel.bind(this);
        this.requestHandler = this.requestHandler.bind(this);
    }

    requestCancel(){
        this.props.requestCancel();
    }

    requestHandler(){
        this.props.requestHandler();
    }

    render() {
        if(this.props.modalVisible){
            return (
                <View style={styles.container}>
                    <View style={styles.boxPlace}>
                        <View style={styles.textPlace}>
                            <StaticText
                                property={this.props.content}
                                style={styles.staticText}
                                params={this.props.params}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.button.red} 
                                onPress={this.requestCancel}
                            >
                                <StaticText
                                    property={'button.no'}
                                    style={styles.text.white}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.button.white} 
                                onPress={this.requestHandler}
                            >
                                <StaticText
                                    property={'button.yes'}
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
