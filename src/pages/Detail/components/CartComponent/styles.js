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
		height: height * 0.2,
		backgroundColor: colour.white,
		paddingTop: width * 0.05,
		paddingRight: width * 0.05,
		paddingBottom: width * 0.05,
		marginLeft: width * 0.01,
    },
    imageContainer: {
		height: width * 0.22,
        width: width * 0.22,
        borderColor: colour.lightGrey,
        borderWidth: 1,
        borderRadius: 8,
		backgroundColor: colour.white,
		padding: width * 0.05,
		marginRight: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
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
	pack: {
		flexDirection: 'row',
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(80),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.lightGrey,
		backgroundColor: colour.white,
		alignItems: 'center',
		justifyContent: 'center',
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
}

export default styles;