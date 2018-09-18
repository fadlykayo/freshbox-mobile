import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';


class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
      searchItem: '',
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
	}

  onChangeText(value){
		this.props.onChangeText(this.props.type,value);
  }

  onSubmitEditing(){
    if(this.props.onSubmitEditing) this.props.onSubmitEditing();
  }

	render(){
		return (
      <View style={styles.container}>
  	  	<View style={styles.partContainer}>
          <TouchableOpacity
            style={styles.eachContainer}
            onPress = { () => this.props.openAllCategories() }
          >
            <StaticText
              style={styles.categoryText}
              property={'productList.filter.categories'}
            />
            <Image
  	  	      resizeMode={'contain'} 
  	  	      source={images.icon_view_categories}
  	  	      style={styles.icon}
  	  		  />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eachContainer}
          >
            <StaticText
              style={styles.filterByPriceText}
              property={'productList.filter.price'}
            />
            <Image
  	  	      resizeMode={'contain'} 
  	  	      source={images.icon_dropdown}
  	  	      style={styles.icon}
  	  		  />
          </TouchableOpacity>
        </View>
      </View>
		);
	}
}

export default SearchComponent;