import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class InnerContent extends Component {
    constructor(props) {
        super(props);
        this.openSpecificData = this.openSpecificData.bind(this);
    }

    openSpecificData(indexBank, indexType) {
        this.props.openSpecificData(indexBank, indexType)
    }

    render() {
        if (this.props.type.isOpen == true) {
            return (
                <View key={this.props.indexType}>
                    <TouchableOpacity style={styles.component} onPress={() => this.openSpecificData(this.props.indexBank, this.props.indexType)}>
                        <View>
                            <StaticText
                                style={styles.staticText}
                                property={this.props.type.name}
                            />
                        </View>
                        <View style={styles.imagePlace}>
                            <Image
                                source={images.icon_arrow_up_red}
                                style={styles.logo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.contentPlace}>
                    { this.props.type.step.map((content, index) => {
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
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity key={this.props.indexType} style={styles.component} onPress={() => this.openSpecificData(this.props.indexBank, this.props.indexType)}>
                    <View>
                        <StaticText
                            style={styles.staticText}
                            property={this.props.type.name}
                        />
                    </View>
                    <View style={styles.imagePlace}>
                        <Image
                            source={images.icon_arrow_right_red}
                            style={styles.logo}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
    
    }
}

export default InnerContent;