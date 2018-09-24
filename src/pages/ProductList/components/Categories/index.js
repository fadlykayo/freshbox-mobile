import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Image, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import ListCategoryComponent from '../ListCategoryComponent';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class OpenCategories extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.overlay}>
					<View style={styles.container}>
						<View style={styles.topComponent}>
							<View style={styles.scrollDownButton}>
								<TouchableWithoutFeedback
									onPress={ () => this.props.closeDialogCategories()}>
									<Image
										resizeMode={'contain'} 
										source={images.icon_scroll_down}
										style={styles.logo}
									/>
								</TouchableWithoutFeedback>
							</View>
							<StaticText
								style={styles.staticText}
								property={'productList.content.categories'}
							/>
						</View>
						<ListCategoryComponent
							categories={this.props.categories}
							changeCategory={this.props.changeCategory}
						/>
					</View>
				</View>
			)
		} else {
			return null;
		}
	}
}

export default OpenCategories;