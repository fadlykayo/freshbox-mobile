import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import images from '@assets';
import styles from './styles';

class Information extends Component {
    constructor() {
        super();
        this.getClipboardData = this.getClipboardData.bind(this);
    }

    getClipboardData(input) {
        this.props.getClipboardData(input)
    }

    render(){
        const productPrice = numeral(this.props.detailTransaction.grand_total).format('0,0');
        return (
            <View style={styles.middle.place}>
                <View style={styles.middle.each.place}>
                    <View style={styles.middle.each.innerPlace.top}>
                        <StaticText
                            style={styles.middle.each.text.static}
                            property={'transferInstruction.content.middle.infoPrice'}
                        />
                    </View>
                    <View style={styles.middle.each.innerPlace.bottom}>
                        <TouchableOpacity style={styles.middle.each.button} onPress={() => this.getClipboardData(this.props.detailTransaction.grand_total)}>
                            <StaticText
                                style={styles.middle.each.text.price}
                                property={'transferInstruction.content.middle.price'}
                                params={{price: productPrice }}
                            />
                             <Image
                                style={styles.icon.copy}
                                source={images.icon_copy}
                                resizeMode={'stretch'}
                            />  
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.middle.each.place}>
                    <View style={styles.middle.each.innerPlace.top}>
                        <StaticText
                            style={styles.middle.each.text.static}
                            property={'transferInstruction.content.middle.transferTo'}
                        />
                    </View>
                    <View style={styles.middle.each.innerPlace.bottom}>
                        <TouchableOpacity style={styles.middle.each.button} onPress={() => this.getClipboardData(this.props.detailTransaction.va_number)}>
                            <Image
                                style={styles.icon.bank(this.props.bank.name)}
                                source={this.props.bank.image}
                                resizeMode={'stretch'}
                            />
                            <Text style={styles.middle.each.text.static}>{this.props.detailTransaction.va_number}</Text>
                            <Image
                                style={styles.icon.copy}
                                source={images.icon_copy}
                                resizeMode={'stretch'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default Information;
