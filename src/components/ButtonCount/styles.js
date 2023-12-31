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
			borderWidth: 1,
			// marginRight: dashboard ? null : scaling.moderateScale(10),
			marginBottom: dashboard ? scaling.moderateScale(20) : (scaling.isIphone5s() ? scaling.moderateScale(5) : scaling.moderateScale(5)),
		}),
		add:(dashboard, stock) => ({
			borderColor: colour.red,
			backgroundColor: colour.red,
			borderWidth: 1,
			paddingHorizontal: dashboard ? (stock == 0 ? scaling.moderateScale(15) : scaling.moderateScale(30)) : scaling.moderateScale(12),
			paddingVertical: scaling.moderateScale(5),
			// shadowColor: Platform.OS == 'ios' ? colour.redTransparent : null,
			// shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 3}  : {width: 0,height: 0},
			// shadowRadius: Platform.OS == 'ios' ? 3 : 0,
			// shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			// elevation: Platform.OS == 'android' ? 2 : 0,
		}),
		counter:(dashboard) => ({
			backgroundColor: colour.white,
			borderColor: colour.white,
			// borderWidth: 1,
			paddingVertical: scaling.moderateScale(4),
			paddingHorizontal: scaling.moderateScale(18),
			shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
			shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 3}  : {width: 0,height: 0},
			shadowRadius: Platform.OS == 'ios' ? 3 : 0,
			shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
			elevation: Platform.OS == 'android' ? 2 : 0,
		})
	},
	subcontainer:{
		button:{
			// borderWidth: 1,
			// marginHorizontal: 10,
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
		}
	},
	text:{
		add:{
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(14),
			color: colour.white,
		},
		counter:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
		},
		button:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(14),
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