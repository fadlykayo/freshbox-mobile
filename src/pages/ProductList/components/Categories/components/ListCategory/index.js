import React,{ PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import CategoryItems from './components/CategoryItems';

class ListCategoryComponent extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		const data = this.props.isArea ?  this.props.listArea : this.props.categories
		return(
			<ScrollView style={styles.container}>
				<View style={styles.categories}>
					{ data.map((category,index) => 
						<CategoryItems 
							key={ this.props.isArea ? category.id : category.code}
							category={category}
							changeCategory={this.props.changeCategory}
							length={this.props.categories.length-1}
							index={index}
							closeModal={this.props.closeModal}
							isArea={this.props.isArea}
						/>
					)}
				</View>
			</ScrollView>
		)
	}
}

export default ListCategoryComponent;