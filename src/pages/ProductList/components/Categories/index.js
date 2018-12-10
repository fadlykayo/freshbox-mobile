import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Image, Modal } from 'react-native';
import ListCategory from './components/ListCategory';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class OpenCategories extends PureComponent {
	constructor(props){
		super(props);
		this.closeCategory = this.closeCategory.bind(this);
	}

	closeCategory(){
		this.props.closeDialogCategories();
	}

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.background}>
					<Modal
						animationType={'slide'}
						transparent={true}
						visible={this.props.modalVisible}
						onRequestClose={this.closeCategory}
					>
						<TouchableOpacity style={styles.touchable} onPress={this.closeCategory}></TouchableOpacity>
						<View style={styles.container}>
							<View style={styles.subcontainer.title}>
								<TouchableOpacity
									onPress={this.closeCategory}
									style={styles.subcontainer.button}
								>
									<Image
										resizeMode={'contain'}
										source={images.icon_scroll_down}
										style={styles.icon}
									/>
								</TouchableOpacity>
								<StaticText
									style={styles.text.title}
									property={'productList.content.categories'}
								/>
							</View>
							<ListCategory
								categories={this.props.categories}
								changeCategory={this.props.changeCategory}
							/>
						</View>
					</Modal>
				</View>
			)
		} else {
			return null;
		}
	}
}

export default OpenCategories;