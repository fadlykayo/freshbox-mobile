import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Image, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class ListCategoryComponent extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<ScrollView style={styles.scrollView}>
				<View style={styles.categories}>
					{ this.props.categories.map((category) => {
						if (category.check) {
							return (
								<TouchableOpacity
									onPress={() => this.props.changeCategory(category)}
									style={styles.eachCategory}
									key={category.id}
								>
									<View style={styles.checkPlace}>
										<Image
											resizeMode={'contain'} 
											source={images.icon_check}
											style={styles.check}
										/>
									</View>
									{ category.name == 'Default' ? (
										<Image
											resizeMode={'contain'} 
											source={category.images_sizes_url.original[0]}
											style={styles.logo}
										/>
									) : (
										<Image
											resizeMode={'contain'} 
											source={{uri: category.images_sizes_url.original[0]}}
											style={styles.logo}
										/>
									) }
									{ category.name == 'Default' ? (
										<StaticText
											style={styles.categoryText}
											property={'productList.content.default'}
										/>
									) : (
										<Text style={ styles.categoryText }>{ category.name }</Text>
									) }
								</TouchableOpacity>
							)
						}
						else {
							return (
								<TouchableOpacity
									onPress={() => this.props.changeCategory(category)}
									style={styles.eachCategory}
									key={category.id}
								>
									{ category.name == 'Default' ? (
										<Image
											resizeMode={'contain'} 
											source={category.images_sizes_url.original[0]}
											style={styles.logo}
										/>
									) : (
										<Image
											resizeMode={'contain'} 
											source={{uri: category.images_sizes_url.original[0]}}
											style={styles.logo}
										/>
									) }
									{ category.name == 'Default' ? (
										<StaticText
											style={styles.categoryText}
											property={'productList.content.default'}
										/>
									) : (
										<Text style={ styles.categoryText }>{ category.name }</Text>
									) }
								</TouchableOpacity>
							)
						}
					})}
				</View>
			</ScrollView>
		)
	}
}

export default ListCategoryComponent;