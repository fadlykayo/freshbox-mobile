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
	subcontainer: {
		static: {
			flex: 1,
		}
	},
	text: {
		address: {
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey,
			marginBottom: scaling.moderateScale(10),
		},
		nameAddress: {
			color: colour.grey
		},
		static: {
			fontFamily: 'Avenir-Black',
			fontSize: scaling.moderateScale(12),
			color: colour.grey,
			marginBottom: scaling.moderateScale(10),
		},
		otherAddress: {

		}
	},
	button: {
		otherAddress: {
			marginTop: scaling.moderateScale(10),
			width: width * 0.9,
			height: scaling.moderateScale(50),
			borderColor: colour.red,
			borderWidth: 1,
			borderRadius: 8,
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: scaling.moderateScale(6),
		}
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
}

export default styles;