import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: -1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colour.white,
		paddingVertical: width * 0.05,
		paddingHorizontal: width * 0.05,
	},
	subcontainer:{
		image:{
			height: scaling.moderateScale(80),
			width: scaling.moderateScale(80),
			borderWidth: 1,
			borderRadius: 8,
			borderColor: colour.white,
			backgroundColor: colour.white,
			shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 10}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 5 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 5 : 0,
			padding: width * 0.05,
			marginRight: width * 0.05,
			justifyContent: 'center',
			alignItems: 'center',
		},
		right:{
			alignItems: 'flex-end',
			justifyContent: 'space-between',
		},
		favorite:{
			marginBottom: scaling.moderateScale(15),
		},
		amount:{
			flexDirection: 'row',
			borderWidth: 1,
			borderRadius: 100,
			borderColor: colour.lightGrey,
			backgroundColor: colour.white,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: scaling.moderateScale(10),
			paddingVertical: scaling.moderateScale(5),
		}
	},
	icon:{
		product:{
			height: width * 0.18,
			width: width * 0.18,
		},
		favorite:{
			height: scaling.moderateScale(14),
			width: scaling.moderateScale(14),
		}
	},
	text:{
		desc:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey
		}
	},
}

export default styles;