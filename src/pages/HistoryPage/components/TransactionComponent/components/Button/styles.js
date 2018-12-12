import { Dimensions, Platform } from 'react-native';
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
			shadowColor: Platform.OS == 'ios' ? colour.lightOrange : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 0}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 5 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 4 : 0,
			backgroundColor: colour.white,
			alignItems: 'center',
			justifyContent: 'center',
			paddingLeft: scaling.moderateScale(5),
			paddingRight: scaling.moderateScale(5),
		},
		text: {
			color: colour.orange,
			fontFamily: 'Avenir-Heavy',
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
			shadowColor: Platform.OS == 'ios' ? x == 'finish' ? colour.softGreenTransparent: colour.redTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 5}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 5 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 4 : 0,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: scaling.moderateScale(10),
		}),
		text: {
			color: colour.white,
			fontFamily: 'Avenir-Heavy',
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
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(13),
		}
	}
}

export default styles;