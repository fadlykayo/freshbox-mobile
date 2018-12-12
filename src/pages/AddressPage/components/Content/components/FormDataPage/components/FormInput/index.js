import React,{ Component } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
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
            <Text style={styles.text.label}>
                <StaticText
                    property={props.label}
                />
                { props.required.length == 0
                    ? null
                    : <StaticText
                    property={props.required}
                />
                }
            </Text>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                {this._renderLabel(this.props)}
                <TextInput
                    ref={c => {this.TextInput = c}}
					style={styles.text.placeholder}
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
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					underlineColorAndroid='transparent'
					onSubmitEditing={this.onSubmitEditing}
				/>
                <View style={styles.underline}/>
            </View>
        )
    }
}

export default FormInput;