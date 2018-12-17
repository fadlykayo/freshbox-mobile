import React, { Component } from 'react';
import { View } from 'react-native';
import LeftPart from './components/LeftPart';
import Button from '../Button';
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
                        index={this.props.index}
                        data={this.props.data}
                        navigateToMenu={this.props.navigateToMenu}
                    />
                    { this.props.index < this.props.length 
                        ? <View style={styles.subContainer.white}></View> 
                        : null
                    }
                </View>
                <Button
                    bubble={this.props.index}
                    length={this.props.length}
                    navigateToNextPage={this.props.navigateToNextPage}
                />
            </View>
        );
    }
}

export default PageComponent;
