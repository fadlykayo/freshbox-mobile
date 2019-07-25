import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length, search, stock) => ({
		alignSelf: 'center',
		width: width * 0.95,
		// height: width * 0.25,
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
				:	scaling.moderateScale(5)
			)
			: ((i < length)
			? 	scaling.moderateScale(10)
			:	scaling.moderateScale(25)
			)
		),
		// paddingTop: i == 1 ? 20 : 0
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
			paddingLeft: scaling.moderateScale(10),
			paddingRight: scaling.moderateScale(10),
		},
		product:{
			flexDirection: 'row',
			paddingTop: scaling.moderateScale(15),
			paddingBottom: scaling.moderateScale(10),
			paddingHorizontal: scaling.moderateScale(5),
		},
		image:{
			flex: -1,
			width: width * 0.2,
			justifyContent: 'center',
			marginRight: width * 0.03,
		}
	},
	icon:{
		product:{
			height: scaling.moderateScale(80),
			width: scaling.moderateScale(80),
			justifyContent: 'center',
    	alignItems: 'center',
		}
	},
}

export default styles;