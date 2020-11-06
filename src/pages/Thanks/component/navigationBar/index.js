import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import styles from "./styles"
import images from '@assets';

export default class index extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={[styles.container]} onPress={() => this.props.press()}>
                <Icon name="close" size={20} />
            </TouchableOpacity>
        )
    }
}