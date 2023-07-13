import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flex: 1,
		paddingHorizontal: scaling.moderateScale(30),
		marginVertical: width * 0.05,
	},
	content: {
		flex: 1,
	},
	subcontainer: {
		middle: {
		},
		bottom: {
			flex: -1,
			paddingHorizontal: scaling.moderateScale(30),
			marginBottom: width * 0.025,
		}
	},
	label: {
		fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(14),
		color: colour.darkGrey,
	},
	phone: {
		fontFamily: 'Avenir-Roman',
		fontSize: scaling.moderateScale(12),
		color: colour.blue,
		textDecorationLine: 'underline',
		marginBottom: 10,
	},
	icon: {
		height: 64,
		width: 132,
	},
	iconContainer: {
		flex: -1,
		width: 140,
		marginBottom: 30,
	}
};

export default styles;