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
    },
    checkoutText: {
		fontFamily: 'Avenir-Medium',
		fontSize: scaling.moderateScale(14),
		color: colour.white,
		fontWeight: 'bold',
	},
	icon:{
		width: scaling.moderateScale(20),
		height: scaling.moderateScale(20),
	},
}

export default styles;