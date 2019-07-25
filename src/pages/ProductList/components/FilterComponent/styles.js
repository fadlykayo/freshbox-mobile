import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: -1,
		height: scaling.moderateScale(50),
		borderBottomWidth: 1,
		borderBottomColor: colour.white,
		backgroundColor: colour.darkRed,
		flexDirection: 'row',
	},
	subcontainer: {
		part: (left) => ({
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: width * 0.05,
			justifyContent: 'space-between',
			borderLeftWidth: 1,
			borderLeftColor: left ? colour.shadowRed : '',
		})
	},
	icon: {
		width: scaling.moderateScale(15),
		height: scaling.moderateScale(15),
		position: 'absolute',
		right: 12
	},
	text: {
		title: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(15),
			color: colour.white,
		},
	},
}

export default styles;