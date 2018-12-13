import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
		position: 'absolute',
		bottom: 0,
		justifyContent: 'center',
		height: scaling.moderateScale(50),
		opacity: 0.9,
		width: width * 0.9,
		borderRadius: 8,
		marginHorizontal: width * 0.05,
		marginBottom: scaling.moderateScale(15),
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
	icon:{
		width: scaling.moderateScale(16),
		height: scaling.moderateScale(12),
	},
}

export default styles;