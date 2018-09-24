import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    eachCartContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: scaling.moderateScale(100),
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.white,
		marginBottom: scaling.moderateScale(15),
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
    },
    imageContainer: {
		flex: 1.5,
		height: 90,
		width: 100,
		justifyContent: 'center',
		paddingLeft: 10,
    },
    picture: {
		height: scaling.moderateScale(45),
		width: scaling.moderateScale(45),
    },
    addContainer: {
		flex: 1.5,
		alignItems: 'flex-end',
		justifyContent: 'space-between',
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
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(70),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.white,
		backgroundColor: colour.red,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	touchableItem: {
		flexDirection: 'row',
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(70),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.lightGrey,
		backgroundColor: colour.white,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	itemText: {
		fontSize: scaling.moderateScale(14),
		color: colour.black
	},
	operatorText: {
		color: colour.red,
		fontWeight: 'bold',
	},
	newItemText: {
		color: colour.white,
		fontWeight: 'bold',
	},
}

export default styles;