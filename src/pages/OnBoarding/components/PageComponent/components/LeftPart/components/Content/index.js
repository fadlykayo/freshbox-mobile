import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class Content extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.info}>
                <View style={styles.title.place}>
                    <StaticText
                        property={this.props.data.title}
                        style={styles.title.text}
                    />
                </View>
                <View style={styles.contentText.place}>
                    {this.props.index == 2
                    ? (<Text style={styles.contentText.text}>
                        <StaticText property={this.props.data.content[0]}/>
                        <StaticText property={this.props.data.content[1]} style={styles.contentText.italic}/>
                        <StaticText property={this.props.data.content[2]}/>
                    </Text>)
                    : (<StaticText
                        property={this.props.data.content}
                        style={styles.contentText.text}
                    />)}
                </View>   
            </View>
        );
    }
}

export default Content;
