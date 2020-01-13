import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
		base:(borderRadius) => ({
			flex: -1,
			justifyContent: 'center',
			height: scaling.moderateScale(50),
			// width: scaling.moderateScale(60),
			borderRadius: borderRadius ? scaling.moderateScale(borderRadius) : scaling.moderateScale(8),
		}),
		red: {
			alignItems: 'center',
			borderWidth: 1,
			backgroundColor: colour.red,
			borderColor: colour.red,
		},
		white: {
			alignItems: 'center',
			borderWidth: 1,
			borderColor: colour.red,
			backgroundColor: colour.white,
		}
    },
    staticText: {
		red: (fontSize) => ({
			fontFamily: 'Avenir-Heavy',
        	fontSize: fontSize ? scaling.moderateScale(fontSize) : scaling.moderateScale(14),
        	color: colour.red
		}),
		white: (fontSize) => ({
			fontFamily: 'Avenir-Heavy',
        	fontSize: fontSize ? scaling.moderateScale(fontSize) : scaling.moderateScale(14),
        	color: colour.white
		})
	},
	touchable: {
		height: scaling.moderateScale(50),
		paddingHorizontal: width * 0.05,
		alignItems: 'center',
		justifyContent: 'center',
	}
}

export default styles;