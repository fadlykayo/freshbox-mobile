import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length) => ({
		alignSelf: 'center',
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
			paddingLeft: width * 0.05,
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
}

export default styles;