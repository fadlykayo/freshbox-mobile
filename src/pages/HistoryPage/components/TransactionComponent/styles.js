import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	eachContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: height * 0.2,
		borderBottomWidth : 0.5,
		borderColor: colour.lightGrey,
		backgroundColor: colour.white,
		paddingTop: width * 0.05,
		paddingBottom: width * 0.05,
		paddingRight: width * 0.05,
		marginLeft: width * 0.05,
	},
	transactionName: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		color: colour.darkGrey,
		fontSize: scaling.moderateScale(14),
		marginBottom: scaling.moderateScale(2),
	},
	transactionDate: {
		fontFamily: 'Avenir-Roman',
		fontWeight: '400',
		color: colour.grey,
		fontSize: scaling.moderateScale(11),
		marginBottom: scaling.moderateScale(2),
	},
	transactionPrice: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		color: colour.darkGrey,
		fontSize: scaling.moderateScale(16),
		marginBottom: scaling.moderateScale(2),
	},
	onProcessItem: {
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(90),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.lightOrange,
		backgroundColor: colour.white,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
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