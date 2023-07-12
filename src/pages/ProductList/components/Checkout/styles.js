import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const defaultStyle = {
	height: scaling.moderateScale(50),
	width: width * 0.9,
}

const styles = {
	container: {
		...defaultStyle,
		opacity: 0.85,
		borderRadius: 8,
	},
	subcontainer: {
		button: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: width * 0.05,
		}
	},
	checkoutText: {
		fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(14),
		color: colour.white,
	},
	icon: {
		width: scaling.moderateScale(16),
		height: scaling.moderateScale(12),
	},
	checkout: {
		bottom: 0,
		position: 'absolute',
	},
	animated: {
		checkout: (x, y, a, b) => ({
			...defaultStyle,
			bottom: x == 0 && y == true ? a : b,
			position: 'absolute',
			marginBottom: scaling.moderateScale(15),
			marginHorizontal: width * 0.05,
		}),
	}
};

export default styles;