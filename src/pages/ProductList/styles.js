import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	main: {
		normal: {
			flex: 1,
		},
		modal: {
			flex: 1,
			backgroundColor: colour.blackTranslucent
		},
	},
	container: {
		flex: 1,
		backgroundColor: colour.white,
	},
	cartContainer: {
		flex: 1,
		paddingVertical: scaling.moderateScale(10),
	},
	clear: {
		button: {
			width: width * 0.5,
			height: width * 0.1,
			backgroundColor: colour.white,
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			borderColor: colour.red,
			borderWidth: 1,
			borderRadius: 100,
			marginBottom: scaling.moderateScale(10),
			marginTop: scaling.moderateScale(10)
		},
		text: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(14),
			color: colour.red,
		}
	},
	icon: {
		clear:{
			height: scaling.moderateScale(20),
			width: scaling.moderateScale(20)
		}
	}
}

export default styles;