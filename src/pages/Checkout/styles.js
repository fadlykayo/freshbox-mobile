import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		marginVertical: width * 0.02,
		backgroundColor: colour.white,
		paddingHorizontal: scaling.moderateScale(30),
	},
	subcontainer:{
		label:{
			width: width * 0.9,
		},
		bottom:{
			flex: 1,
			backgroundColor: colour.white,
			paddingTop: scaling.moderateScale(53),
		},
		buttonDate:{
			height: width * 0.1,
			justifyContent: 'center',
			borderBottomColor: colour.mediumGrey,
			borderBottomWidth: 1,
		},
		icon:{
			position: 'absolute',
			right: 0,
		}
	},
	text:{
		label:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(12),
			color: colour.grey,
			marginBottom: scaling.moderateScale(5),
		},
		date:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey
		}
	},
	icon:{
		height: scaling.moderateScale(15),
		width: scaling.moderateScale(14) 
	},
}

export default styles;