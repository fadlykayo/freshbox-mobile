import React, { Component } from 'react';
import { View } from 'react-native';
import InnerContent from './components/InnerContent';
import styles from './styles';

class Content extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subcontainer.bottom}>
                    { this.props.bank.types.map((type,index) => (
                        <InnerContent
                            key={index}
                            index={index}
                            type={type}
                            bank={this.props.bank}
                            openSpecificData={this.props.openSpecificData}
                        />
                    )) }       
                </View>
            </View>
        );
    }
}

export default Content;
