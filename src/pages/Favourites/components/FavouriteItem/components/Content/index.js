import { Dimensions, Text, View } from 'react-native';
/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';

import StaticText from '@components/StaticText';
import numeral from 'numeral';
import { scaling } from '@helpers';
import styles from './styles';

const { width, height } = Dimensions.get('window');

class FavouriteContent extends PureComponent {
	constructor() {
		super();
	}


	renderQuotaClaim() {
		let claimLimit;

		if (Number(this.props.data.quota_claim) > 0) {
			claimLimit = Number(this.props.data.quota_claim) - Number(this.props.data.total_claim_product || 0);
		}
		// else if (Number(this.props.data.quota_claim) > 0) {
		// 	claimLimit = Number(this.props.data.quota_claim);
		// }

		if (claimLimit !== undefined && Number(this.props.data.quota_claim) - Number(this.props.data.total_claim_product || 0) > 0) {
			return <Text style={ styles.text.claimLimit }>Limit Promo: { claimLimit }</Text>;
		}
	}

	render() {
		const productPrice = numeral(this.props.data.price).format('0,0');
		let productPromoPrice;

		if (this.props.data.promo_price && this.props.data.promo_price > 0) {
			productPromoPrice = numeral(this.props.data.promo_price).format('0,0');
		} else {
			productPromoPrice = numeral(this.props.data.productPrice).format('0,0');
		}

		return (
			<View style={ styles.container(this.props.dashboard) }>
				{
					this.props.dashboard ?
						<View style={ { width: width * 0.41, height: 25, marginTop: 0, paddingHorizontal: 15 } }>
							<Text style={ styles.text.title } numberOfLines={ 1 }>{ this.props.data.name }</Text>
							<Text style={ styles.text.desc }>{ this.props.data.short_description }</Text>
						</View> :
						<View style={ { width: 170, height: 35, marginTop: 0, justifyContent: 'center' } }>
							<Text style={ styles.text.title } numberOfLines={ 1 } >{ this.props.data.name }</Text>
							<Text style={ styles.text.desc }>{ this.props.data.short_description }</Text>
						</View>
				}

				<View style={ { paddingHorizontal: this.props.dashboard ? 15 : 0 } }>
					{/* { this.props.data.on_promo == 1 && Number(this.props.data.quota_claim) === 0 || this.props.data.on_promo == 1 && Number(this.props.data.quota_claim) - Number(this.props.data.total_claim_product || 0) > 0  ? */ }
					{
						this.props.data.on_promo == 1 ? (
							<Text style={ styles.text.price.promo(this.props.dashboard) }>
								<StaticText
									property={ 'productList.content.price' }
								/>
								{ productPrice }

							</Text>

						)
							: <View style={ styles.text.noPromo(this.props.dashboard) } />
					}
					{/* // } */ }

					{
						Number(this.props.data.on_promo) != 1 ?
							(
								<View style={ { flex: -1, flexDirection: 'row' } }>
									<Text style={ styles.text.price.normal(this.props.data.on_promo) }>
										<StaticText
											property={ 'productList.content.price' }
										/>
										{ productPrice }

									</Text>
								</View>
							) :
							(<View style={ { flex: -1, marginTop: 0 } }>
								<Text style={ styles.text.price.normal(this.props.data.on_promo) }>
									<StaticText
										property={ 'productList.content.price' }
									/>
									{ productPromoPrice }
									{/* { Number(this.props.data.quota_claim) === 0 || Number(this.props.data.quota_claim) - Number(this.props.data.total_claim_product || 0) > 0 ? productPromoPrice : productPrice } */ }
								</Text>
								{/* {this.renderQuotaClaim()} */ }
							</View>
							)
					}
				</View>
			</View>
		);
	}
}

export default FavouriteContent;
