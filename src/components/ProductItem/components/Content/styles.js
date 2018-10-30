import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
    container: {
		flex: 1,
	},
	text:{
		title:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
		},
		price:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey,
		},
		desc:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(10),
			color: colour.grey,
		}
	}
}

export default styles;