import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		base:{
			position: 'absolute',
			right: 0,
			bottom: 0,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderWidth: 1,
			borderRadius: 100,
			marginRight: scaling.moderateScale(10),
			marginBottom: scaling.moderateScale(10),
		},
		add:{
			backgroundColor: colour.red,
			borderColor: colour.red,
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
			shadowColor: Platform.OS == 'ios' ? colour.redTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 5}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 5 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 5 : 0,
		},
		counter:{
			backgroundColor: colour.white,
			borderColor: colour.white,
			shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 5}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 5 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 5 : 0,
		}
	},
	subcontainer:{
		button:{
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
		}
	},
	text:{
		add:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(12),
			color: colour.white,
		},
		counter:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey,
		},
		button:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(14),
			color: colour.red,
		}
	},
}

export default styles;