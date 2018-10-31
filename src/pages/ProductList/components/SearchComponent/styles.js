import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		flexDirection: 'row',
		height: scaling.moderateScale(50),
		maxHeight: scaling.moderateScale(50),
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: colour.red,
		paddingRight: width * 0.05,
	},
	button:{
		position: 'absolute',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		left: 0,
		top: 0,
		bottom: 0,
		width: scaling.moderateScale(50),
		height: scaling.moderateScale(50),
	},
	icon:{
		width: scaling.moderateScale(14),
		height: scaling.moderateScale(14),
	},
	iconSearch: {
		width: scaling.moderateScale(14),
		height: scaling.moderateScale(14),
		marginRight: scaling.moderateScale(15),
	},
	clear: {
		place: {
			width: scaling.moderateScale(25),
			height: scaling.moderateScale(25),
			justifyContent: 'center',
			alignItems: 'center'
		},
		icon: {
			width: scaling.moderateScale(10),
			height: scaling.moderateScale(10),
		}
	},
	title:{
		fontFamily: 'Avenir-Black',
		fontSize: scaling.moderateScale(16),
		color: colour.darkGrey,
	},
	searchContainer: {
		backgroundColor: colour.white,
		width: width * 0.8,
		height: scaling.moderateScale(35),
		borderRadius: 100,
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: scaling.moderateScale(15),
	},
	textinput: {
		fontFamily: 'Avenir-Light',
		fontSize: scaling.moderateScale(14),
		width: width * 0.6,
    color: colour.darkGrey,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: scaling.moderateScale(8),
    paddingBottom: scaling.moderateScale(8)
	}
}

export default styles;