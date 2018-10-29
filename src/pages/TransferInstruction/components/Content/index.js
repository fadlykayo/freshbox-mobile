import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class Content extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subcontainer.top}>
                    <View style={styles.subcontainer.bank}>
                        <Image
                            style={styles.icon.bank}
                            source={this.props.bank.image}
                            resizeMode={'stretch'}
                        />
                    </View>
                    <View style={styles.subcontainer.desc}>
                        <StaticText
                            style={styles.text.bank}
                            property={this.props.bank.name}
                        />
                    </View>
                </View>
                <View style={styles.subcontainer.bottom}>
                    { 
                        this.props.bank.step.map((content,index) => (
                            <View 
                                key={index} 
                                style={styles.subcontainer.instruction.main}
                            >
                                <View style={styles.subcontainer.instruction.left}>
                                    <View style={styles.icon.circle}>
                                        <Text style={styles.text.index}>{index+1}</Text>
                                    </View>
                                </View>
                                <View style={styles.subcontainer.instruction.right}>
                                    <Text style={styles.text.instruction}>{content.name}</Text>
                                </View>
                            </View>
                        )) 
                    }       
                </View>
            </View>
        );
    }
}

export default Content;
