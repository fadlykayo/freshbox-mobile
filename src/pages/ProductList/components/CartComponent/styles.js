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
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.white,
		marginBottom: scaling.moderateScale(10),
		paddingLeft: width * 0.04,
		paddingRight: width * 0.05,
	},
	container: {
		flexDirection: 'row',
	},
    imageContainer: {
		flex: -1,
		width: width * 0.2,
		justifyContent: 'center',
		marginRight: width * 0.01,
    },
    picture: {
		height: scaling.moderateScale(75),
		width: scaling.moderateScale(75),
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
}

export default styles;