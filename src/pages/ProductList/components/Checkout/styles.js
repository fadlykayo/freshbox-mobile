import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    checkoutButton: {
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colour.red,
		height: scaling.moderateScale(50),
		opacity: 0.9,
		width: width * 0.9,
		borderRadius: 8,
		paddingHorizontal: width * 0.05,
		marginBottom: scaling.moderateScale(15),
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