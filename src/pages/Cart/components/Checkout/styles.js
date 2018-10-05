import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    checkoutContainer: {
		flex: -1,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
		backgroundColor: colour.white,
		borderWidth: 1,
		borderColor: colour.veryLightGrey,
		borderTopLeftRadius: scaling.moderateScale(15),
		borderTopRightRadius: scaling.moderateScale(15),
    },
    totalPrice: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: scaling.moderateScale(10),
		marginBottom: scaling.moderateScale(5),
    },
    checkoutButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: scaling.moderateScale(50),
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.red,
		marginBottom: scaling.moderateScale(10),
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
    },
    textData: {
		fontFamily: 'Avenir-Light',
		fontWeight: 'bold',
		fontSize: scaling.moderateScale(14),
    },
    checkoutText: {
      	color: colour.white
    }
}

export default styles;