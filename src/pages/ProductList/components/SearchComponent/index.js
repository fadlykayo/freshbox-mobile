import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { language, validation } from '@helpers';
import styles from './styles';
import images from '@assets';


class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchItem: '',
			placeholder: '',
    	}
    	this.onChangeText = this.onChangeText.bind(this);
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
		this.renderPlaceholder = this.renderPlaceholder.bind(this);
	}

  	onChangeText(value){
		this.props.onChangeText(this.props.type,value);
  	}

  	onSubmitEditing(){
  		if(this.props.onSubmitEditing) this.props.onSubmitEditing();
  	}  

	componentDidMount() {
		this.renderPlaceholder(this.props.title,this.props.language,this.props.params);
	}

	renderPlaceholder(property = 'no_props',lang = 'bahasa',params = {}){
		language.transformText(property,lang,params)
		.then((res) => {
				this.setState({placeholder: res});
		});
	}

	render(){
		return (
      		<View style={styles.container}>
  	  			<View style={styles.searchContainer}>
					<TouchableOpacity>
	  	    			<Image
  	  	    				resizeMode={'contain'} 
  	  	    				source={images.icon_search}
  	  	    				style={styles.iconSearch}
  	  					/>
					</TouchableOpacity>
		    		<TextInput 
  	        			onChangeText={this.onChangeText}
  	        			placeholder={this.state.placeholder}
		    		  	onSubmitEditing={this.onSubmitEditing}
		    		  	style={styles.textinput}
		    		/>
  	    		</View>
				<TouchableOpacity 
					onPress={() => {
						this.props.openDrawerMenu()
					}}
					style={styles.button}
				>
  	  	  			<Image
  	  	  			  resizeMode={'contain'} 
  	  	  			  source={images.icon_menu}
  	  	  			  style={styles.icon}
  	  	  			/>
  	  			</TouchableOpacity>
      		</View>
		);
	}
}

export default SearchComponent;