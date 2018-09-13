import React,{ Component } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
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
            keyboardType: props.keyboardType ? props.keyboardType : 'default',
            returnKeyType: props.returnKeyType ? props.returnKeyType : 'done',
            maxLength: props.maxLength ? props.maxLength : 9999,
            placeholder: '',
        }
        this.blur = this.blur.bind(this);
        this.focus = this.focus.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.showPasswordHandler = this.showPasswordHandler.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
        this.getPlaceholder = this.getPlaceholder.bind(this);
    }

    componentDidMount(){
        if(this.props.placeholder) this.getPlaceholder();
    }

    componentWillUnmount(){
        this.TextInput.blur();
    }

    blur(){
        this.TextInput.blur();
        this.focusHandler();
    }

    focus(){
        this.TextInput.focus();
        this.focusHandler();
    }

    focusHandler(){
        let state = this.state;
        state.isFocused = !state.isFocused;
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

    onSubmitEditing(){
        if(this.props.onSubmitEditing) this.props.onSubmitEditing();
        this.blur();
    }

    getPlaceholder(){
        language.transformText(this.props.placeholder)
        .then((res) => {
            this.setState({placeholder: res});
        });
    }
    
    _renderLabel(props){
        if(this.state.isFocused == false) return null
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

    render(){
        return (
            <View style={styles.container}>
                {this._renderLabel(this.props)}
                <TextInput
                    ref={c => {this.TextInput = c}}
					style={styles.formInput}
                    autoCapitalize={'none'}
                    autoFocus={this.state.autoFocus}
					multiline={this.state.multiline}
					onChangeText={this.onChangeText}
                    value={this.props.value}
                    placeholder={this.state.placeholder}
					maxLength={this.state.maxLength}
					editable={this.state.editable}
					keyboardType={this.state.keyboardType}
					returnKeyType={this.state.returnKeyType}
					secureTextEntry={this.state.isSecret}
					onFocus={this.focusHandler}
					onBlur={this.focusHandler}
					underlineColorAndroid='transparent'
					onSubmitEditing={this.onSubmitEditing}
				/>
                <View style={styles.underline}/>
                {this._renderShowPasswordButton(this.props)}
            </View>
        )
    }
}

export default FormInput;