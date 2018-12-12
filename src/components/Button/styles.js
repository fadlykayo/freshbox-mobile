import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
		base:{
			flex: -1,
			alignItems: 'center',
			justifyContent: 'center',
			height: scaling.moderateScale(50),
			borderWidth: 1,
			borderRadius: scaling.moderateScale(8),
			paddingHorizontal: width * 0.05,
		},
		red: {
			borderColor: colour.white,
			backgroundColor: colour.red,
			shadowColor: Platform.OS == 'ios' ? colour.redTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 5}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 10 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 4 : 0,
		},
		white: {
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
}

export default styles;