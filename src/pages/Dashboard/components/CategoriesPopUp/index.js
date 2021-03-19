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

	closeCategory(isArea = false){
		this.props.closeDialogCategories(isArea);
	}

	closeModal = async (area) => {
		await this.props.closeDialogCategories(true);
		await this.props.openPopUpChangesArea()
		await this.props.setSelectedArea(area)
	}

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.background}>
					<Modal
						animationType={'slide'}
						transparent={true}
						visible={this.props.modalVisible}
						onRequestClose={() => {
							if(this.props.isArea) {
								this.closeCategory(true)
							} else {
								this.closeCategory(false)
							}
						}}
					>
						<TouchableOpacity style={styles.touchable} onPress={() => {
							if(this.props.isArea) {
								this.closeCategory(true)
							} else {
								this.closeCategory(false)
							}
						}}></TouchableOpacity>
						<View style={styles.container(this.props.isArea)}>
							<View style={styles.subcontainer.title(this.props.isArea)}>
								<TouchableOpacity
									onPress={() => {
										if(this.props.isArea) {
											this.closeCategory(true)
										} else {
											this.closeCategory(false)
										}
									}}
									style={styles.subcontainer.button(this.props.isArea)}
								>
									<Image
										resizeMode={'contain'}
										source={images.icon_scroll_down}
										style={styles.icon}
									/>
								</TouchableOpacity>
								{!this.props.isArea && <StaticText
									style={styles.text.title}
									property={ 'productList.content.categories'}
								/>}
							</View>
							<ListCategory
								listArea={this.props.listArea}
								categories={this.props.categories}
								changeCategory={this.props.changeCategory}
								isArea={this.props.isArea}
								closeModal={this.closeModal}
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