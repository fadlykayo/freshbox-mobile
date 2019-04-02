import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flex: -1,
		paddingHorizontal: width * 0.05,
		paddingBottom: width * 0.03,
		backgroundColor: colour.white,
		borderColor: colour.white,
		shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		shadowOffset: Platform.OS == 'ios' ? { width: 0, height: 0 } : { width: 0, height: 0 },
		shadowRadius: Platform.OS == 'ios' ? 30 : 0,
		shadowOpacity: Platform.OS == 'ios' ? 1.0 : 0,
		elevation: Platform.OS == 'android' ? 10 : 0,
		borderWidth: 1,
		borderTopLeftRadius: scaling.moderateScale(15),
		borderTopRightRadius: scaling.moderateScale(15),
	},
	totalPrice: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: scaling.moderateScale(10),
		marginBottom: scaling.moderateScale(5),
	},
	text: {
		base: {
			fontFamily: 'Avenir-Roman',
			fontWeight: 'bold',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey
		},
		price: {
			color: colour.red
		}
	},
}

export default styles;