import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length) => ({
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.white,
		marginBottom: (i < length)
			? 	scaling.moderateScale(10)
			:	scaling.moderateScale(65)
	}),
	subcontainer: {
		verification:{
			alignItems: 'flex-end',
			paddingRight: width * 0.05,
		},
		card: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingLeft: width * 0.04,
			paddingRight: width * 0.05,
		},
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
}

export default styles;