import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class Content extends Component {
    constructor() {
        super()
        this.selectBank = this.selectBank.bind(this);
    }

    selectBank(){
        this.props.selectBank(this.props.bank.payment);
    }

    render(){
        return (
            <TouchableOpacity 
                style={styles.container} 
                onPress={this.selectBank}
            >
                <View style={styles.subcontainer.content}>
                    <Image
                        source={this.props.bank.image}
                        style={styles.icon.bank}
                        resizeMode={'contain'}
                    />
                    <StaticText
                        style={styles.text.bankName}
                        property={this.props.bank.name}
                    />
                </View>
                {
                    (this.props.bank.payment != this.props.selectedBank)
                    ?   null
                    :   <View style={styles.subcontainer.check}>
                            <Image 
                                source = {images.icon_check}
                                style={styles.icon.check}
                            />
                        </View>
                }
            </TouchableOpacity>
        );
    }
}

export default Content;
