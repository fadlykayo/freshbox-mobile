import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flex: 2,
		backgroundColor: colour.white,
		padding: width * 0.05,
		borderBottomColor: colour.lightGrey,
		borderBottomWidth: 1,
	},
	addressText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(12),
		fontWeight: '400',
		color: colour.darkGrey,
		marginBottom: scaling.moderateScale(10),
	},
	nameAddressText: {
		color: colour.grey
	},
	staticText: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(12),
		color: colour.grey,
		marginBottom: scaling.moderateScale(10),
	},
	buttonOtherAddress: {
		marginTop: scaling.moderateScale(10),
		width: width * 0.9,
		height: scaling.moderateScale(50),
		borderColor: colour.red,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: scaling.moderateScale(6),
	},
	otherAddressText: {
		color: colour.red
	},
	staticPlace: {
		flex: 1,
	}
}

export default styles;