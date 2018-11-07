import React,{ PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class TermsConditions extends PureComponent {
    constructor(){
        super();
        this.navigateToTermsConditions = this.navigateToTermsConditions.bind(this);
    }

    navigateToTermsConditions() {
        this.props.navigateToTermsConditions();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.termsAndCondition}>
                    <StaticText 
                        property={'welcome.content.info'}
                    /> <StaticText
                        onPress={this.navigateToTermsConditions}
                        style={styles.underline}
                        property={'welcome.content.termsCondition'}
                    />
                </Text>
            </View>
        )
    }
}

export default TermsConditions;