import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Dimensions } from 'react-native';
import styles from './styles';
import images from '@assets';

const { height, width } = Dimensions.get('window');

class ZoomImage extends Component {
    constructor() {
        super();
        this.onPress = this.onPress.bind(this);
        this.state = {
            bubble: 0,
            scrollX: 0,
        }
    }

    onPress() {
        this.props.closeZoomImage();
    }

    getPositionIndex = (e) => {
        this.setState({ scrollX: e.nativeEvent.contentOffset.x }, () => {
            this.getPositionBubble();
        })
    }
    
	getPositionBubble = () => {
			let position = Math.round(this.state.scrollX/(width));
			if (this.state.bubble != position) {
					this.setState({ bubble: position })
			}
	}
    
    renderBubbles = () => {
        if (this.props.images.length > 0) {
            return (
                <View style={styles.page.place}>
                    { this.props.images.map((data, index) => {
                        if (this.state.bubble == index) {
                            return <View key={index} style={styles.page.selected}></View>
                        }
                        else {
                            return <View key={index} style={styles.page.unselected}></View>
                        }
                    })}            
                </View>
            );
        }
        else return null
    }
    
    render() {
        const { height, width } = Dimensions.get('window');
        if (this.props.modalVisible) {
            return (
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={this.onPress}
                >
                    <View style={styles.background}>
                        <TouchableOpacity style={styles.touchable} onPress={this.onPress}></TouchableOpacity>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.icon.place} onPress={this.onPress}>
                                <Image
                                    resizeMode={'contain'}
                                    source={images.icon_clear}
                                    style={styles.icon.clear}
                                />
                            </TouchableOpacity>
                            <View style={styles.image.place}>
                                <ScrollView
                                    ref={ e => { this.scrollRef = e }}
                                    nestedScrollEnabled={true}
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={0}
                                    onScroll={(e) => this.getPositionIndex(e)}
                                    contentContainerStyle={styles.image.content}
				    	        	style={styles.image.style}
                                >
                                    { this.props.images.map((image, index) => {
                                        return (
                                            <Image
                                                key={index}
                                                source={{uri: image}}
                                                style={styles.image.data}
                                            />
                                        )
                                    }) }
                                </ScrollView>
                                {this.renderBubbles()}
                            </View>
                            
                        </View>
                    </View>
                </Modal>
            );
        }
        else return null;
    }
}

export default ZoomImage;
