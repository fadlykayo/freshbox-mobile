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
		if(this.props.bannerPrice && this.props.bannerPrice > 0) {
			productPromoPrice = numeral(this.props.bannerPrice).format('0,0');
		} 
		return(
			<View style={styles.container(this.props.dashboard)}>
					{
						this.props.dashboard ? 
						<View style ={{width: width * 0.41,height: 25, marginTop: 0, paddingHorizontal: 15}}>
							<Text style={styles.text.title} numberOfLines = {1}>{this.props.data.name}</Text>
							<Text style={styles.text.desc}>{this.props.data.short_description}</Text>		
						</View> : 
						<View style ={{width: 170,height: 35, marginTop: 0, justifyContent: 'center'}}>
							<Text style={styles.text.title}>{this.props.data.name}</Text>
							<Text style={styles.text.desc}>{this.props.data.short_description}</Text>		
						</View>
					}

						<View style={{paddingHorizontal: this.props.dashboard ? 15 : 0}}>
							{ this.props.data.on_promo == 1 ? 
								<Text style={styles.text.price.promo(this.props.dashboard)}>
										<StaticText
											property={'productList.content.price'}
										/>
										{productPrice}
								
								</Text> : <View style={styles.text.noPromo(this.props.dashboard)}></View>
							}
							
							{
								this.props.data.on_promo !== 1 ?
								(
									<View style={{flex: -1, flexDirection: 'row'}}>
										<Text style={styles.text.price.normal(this.props.data.on_promo)}>
											<StaticText
												property={'productList.content.price'}
											/>
											{productPromoPrice}

										</Text>
										
										
										
									</View>
								) : 
								(	<View style={{flex: -1, marginTop: 0}}>
										<Text style={styles.text.price.normal(this.props.data.on_promo)}>
											<StaticText
												property={'productList.content.price'}
											/>
											{productPromoPrice}

										</Text>

									</View>
										
								)
							}
								

						</View>
			</View>
		);
	}
}

export default Content;