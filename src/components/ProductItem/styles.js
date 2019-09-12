import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length, search, stock, dashboard) => ({
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: dashboard ? null : width * 0.95,
		height: dashboard ? 250 : width * 0.25,
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
		marginBottom: dashboard ? null : (search == true 
			? ((i < length)
				? 	scaling.moderateScale(10)
				:	scaling.moderateScale(5)
			)
			: ((i < length)
			? 	scaling.moderateScale(10)
			:	scaling.moderateScale(25)
			)
		),
		marginHorizontal: scaling.moderateScale(5),
		// paddingTop: dashboard ? null : (i == 1 ? 20 : 0),
	}),
	subcontainer: {
		verification:{
			alignItems: 'flex-end',
			paddingRight: width * 0.05,
		},
		card: (dashboard) => ({
			flexDirection: dashboard ? 'column' : 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingLeft: dashboard ? scaling.moderateScale(5): scaling.moderateScale(10),
			paddingRight: dashboard ? scaling.moderateScale(5): scaling.moderateScale(10),
		}),
		product: (dashboard) => ({
			flexDirection: dashboard ? 'column' : 'row',
			paddingTop: scaling.moderateScale(15),
			paddingBottom: dashboard ? null : scaling.moderateScale(10),
			paddingHorizontal: dashboard ? null : scaling.moderateScale(5),
		}),
		image:(dashboard) => ({
			width: dashboard ? null : width * 0.2,
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: dashboard ? null : width * 0.03,
			marginLeft: dashboard ? null : 10,
		})
	},
	icon:{
		product: (dashboard) => ({
			marginTop: dashboard ? 10 : null,
			height: dashboard ? scaling.moderateScale(100) : scaling.moderateScale(80),
			width: dashboard ? scaling.moderateScale(100) : scaling.moderateScale(80),
			justifyContent: 'center',
    	alignItems: 'center',
		})
	},
}

export default styles;