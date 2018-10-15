import React,{ PureComponent } from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import styles from './styles';

class Container extends PureComponent {
    constructor(){
        super();
    }
    
    render(){
        if(Platform.OS === 'ios'){
            return(
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView behavior='padding' style={styles.contentContainer}>
                        {this.props.children}
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        } else {
            return(
                <SafeAreaView style={styles.container}>
                    {this.props.children}
                    {/* <ModalResponse 
                        modalVisible={this.props.network.isResponseError}
                        message={this.props.network.errorMessage}
                    /> */}
                </SafeAreaView>
            )
        }
    }
}

export default Container;