import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length, search, stock) => ({
		alignSelf: 'center',
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		backgroundColor: colour.white,
		shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 10}  : {width: 0,height: 0},
		shadowRadius: Platform.OS == 'ios' ? 30 : 0,
		shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
		elevation: Platform.OS == 'android' ? 3 : 0,
		opacity: stock > 0 ? 1 : 0.5,
		marginBottom: (search == true 
			? ((i < length)
				? 	scaling.moderateScale(10)
				:	scaling.moderateScale(15)
			)
			: ((i < length)
			? 	scaling.moderateScale(10)
			:	scaling.moderateScale(65)
			)
		),
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