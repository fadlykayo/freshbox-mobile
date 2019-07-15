import React,{ Component } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import { language } from '@helpers';
import images from '@assets';
import styles from './styles';

class FormInput extends Component {
    constructor(props){
        super(props);
        this.state={
            isFocused: false,
			isSecret: props.isPassword ? props.isPassword : false,
			isPassword: props.isPassword ? props.isPassword : false,
			autoFocus: props.autoFocus ? props.autoFocus : false,
            multiline: props.multiline ? props.multiline : false,
            editable: props.editable ? props.editable : true,
            textContentType: props.textContentType ? props.textContentType : 'none',
            keyboardType: props.keyboardType ? props.keyboardType : 'default',
            returnKeyType: props.returnKeyType ? props.returnKeyType : 'done',
            maxLength: props.maxLength ? props.maxLength : 9999,
            placeholder: '',
        }
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.blur = this.blur.bind(this);
        this.focus = this.focus.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.showPasswordHandler = this.showPasswordHandler.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
        this.getPlaceholder = this.getPlaceholder.bind(this);
        this.voucherAPI = this.voucherAPI.bind(this);
    }

    componentDidMount(){
        if(this.props.placeholder) this.getPlaceholder();
    }

    onFocus(){
        this.focusHandler(true);
        if(this.props.onFocusHandler) this.props.onFocusHandler()
    }

    onBlur(){
        this.focusHandler(false);
        if(this.props.onBlurHandler) this.props.onBlurHandler()
    }

    blur(){
        this.TextInput.blur();
    }

    focus(){
        this.TextInput.focus();
    }

    focusHandler(value){
        let state = this.state;
        state.isFocused = value;
        this.setState(state);
    }

    showPasswordHandler(){
        let state = this.state;
        state.isSecret = !state.isSecret;
        this.setState(state);
    }

    onChangeText(value){
		this.props.onChangeText(this.props.type,value);
    }

    voucherAPI() {
        this.props.voucherAPI();
    }

    onSubmitEditing(){
        this.blur();
        if(this.props.onSubmitEditing) this.props.onSubmitEditing();
    }

    getPlaceholder(){
        language.transformText(this.props.placeholder)
        .then((res) => {
            this.setState({placeholder: res});
        });
    }
    
    _renderLabel(props){
        if(this.state.isFocused == false && props.value.length == 0) return null;
        else return (
            <StaticText 
                style={styles.label}
                property={props.label}
            />
        )
    }

    _renderShowPasswordButton(props){
        if(this.state.isPassword == false) return null;
        else {
            if(props.value.length == 0) return null;
            else {
                if(this.state.isSecret == true){
                    return(
                        <TouchableOpacity style={styles.showPasswordButton} onPress={this.showPasswordHandler}>
                            <Image
                                resizeMode={'contain'} 
                                source={images.icon_show_password}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    )
                } else {
                    return(
                        <TouchableOpacity style={styles.showPasswordButton} onPress={this.showPasswordHandler}>
                            <Image
                                resizeMode={'contain'} 
                                source={images.icon_hide_password}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    )
                }
            }
        }
    }

    _renderVoucherChecker () {
        if(!this.props.statusVerification) {
            return (
                <View style={styles.showVoucherButton}>
                    <TouchableOpacity onPress={this.props.voucherAPI}>
                        <Text style={styles.textVoucher}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            )

        } else {
            return (
                <View style={styles.showCancelVoucher}>
                    <TouchableOpacity onPress={this.props.cancelVoucherAPI}>
                        <Text style={styles.textCancel}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _renderContent () {
        if(!this.props.statusVerification) {
            return (
                <>
                <TextInput
                    ref={c => {this.TextInput = c}}
                    style={styles.formInput}
                    autoCapitalize={'none'}
                    autoFocus={this.state.autoFocus}
                    multiline={this.state.multiline}
                    onChangeText={this.onChangeText}
                    value={this.props.value}
                    numberOfLines={this.state.multiline ? this.props.numberOfLines : null}
                    placeholder={this.state.placeholder}
                    maxLength={this.state.maxLength}
                    editable={this.props.editable}
                    keyboardType={this.state.keyboardType}
                    returnKeyType={this.state.returnKeyType}
                    secureTextEntry={this.state.isSecret}
                    textContentType={this.state.textContentType}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.onSubmitEditing}
                />
                {this.props.multiline ? null : <View style={styles.underline}/> }
                {this._renderShowPasswordButton(this.props)}
                </>
            )
        } else {
            return (
                <View style ={styles.successVoucher}>
                    <Text style={styles.successText}>{this.props.value}</Text>
                    <Image
                        resizeMode={'contain'}
                        source={images.icon_combined_shape}
                        style={styles.icon}
                    />
                </View>

            )
        }

    }

    render(){
        return (
            <View style={styles.container(this.state.multiline)}>
                {this._renderLabel(this.props)}
                {this._renderContent()}
                {this.props.type == 'voucher' ? this._renderVoucherChecker() : null}
            </View>
        )
    }
}

export default FormInput;