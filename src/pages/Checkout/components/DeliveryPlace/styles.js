import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flex: 1,
		backgroundColor: colour.white,
		borderBottomColor: colour.mediumGrey,
		borderBottomWidth: 1,
		paddingVertical: width * 0.03,
	},
	subcontainer: {
		static: {
			flex: 1,
		},
		top: {
			flex: 1,
		},
		bottom: {
			flex: -1,
			paddingVertical: width * 0.02,
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
	},
}

export default styles;