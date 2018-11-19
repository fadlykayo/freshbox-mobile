import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
		base:{
			alignItems: 'center',
			justifyContent: 'center',
			height: scaling.moderateScale(50),
			width: width * 0.9,
			borderWidth: 1,
			borderRadius: scaling.moderateScale(8),
			paddingLeft: width * 0.05,
			paddingRight: width * 0.05,
		},
		red: {
			borderColor: colour.white,
			backgroundColor: colour.red,
		},
		white: {
			borderColor: colour.red,
			backgroundColor: colour.white,
		}
    },
    staticText: {
		red: {
			fontFamily: 'Avenir-Black',
        	fontSize: scaling.moderateScale(14),
        	color: colour.red
		},
		white: {
			fontFamily: 'Avenir-Black',
        	fontSize: scaling.moderateScale(14),
        	color: colour.white
		}
    },
}

export default styles;