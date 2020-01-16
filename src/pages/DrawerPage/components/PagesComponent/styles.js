import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
	},
	page: {
		selected: {
			height: height * 0.085,
			justifyContent: 'center',
			borderLeftWidth: 5,
			borderLeftColor: colour.red,
			paddingLeft: width * 0.05,
		},
		unselected: {
			height: height * 0.085,
			justifyContent: 'center',
			borderLeftWidth: 5,
			borderLeftColor: colour.white,
			paddingLeft: width * 0.05,
		}
	},
	text: {
		selected: {
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(16),
			color: colour.red
		},
		unselected: {
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(16),
			color: colour.darkGrey
		}
	},
}

export default styles;