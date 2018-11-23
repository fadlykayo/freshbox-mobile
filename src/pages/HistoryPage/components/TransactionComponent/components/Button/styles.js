import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
	process: {
		button: {
			height: scaling.moderateScale(35),
			width: width * 0.32,
			borderWidth: 2,
			borderRadius: 100,
			borderColor: colour.lightOrange,
			backgroundColor: colour.white,
			alignItems: 'center',
			justifyContent: 'center',
			paddingLeft: scaling.moderateScale(5),
			paddingRight: scaling.moderateScale(5),
		},
		text: {
			color: colour.orange,
			fontFamily: 'Avenir-Black',
			fontSize: scaling.moderateScale(12),
		}
	},
	reOrder: {
		button: (x) => ({
			height: scaling.moderateScale(30),
			width: width * 0.32,
			borderWidth: 1,
			borderRadius: 100,
			borderColor: x == 'finish' ? colour.green : colour.red,
			backgroundColor: x == 'finish' ? colour.green : colour.red,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: scaling.moderateScale(10),
		}),
		text: {
			color: colour.white,
			fontFamily: 'Avenir-Black',
			fontSize: scaling.moderateScale(12),
		},
		
	},
	review: {
		place: {
			marginTop: scaling.moderateScale(15),
			alignSelf: 'center',
		},
		text: {
			color: colour.red,
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(13),
		}
	}
}

export default styles;