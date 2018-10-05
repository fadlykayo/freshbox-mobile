import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { language, validation } from '@helpers';
import styles from './styles';

class InputData extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			placeholder: '',
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.renderPlaceholder = this.renderPlaceholder.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this.focus = this.focus.bind(this);
	}
    
    onChangeText(value){
		this.props.onChangeText(this.props.type,value);
  	}

    focus(){
        this.TextInput.focus();
    }

  	onSubmitEditing(){
  		if(this.props.onSubmitEditing) this.props.onSubmitEditing();
  	} 

    componentDidMount() {
		this.renderPlaceholder(this.props.title,this.props.language,this.props.params);
    }
    
	renderPlaceholder(property = 'no_props',lang = 'english',params = {}){
		language.transformText(property,lang,params)
		.then((res) => {
			this.setState({placeholder: res});
		});
    }
    
  	render() {
  	  	return (
            <View style={styles.message}>
			    <TextInput
                    ref={c => {this.TextInput = c}}
			    	onChangeText={this.onChangeText}
			    	placeholder={this.state.placeholder}
			    	onSubmitEditing={this.onSubmitEditing}
			    	style={styles.messageText}
			    />
            </View>
  	  	);
  	}
}

export default InputData;
