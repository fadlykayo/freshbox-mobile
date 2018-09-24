import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    checkoutButton: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'space-between',
		opacity:0.9,
		height: scaling.moderateScale(50),
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.red,
		marginBottom: width * 0.05,
		marginLeft: width * 0.05,
		flexDirection: 'row',
		paddingRight: width * 0.05,
		paddingLeft: width * 0.05,
    },
    textData: {
		fontFamily: 'Avenir-Light',
		fontWeight: 'bold',
		fontSize: scaling.moderateScale(14),
    },
    checkoutText: {
      	color: colour.white
	},
	icon:{
		width: scaling.moderateScale(20),
		height: scaling.moderateScale(20),
	},
}

export default styles;