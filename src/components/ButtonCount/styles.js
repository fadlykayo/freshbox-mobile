import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	addNewItem: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		backgroundColor: colour.red,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: scaling.moderateScale(30),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.white,
		marginRight: scaling.moderateScale(10),
		marginBottom: scaling.moderateScale(10),
	},
	countContainer: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		backgroundColor: colour.white,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: scaling.moderateScale(30),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.lightGrey,
		marginRight: scaling.moderateScale(10),
		marginBottom: scaling.moderateScale(10),
	},
	itemText: {
		fontFamily: 'Avenir-Medium',
		fontSize: scaling.moderateScale(14),
		color: colour.black,
	},
	boxOperatorLeft: {
		paddingHorizontal: scaling.moderateScale(15),
	},
	boxOperatorRight: {
		paddingHorizontal: scaling.moderateScale(15),
	},
	operatorText: {
		fontFamily: 'Avenir-Medium',
		fontSize: scaling.moderateScale(16),
		color: colour.red,
	},
	newItemText: {
		fontFamily: 'Avenir-Black',
		fontSize: scaling.moderateScale(12),
		color: colour.white,
		paddingHorizontal: scaling.moderateScale(15),
	},
}

export default styles;