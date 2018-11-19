import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import numeral from 'numeral';
import StaticText from '@components/StaticText';
import styles from './styles';

class Content extends PureComponent {
	constructor(){
		super()
	}

	render(){
		const productPrice = numeral(this.props.data.price).format('0,0');
		const productPromoPrice = numeral(this.props.data.promo_price).format('0,0');
		return(
			<View style={styles.container}>
				<Text style={styles.text.title}>{this.props.data.name}</Text>
				<Text style={styles.text.desc}>{this.props.data.product_category_name}</Text>
				{ this.props.data.on_promo == 1
					? (
						<View>
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
							<Text style={styles.text.price.normal}>
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
						</View>
					)
					: (
						<Text style={styles.text.price.normal}>
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
				}
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
				<Text style={styles.text.desc}>{this.props.data.short_description}</Text>
			</View>
		);
	}
}

export default Content;