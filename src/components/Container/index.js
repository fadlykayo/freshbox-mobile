import React,{ PureComponent } from 'react';
import { Platform, KeyboardAvoidingView, View, StatusBar } from 'react-native';
import { SafeAreaView } from '@react-navigation/native';
import { connect } from 'react-redux';
import actions from '@actions';
import Loading from '../Loading';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import ServerError from '../ServerError';
import NetworkError from '../NetworkError';
import styles from './styles';

class Container extends PureComponent {
    constructor(){
        super();
        this.closeModalNetworkError = this.closeModalNetworkError.bind(this);
        this.closeModalError = this.closeModalError.bind(this);
        this.closeModalSuccess = this.closeModalSuccess.bind(this);
    }

    closeModalNetworkError(){
        this.props.set_network_error_status(false);
    }

    closeModalServerError(){
        this.props.set_server_error_status(false);
    }

    closeModalError(){
        this.props.set_error_status({
            status: false,
            data: '',
        });
    }

    closeModalSuccess(){
        this.props.set_success_status({
            status: false,
            data: '',
        });
    }

    _renderBackground(){
        if(this.props.noBackground){
            return null;
        } 
        else {
            return (
                <View style={styles.backgroundBottom(this.props.bgColorBottom)}>
                    <View style={styles.backgroundTop(this.props.bgColorTop)}/>
                </View>
            );
        }
    }

    render(){
        if(Platform.OS === 'ios'){
            return (
                <View style={styles.container(this.props.containerColor)}>
                    {this._renderBackground()}
                    <SafeAreaView style={styles.container(this.props.containerColor)} forceInset={{top: 40, bottom: -10}}>
                        <KeyboardAvoidingView 
                            behavior='padding' 
                            style={styles.contentContainer(this.props.noBackground)}
                        >
                        {
                            this.props.containerColor ? <StatusBar barStyle = "light-content" hidden = {false} translucent = {false}/> : <StatusBar barStyle = "dark-content" hidden = {false} translucent = {false}/>
                        }
                            {this.props.children}
                            {/* <Loading
                                modalVisible = {this.props.network.isLoading}
                            /> */}
                            <ServerError
                                modalVisible = {this.props.network.isServerError}
                                closeModal = {this.closeModalServerError}
                            />
                            <NetworkError
                                modalVisible = {this.props.network.isNetworkError}
                                closeModal = {this.closeModalNetworkError}
                            />
                            <FormError
                                modalVisible = {this.props.network.isResponseError}
                                closeModal = {this.closeModalError}
                                errorMessage = {this.props.network.errorMessage}
                                errorTitle = {this.props.network.errorTitle}
                            />
                            <FormSuccess
                                modalVisible = {this.props.network.isResponseSuccess}
                                closeModal = {this.closeModalSuccess}
                                successMessage = {this.props.network.successMessage}
                                successTitle = {this.props.network.successTitle}
                            />
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </View>
            )
        } else {
            return(
                <View style={styles.container(this.props.containerColor)}>
                    {this._renderBackground()}
                    <SafeAreaView style={styles.container(this.props.containerColor)}>
                        <View style={styles.contentContainer(this.props.noBackground)}>
                            {this.props.children}
                            <Loading
                                modalVisible = {this.props.network.isLoading}
                            />
                            <ServerError
                                modalVisible = {this.props.network.isServerError}
                                closeModal = {this.closeModalServerError}
                            />
                            <NetworkError
                                modalVisible = {this.props.network.isNetworkError}
                                closeModal = {this.closeModalNetworkError}
                            />
                            <FormError
                                modalVisible = {this.props.network.isResponseError}
                                closeModal = {this.closeModalError}
                                errorMessage = {this.props.network.errorMessage}
                                errorTitle = {this.props.network.errorTitle}
                            />
                            <FormSuccess
                                modalVisible = {this.props.network.isResponseSuccess}
                                closeModal = {this.closeModalSuccess}
                                successMessage = {this.props.network.successMessage}
                                successTitle = {this.props.network.successTitle}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    network: state.network
});

const mapDispatchToProps = dispatch => ({
    set_error_status: (p) => dispatch(actions.network.reducer.set_error_status(p)),
    set_success_status: (p) => dispatch(actions.network.reducer.set_success_status(p)),
    set_network_error_status: (p) => dispatch(actions.network.reducer.set_network_error_status(p)),
    set_server_error_status: (p) => dispatch(actions.network.reducer.set_server_error_status(p))
});

export default connect(mapStateToProps,mapDispatchToProps)(Container);