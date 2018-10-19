import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length) => ({
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.white,
		paddingLeft: width * 0.04,
		paddingRight: width * 0.05,
		marginBottom: (i < length)
			? 	scaling.moderateScale(10)
			:	scaling.moderateScale(65)
	}),
	subcontainer: {
		product:{
			flexDirection: 'row',
			paddingVertical: scaling.moderateScale(10),
		},
		image:{
			flex: -1,
			width: width * 0.2,
			justifyContent: 'center',
			marginRight: width * 0.01,
		}
	},
	icon:{
		product:{
			height: scaling.moderateScale(50),
			width: scaling.moderateScale(50),
		}
	},
    addContainer: {
		flex: 1.5,
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
		height: scaling.moderateScale(60),
    },
	touchableFavorite: {
		marginBottom: scaling.moderateScale(15),
	},
	favoriteLogo: {
		height: scaling.moderateScale(20),
		width: scaling.moderateScale(20),
	},
	addNewItem: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(80),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.white,
		backgroundColor: colour.red,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: width * 0.03,
		marginBottom: width * 0.03,
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	touchableItem: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		flexDirection: 'row',
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(80),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.lightGrey,
		backgroundColor: colour.white,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginRight: width * 0.03,
		marginBottom: width * 0.03,
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	itemText: {
		fontSize: scaling.moderateScale(14),
		color: colour.black
	},
	boxOperatorLeft: {
		flex: 1,
		width: width * 0.05,
		alignItems: 'flex-start',
		paddingLeft: scaling.moderateScale(5),
	},
	boxOperatorRight: {
		flex: 1,
		width: width * 0.05,
		alignItems: 'flex-end',
	},
	operatorText: {
		color: colour.red,
		fontWeight: '400',
		fontSize: scaling.moderateScale(18)
	},
	newItemText: {
		color: colour.white,
		fontWeight: '400',
		fontSize: scaling.moderateScale(12),
	},
}

export default styles;