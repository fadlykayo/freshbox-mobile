import React,{ PureComponent } from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import actions from '@actions';
import Loading from '../Loading';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
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

    render(){
        if(Platform.OS === 'ios'){
            return(
                <SafeAreaView 
                    style={
                        this.props.noBackground 
                        ? styles.container
                        : styles.containerBackground
                    }>
                    <KeyboardAvoidingView 
                        behavior='padding' 
                        style={
                            this.props.noBackground 
                            ? styles.contentContainer
                            : styles.contentContainerBackground
                        }
                    >
                        {this.props.children}
                        <Loading
                            modalVisible = {this.props.network.isLoading}
                        />
                        <FormError
                            modalVisible = {this.props.network.isResponseError}
                            closeModal = {this.closeModalError}
                            errorMessage = {this.props.network.errorMessage}
                        />
                        <FormSuccess
                            modalVisible = {this.props.network.isResponseSuccess}
                            closeModal = {this.closeModalSuccess}
                            successMessage = {this.props.network.successMessage}
                        />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        } else {
            return(
                <SafeAreaView 
                    style={
                        this.props.noBackground 
                        ? styles.container
                        : styles.containerBackground
                    }>
                    {this.props.children}
                    <Loading
                        modalVisible = {this.props.network.isLoading}
                    />
                    <FormError
                        modalVisible = {this.props.network.isResponseError}
                        closeModal = {this.closeModalError}
                        errorMessage = {this.props.network.errorMessage}
                    />
                    <FormSuccess
                        modalVisible = {this.props.network.isResponseSuccess}
                        closeModal = {this.closeModalSuccess}
                        successMessage = {this.props.network.successMessage}
                    />
                </SafeAreaView>
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