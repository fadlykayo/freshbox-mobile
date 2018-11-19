import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class ZoomImage extends Component {
    constructor() {
        super();
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.closeZoomImage();
    }

    render() {
        if (this.props.modalVisible) {
            return (
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
                                nestedScrollEnabled={true}
                                horizontal={true}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={0}
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
                        </View>
                    </View>
                </View>
                // <View style={styles.container}>
                //     <View style={styles.image.place}>
                //         <ScrollView
                //             nestedScrollEnabled={true}
                //             horizontal={true}
                //             pagingEnabled={true}
                //             showsHorizontalScrollIndicator={false}
                //             scrollEventThrottle={0}
                //             contentContainerStyle={styles.image.content}
				// 	    	style={styles.image.style}
                //         >
                //             { this.props.images.map((image, index) => {
                //                 return (
                //                     <Image
                //                         key={index}
                //                         source={{uri: image}}
                //                         style={styles.image.data}
                //                     />
                //                 )
                //             }) }
                //         </ScrollView>
                //     </View>
                //     <TouchableOpacity style={styles.clear.button} onPress={this.onPress}>
				//     	<StaticText
				//     		style={styles.clear.text}
				//     		property={'productList.button.clear'}
				//     	/>
				//     </TouchableOpacity>
                // </View>
            );
        }
        else return null;
    }
}

export default ZoomImage;
