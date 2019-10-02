import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
const { width, height } = Dimensions.get('window');
import numeral from 'numeral';
import StaticText from '@components/StaticText';
import styles from './styles';

class Content extends PureComponent {
	constructor(){
		super()
	}

	render(){
		const productPrice = numeral(this.props.data.price).format('0,0');
		let productPromoPrice = numeral(this.props.data.promo_price).format('0,0');
		productPromoPrice = productPromoPrice + ' '
		return(
			<View style={styles.container}>
				{
					this.props.dashboard ? 
					<View style ={{width: 110,height: 45, marginTop: 5,}}>
						<Text style={styles.text.title}>{this.props.data.name}</Text>
					</View> : 
					<Text style={styles.text.title}>{this.props.data.name}</Text>
				}
				
				{/* <Text style={styles.text.desc}>{this.props.data.product_category_name}</Text> */}
				{/* <Text style={styles.text.desc}>1 pack ({this.props.data.short_description})</Text> */}
						<View>

							{
								this.props.data.on_promo == 1 ?
								(
									<View style={{height: 20, marginTop: 5}}>
										<Text style={styles.text.price.promo}>
											<StaticText
												property={'productList.content.price'}
											/>
											{productPrice}
											<StaticText
												style={styles.text.desc}
												property={'productList.content.pack'}
											/>
											<Text style={styles.text.desc}>{this.props.data.unit}</Text>
										</Text>
									</View>
								) : 
								(
									<View style={{height: 20}}/>
								)
							}
							<Text style={styles.text.price.normal(this.props.data.on_promo)}>
								<StaticText
									property={'productList.content.price'}
								/>
								{productPromoPrice}
								{
									scaling.isIphone5s() ? null :
									<>
									<StaticText
										style={styles.text.desc}
										property={'productList.content.pack'}
									/>
									<Text style={styles.text.desc}>{this.props.data.unit}</Text>
									</>
								}

							</Text>

						</View>
					{/* )
					: (
						<Text style={styles.text.price.normal(this.props.data.on_promo)}>
							<StaticText
								property={'productList.content.price'}
							/>
							{productPromoPrice}
							<StaticText
								style={styles.text.desc}
								property={'productList.content.pack'}
							/>
							<Text style={styles.text.desc}>{this.props.data.unit}</Text>
						</Text>
					)
				} */}
				{/* <Text style={styles.text.price}>
					<StaticText
						style={styles.text.price}
						property={'productList.content.price'}
					/>
					{productPrice}
					<StaticText
						style={styles.text.desc}
						property={'productList.content.pack'}
					/>
					<Text style={styles.text.desc}>{this.props.data.unit}</Text>
				</Text> */}
				{/* <Text style={styles.text.desc}>{this.props.data.short_description}</Text> */}
			</View>
		);
	}
}

export default Content;