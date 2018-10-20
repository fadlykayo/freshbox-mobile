import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
	onProcessItem: {
		height: scaling.moderateScale(35),
		width: width * 0.32,
		borderWidth: 2,
		borderRadius: 100,
		borderColor: colour.lightOrange,
		backgroundColor: colour.white,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: scaling.moderateScale(5),
		paddingRight: scaling.moderateScale(5),
	},
	onProcessText: {
		color: colour.orange,
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(12),
	},
	reOrderItem: {
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(90),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.red,
		backgroundColor: colour.red,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	reOrderText: {
		color: colour.white,
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(12),
	}
}

export default styles;