import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class PageComponent extends Component {
    constructor() {
        super()
        this.state={
            button: ['0', '1', '2']
        }
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.navigateToMenu()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.subContainer.red}>
                        <View style={styles.topComponent}>
                            <View style={styles.circle.outer}>
                                <View style={styles.circle.inner}></View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.title.place}>
                                <StaticText
                                    property={this.props.data.title}
                                    style={styles.title.text}
                                />
                            </View>
                            <View style={styles.contentText.place}>
                                <StaticText
                                    property={this.props.data.content}
                                    style={styles.contentText.text}
                                />
                            </View>   
                        </View>
                        <View style={styles.skip.place}>
                            <TouchableOpacity onPress={this.onPress} style={styles.skip.button}>
                                <StaticText
                                    property={this.props.data.button}
                                    style={styles.skip.text}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    { this.props.index < this.props.length 
                        ? <View style={styles.subContainer.white}></View> 
                        : null
                    }
                    
                </View>
                { this.props.index < this.props.length 
                    ? (
                        <TouchableWithoutFeedback>
                            <View style={styles.button}>
                                <Image
                                    style={styles.logo}
                                    source={images.icon_right_red}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null
                }
                
                <View style={styles.page.place}>
                    { this.state.button.map((data, index) => {
                        if (this.props.index == index) {
                            return <View key={index} style={styles.page.selected}></View>
                        }
                        else {
                            return <View key={index} style={styles.page.unselected}></View>
                        }
                    })}            
                </View>
            </View>
        );
    }
}

export default PageComponent;
