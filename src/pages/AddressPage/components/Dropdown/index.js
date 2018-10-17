import React,{ Component } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, Image, Text, TouchableWithoutFeedback } from 'react-native';
import StaticText from '@components/StaticText';
import { language } from '@helpers';
import images from '@assets';
import styles from './styles';

class Dropdown extends Component {
    constructor(props){
        super(props);
        this.state={
            isFocused: false,
			isOpen: props.isPassword ? props.isPassword : false,
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
        this.showDropdown = this.showDropdown.bind(this);
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
    }

    onBlur(){
        this.focusHandler(false);
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

    showDropdown(){
        let state = this.state;
        state.isOpen = !state.isOpen;
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
        if(this.props.value.length == 0) return null;
        else return (
            <StaticText 
                style={styles.label}
                property={props.label}
            />
        )
    }

    render() {
        if(this.state.isOpen == true){
            return(
                <TouchableOpacity style={styles.container} onPress={this.showDropdown}>
                    {this._renderLabel(this.props)}
                    {
                        this.props.value ? (
                            <Text style={styles.formInput}>{this.props.value}</Text>
                        ) : (
                            <Text style={styles.formInput}>{this.state.placeholder}</Text>
                        )
                    }
                    <View style={styles.underline}/>
                    <View style={styles.showPasswordButton}>
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_dropdown_arrow_down}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return(
                <View>
                    <TouchableOpacity style={styles.container} onPress={this.showDropdown}>
                        {this._renderLabel(this.props)}
                        {
                            this.props.value ? (
                                <Text style={styles.formInput}>{this.props.value}</Text>
                            ) : (
                                <Text style={styles.formInput}>{this.state.placeholder}</Text>
                            )
                        }
                        <View style={styles.underline}/>
                        <View style={styles.showPasswordButton}>
                            <Image
                                resizeMode={'contain'} 
                                source={images.icon_dropdown_arrow_up}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback>
                        <FlatList
                            // onTouchStart={(ev) => this.props.setContentFlex(ev) }
                            // onTouchEnd={(e) => this.props.setContentFlexNull()}
                            // onMomentumScrollEnd={(e) => this.props.setContentFlexNull()}
                            // onScrollEndDrag={(e) => this.props.setContentFlexNull()}
                            style={styles.dropdownPlace}
                            data={this.props.province}
                            keyExtractor={(item) => String(item.id)}
					        renderItem={({item,index}) => (
                                <TouchableOpacity style={styles.dropdown} onPress={() => {
                                    this.props.getDataProvince(index)
                                    this.showDropdown()
                                    }
                                }>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
					        )}
                        />
                    </TouchableWithoutFeedback>
                </View>
            )
        }


    }
}

export default Dropdown;