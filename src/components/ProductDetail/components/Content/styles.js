import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingLeft: width * 0.05,
	},
	text:{
		title:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
		},
		price:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
		},
		category:{
			fontFamily: 'Avenir-Light',
			fontSize: scaling.moderateScale(12),
			color: colour.lightGrey,
		},
		pack:{
			fontFamily: 'Avenir-Light',
			fontSize: scaling.moderateScale(12),
			color: colour.lightGrey,
		}
	},
}

export default styles;