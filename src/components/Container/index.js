import React,{ PureComponent } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import styles from './styles';

class Container extends PureComponent {
    constructor(){
        super();
    }
    
    render(){
        if(Platform.OS === 'ios'){
            return(
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    {this.props.children}
                </KeyboardAvoidingView>
            )
        } else {
            return(
                <View style={styles.container}>
                    {this.props.children}
                    {/* <ModalResponse 
                        modalVisible={this.props.network.isResponseError}
                        message={this.props.network.errorMessage}
                    /> */}
                </View>
            )
        }
    }
}

export default Container;