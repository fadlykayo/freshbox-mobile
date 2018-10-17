import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class Content extends Component {
    constructor() {
        super()
        this.openData = this.openData.bind(this);
    }

    openData(index) {
        this.props.openData(index)
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.container} onPress={() => this.openData(this.props.index)}>
                    <View>
                        <Image
                            source={this.props.bank.image}
                            style={styles.bankLogo}
                        />
                    </View>
                    <View>
                        <StaticText
                            style={styles.staticText}
                            property={this.props.bank.name}
                        />
                    </View>
                    <View style={styles.imagePlace}>
                        <Image
                            source={
                                this.props.bank.isOpen
                                ? images.icon_arrow_up_red
                                : images.icon_arrow_right_red}
                            style={styles.logo}
                        />
                    </View>
                </TouchableOpacity>
                { this.props.bank.isOpen ? (
                    <View style={styles.contentPlace}>
                    { this.props.bank.step.map((content, index) => {
                        return (
                            <View key={ index } style={styles.contentData}>
                                <View style={styles.leftPart}>
                                    <View style={styles.circlePart}>
                                        <Text style={styles.indexContent}>{index+1}</Text>
                                    </View>
                                </View>
                                <View style={styles.rightPart}>
                                    <Text style={styles.contentText}>{content.name}</Text>
                                </View>
                            </View>
                        )
                    }) }       
                    </View>
                ) : null}
            </View>
        );
    }
}

export default Content;
