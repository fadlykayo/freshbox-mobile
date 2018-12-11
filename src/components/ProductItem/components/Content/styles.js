import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
    container: {
		flex: 1,
	},
	text:{
		title:{
			fontFamily: 'Avenir-Black',
			fontSize: scaling.moderateScale(13),
			color: colour.darkGrey,
		},
		price:{
			promo: {
				fontFamily: 'Avenir-Medium',
				fontSize: scaling.moderateScale(12),
				color: colour.grey,
				textDecorationLine: 'line-through',
				
			},
			normal: {
				fontFamily: 'Avenir-Black',
				fontSize: scaling.moderateScale(12),
				color: colour.darkGrey,
			}
		},
		desc:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(10),
			color: colour.grey,
		}
	}
}

export default styles;