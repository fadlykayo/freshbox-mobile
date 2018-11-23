import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
	transaction: {
		name: {
			fontFamily: 'Avenir-Black',
			color: colour.darkGrey,
			fontSize: scaling.moderateScale(14),
			marginBottom: scaling.moderateScale(2),
		},
		static: {
			fontFamily: 'Avenir-Medium',
			color: colour.darkGrey,
			fontSize: scaling.moderateScale(11),
			marginBottom: scaling.moderateScale(2),
		},
		date: {
			fontFamily: 'Avenir-Medium',
			color: colour.grey,
			fontSize: scaling.moderateScale(11),
			marginBottom: scaling.moderateScale(2),
		},
		price: {
			fontFamily: 'Avenir-Black',
			color: colour.darkGrey,
			fontSize: scaling.moderateScale(15),
			marginBottom: scaling.moderateScale(2),
		}
	},
}

export default styles;