import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import InnerContent from '../InnerContent';
import styles from './styles';
import images from '@assets';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.openData = this.openData.bind(this);
        this.openSpecificData = this.openSpecificData.bind(this);
    }

    openData(index) {
        this.props.openData(index)
    }

    openSpecificData(indexBank, indexType) {
        this.props.openSpecificData(indexBank, indexType)
    }

    render() {
        if( this.props.bank.isOpen == true) {
            return (
                <View key={this.props.indexBank}>
                    <TouchableOpacity style={styles.component} onPress={() => this.openData(this.props.indexBank)}>
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
                                source={images.icon_arrow_up_red}
                                style={styles.logo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.contentPlace}>
                    { this.props.bank.types.map((type, indexType) => {
                        return (
                            <View key={indexType}>
                                <InnerContent
                                    key={indexType}
                                    indexBank={this.props.indexBank}
                                    indexType={indexType}
                                    type={type}
                                    openSpecificData={this.openSpecificData}
                                />
                            </View>
                        )
                    }) }       
                    </View>
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity key={this.props.indexBank} style={styles.component} onPress={() => this.openData(this.props.indexBank)}>
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
                            source={images.icon_arrow_right_red}
                            style={styles.logo}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

export default MainContent;