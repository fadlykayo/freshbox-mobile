import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class InnerContent extends Component {
    constructor() {
        super();
        this.openSpecificData = this.openSpecificData.bind(this);
    }

    openSpecificData(bank, indexType) {
        this.props.openSpecificData(bank, indexType)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.component} onPress={() => this.openSpecificData(this.props.bank, this.props.index)}>
                    <View>
                        <StaticText
                            style={styles.staticText}
                            property={this.props.type.name}
                        />
                    </View>
                    <View style={styles.imagePlace}>
                        <Image
                            source={this.props.type.isOpen ? images.icon_arrow_up_red : images.icon_arrow_right_red}
                            style={styles.logo}
                        />
                    </View>
                </TouchableOpacity>
                { this.props.type.isOpen ? (
                    <View style={styles.contentPlace}>
                    { this.props.type.step.map((content, index) => {
                        return (
                            <View key={index} style={styles.contentData}>
                                <View style={styles.leftPart}>
                                    <View style={styles.circlePart}>
                                        <Text style={styles.indexContent}>{index+1}</Text>
                                    </View>
                                </View>
                                <View style={styles.rightPart}>
                                    <StaticText
                                        style={styles.contentText}
                                        property={content.name}
                                    />
                                </View>
                            </View>
                        )
                    }) } 
                    </View>
                ) : null}
            </View>
        )
    }
}

export default InnerContent;