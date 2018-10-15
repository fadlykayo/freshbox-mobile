import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    selectedPage: {
		height: height * 0.085,
		justifyContent: 'center',
		borderLeftWidth: 5,
		borderLeftColor: colour.red,
		paddingLeft: width * 0.05,
	},
	selectedText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(16),
		fontWeight: '400',
		color: colour.red
	},
	unselectedPage: {
		height: height * 0.085,
		justifyContent: 'center',
		paddingLeft: width * 0.05,
		borderLeftWidth: 5,
		borderLeftColor: colour.white,
	},
	unselectedText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(16),
		fontWeight: '400',
		color: colour.darkGrey
	},
}

export default styles;