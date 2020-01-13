import React,{ PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import CategoryItems from './components/CategoryItems';

class ListCategoryComponent extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<ScrollView style={styles.container}>
				<View style={styles.categories}>
					{ this.props.categories.map((category,index) => 
						<CategoryItems 
							key={category.code}
							category={category}
							changeCategory={this.props.changeCategory}
							length={this.props.categories.length-1}
							index={index}
						/>
					)}
				</View>
			</ScrollView>
		)
	}
}

export default ListCategoryComponent;