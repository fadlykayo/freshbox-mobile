import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
		flex: 1,
	},
	text:{
		title:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
		},
		price:{
			promo: {
				fontFamily: 'Avenir-Roman',
				fontSize: scaling.moderateScale(14),
				color: colour.grey,
				textDecorationLine: 'line-through'
			},
			normal: {
				fontFamily: 'Avenir-Roman',
				fontSize: scaling.moderateScale(14),
				color: colour.darkGrey,
			}
		},
		desc:{
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(10),
			color: colour.lightGrey,
		}
	}
}

export default styles;