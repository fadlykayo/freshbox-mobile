import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		marginTop: width * 0.02,
		marginBottom: width * 0.02,
		backgroundColor: colour.veryLightGrey,
	},
	subcontainer:{
		label:{
			width: width * 0.9,
		},
		bottom:{
			flex: 1,
			backgroundColor: colour.white,
			padding: width * 0.05,
			justifyContent: 'center',
			alignItems: 'center',
		},
		buttonDate:{
			width: width * 0.9,
			height: width * 0.1,
			justifyContent: 'center',
			borderBottomColor: colour.lightGrey,
			borderBottomWidth: 1,
		},
		icon:{
			position: 'absolute',
			right: 0,
		}
	},
	text:{
		label:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.grey,
			marginBottom: scaling.moderateScale(5),
		},
		date:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey
		}
	},
	icon:{
		height: scaling.moderateScale(14),
		width: scaling.moderateScale(14) 
	},
}

export default styles;