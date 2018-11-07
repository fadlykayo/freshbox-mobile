import React, { Component } from 'react';
import { View } from 'react-native';
import LeftPart from './components/LeftPart';
import styles from './styles';

class PageComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <LeftPart
                        data={this.props.data}
                        navigateToMenu={this.props.navigateToMenu}
                    />
                    { this.props.index < this.props.length 
                        ? <View style={styles.subContainer.white}></View> 
                        : null
                    }
                </View>
            </View>
        );
    }
}

export default PageComponent;
