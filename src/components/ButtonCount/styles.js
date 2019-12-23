import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		base: (dashboard) => ({
			position: dashboard ? null : 'absolute',
			right: dashboard ? null : 5,
			bottom: dashboard ? null : 5,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderRadius: 100,
			// marginRight: dashboard ? null : scaling.moderateScale(10),
			marginBottom: dashboard ? scaling.moderateScale(20) : (scaling.isIphone5s() ? scaling.moderateScale(5) : scaling.moderateScale(5)),
		}),
		add:(dashboard) => ({
			borderColor: colour.red,
			backgroundColor: colour.red,
			borderWidth: 1,
			paddingHorizontal: dashboard ? scaling.moderateScale(35) : scaling.moderateScale(12),
			paddingVertical: scaling.moderateScale(5),
			// shadowColor: Platform.OS == 'ios' ? colour.redTransparent : null,
			// shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 3}  : {width: 0,height: 0},
			// shadowRadius: Platform.OS == 'ios' ? 3 : 0,
			// shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			// elevation: Platform.OS == 'android' ? 2 : 0,
		}),
		counter:(dashboard) => ({
			paddingHorizontal: dashboard ? scaling.moderateScale(35) : scaling.moderateScale(12),
			paddingVertical: scaling.moderateScale(5),
			// borderWidth: 1,
			backgroundColor: colour.white,
			borderColor: colour.white,
			shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 3}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 3 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 2 : 0,
		})
	},
	subcontainer:{
		button:{
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
		}
	},
	text:{
		add:{
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(13),
			color: colour.white,
		},
		counter:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(13),
			color: colour.darkGrey,
		},
		button:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(13),
			color: colour.red,
		}
	},
	button: {
		place: {
			borderColor: colour.red,
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
		}
	}
}

export default styles;