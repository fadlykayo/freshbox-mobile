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
			placeholder: '',
    	}
    	this.onChangeText = this.onChangeText.bind(this);
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
		this.renderPlaceholder = this.renderPlaceholder.bind(this);
		this.openDrawerMenu = this.openDrawerMenu.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}

	openDrawerMenu() {
		this.props.openDrawerMenu()
	}

  	onChangeText(value){
		this.props.onChangeText(this.props.type,value);
  	}

  	onSubmitEditing(){
  		if(this.props.onSubmitEditing) this.props.onSubmitEditing();
  	}  

	clearSearch() {
		this.props.clearSearch()
	}

	componentDidMount() {
		this.renderPlaceholder(this.props.title,this.props.language,this.props.params);
	}

	renderPlaceholder(property = 'no_props',lang = 'id',params = {}){
		language.transformText(property,lang,params)
		.then((res) => {
				this.setState({placeholder: res});
		});
	}

	render(){
		return (
      		<View style={styles.container}>
			  	<TouchableOpacity 
					onPress={this.openDrawerMenu}
					style={styles.button}
				>
  	  	  			<Image
  	  	  			  resizeMode={'contain'} 
  	  	  			  source={images.icon_menu}
  	  	  			  style={styles.icon.menu}
  	  	  			/>
  	  			</TouchableOpacity>
  	  			<View style={styles.subcontainer.search}>
					<View>
	  	    			<Image
  	  	    				resizeMode={'contain'} 
  	  	    				source={images.icon_search}
  	  	    				style={styles.icon.search}
  	  					/>
					</View>
					<TextInput
						value={this.props.value} 
  	        			onChangeText={this.onChangeText}
  	        			placeholder={this.state.placeholder}
		    		  	onSubmitEditing={this.onSubmitEditing}
		    		  	style={styles.textinput}
		    		/>
					{this.props.value.length > 0
						? (
							<TouchableOpacity style={styles.clear.place} onPress={this.clearSearch}>
								<Image
  	  	    						resizeMode={'contain'} 
  	  	    						source={images.icon_clear_search}
  	  	    						style={styles.icon.clear}
  	  							/>
							</TouchableOpacity>
						) : null
					}
  	    		</View>
      		</View>
		);
	}
}

export default SearchComponent;