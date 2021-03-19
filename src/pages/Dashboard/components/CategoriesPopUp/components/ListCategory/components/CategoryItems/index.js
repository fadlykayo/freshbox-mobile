import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class CategoryItems extends PureComponent {
	constructor(props){
		super(props);
		this.changeCategory = this.changeCategory.bind(this);
	}

	changeCategory(){
		if(this.props.isArea) {
			this.props.closeModal(this.props.category)
		} else {
			this.props.changeCategory(this.props.category);
		}
	}

	_renderImage(category){
		if(category.images_sizes_url) {
			if(category.name.toLowerCase() == 'default'){
				return(
					<Image
						resizeMode={'contain'} 
						source={category.images_sizes_url.original[0]}
						style={styles.icon.product}
					/>
				)
			}
			else {
				return(
					<Image
						resizeMode={'contain'} 
						source={{uri: category.images_sizes_url.original[0]}}
						style={styles.icon.product}
					/>
				)
			}
		}
	}

	_renderDesc(category){
		if(category.name.toLowerCase() == 'default'){
			return(
				<StaticText
					style={styles.text.category}
					property={'productList.content.default'}
				/>
			)
		}
		else {
			return <Text style={styles.text.category}>{category.name}</Text>
		}
	}

	render(){
		return(
			<TouchableOpacity
				onPress={this.changeCategory}
				style={styles.container(this.props.index,this.props.length)}
			>
				{ this.props.category.check
					?	<View style={styles.subcontainer.check}>
							<Image
								resizeMode={'contain'} 
								source={images.icon_check}
								style={styles.icon.check}
							/>
						</View>
					:	null
				}
				{/* {this._renderImage(this.props.category)} */}
				{this._renderDesc(this.props.category)}
			</TouchableOpacity>
		)
	}
}

export default CategoryItems;