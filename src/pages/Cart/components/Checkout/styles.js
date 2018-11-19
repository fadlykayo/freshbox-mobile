import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
		flex: -1,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
		paddingBottom: width * 0.03,
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
    textData: {
		fontFamily: 'Avenir-Medium',
		fontSize: scaling.moderateScale(14),
		color: colour.black
    },
}

export default styles;