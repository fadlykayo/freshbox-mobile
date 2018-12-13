import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
		base:{
			flex: -1,
			justifyContent: 'center',
			height: scaling.moderateScale(50),
			borderRadius: scaling.moderateScale(8),
		},
		red: {
			alignItems: 'center',
			borderWidth: 1,
			backgroundColor: colour.red,
			borderColor: colour.red,
			shadowColor: Platform.OS == 'ios' ? colour.redTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 2}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 5 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 3 : 0,
		},
		white: {
			alignItems: 'center',
			borderWidth: 1,
			borderColor: colour.red,
			backgroundColor: colour.white,
		}
    },
    staticText: {
		red: {
			fontFamily: 'Avenir-Heavy',
        	fontSize: scaling.moderateScale(14),
        	color: colour.red
		},
		white: {
			fontFamily: 'Avenir-Heavy',
        	fontSize: scaling.moderateScale(14),
        	color: colour.white
		}
	},
	touchable: {
		height: scaling.moderateScale(50),
		paddingHorizontal: width * 0.05,
		alignItems: 'center',
		justifyContent: 'center',
	}
}

export default styles;