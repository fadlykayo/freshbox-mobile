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
		height: dashboard ? 265 : width * 0.28,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colour.white,
		// borderTop: colour.veryLightGreyTransparent,
		backgroundColor: colour.white,
		shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 2}  : {width: 0,height: 0},
		shadowRadius: Platform.OS == 'ios' ? 5 : 0,
		shadowOpacity: Platform.OS == 'ios' ?  2 : 0,
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
		marginVertical: scaling.moderateScale(8),
		// marginRight: scaling.moderateScale(10),
		paddingTop: dashboard ? null : (i == 1 ? 20 : 20),
		paddingBottom: 20,
	}),
	subcontainer: {
		verification:{
			alignItems: 'flex-end',
			paddingRight: width * 0.05,
			// backgroundColor: 'blue'
		},
		card: (dashboard) => ({
			flexDirection: dashboard ? 'column' : 'row',
			alignItems: 'center',
			justifyContent: 'center',
			// backgroundColor: 'blue',
			// paddingLeft: dashboard ? scaling.moderateScale(5): scaling.moderateScale(10),
			// paddingRight: dashboard ? scaling.moderateScale(5): scaling.moderateScale(10),
		}),
		product: (dashboard) => ({
			flexDirection: dashboard ? 'column' : 'row',
			// paddingTop: scaling.moderateScale(15),
			paddingBottom: dashboard ? scaling.moderateScale(10) : scaling.moderateScale(10),
			// paddingHorizontal: dashboard ? scaling.moderateScale(5): scaling.moderateScale(5),
		}),
		image:(dashboard) => ({
			marginTop: dashboard ? 30 : null,
			width: dashboard ? null : width * 0.2,
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: dashboard ? null : width * 0.03,
			marginLeft: dashboard ? 10 : 10,
		})
	},
	icon:{
		product: (dashboard) => ({
			marginTop: dashboard ? 20 : 20,
			height: dashboard ? scaling.moderateScale(90) : scaling.moderateScale(80),
			width: dashboard ? scaling.moderateScale(90) : scaling.moderateScale(80),
			justifyContent: 'center',
    	alignItems: 'center',
		})
	},
}

export default styles;