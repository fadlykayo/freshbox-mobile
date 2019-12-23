import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	scrollView: {
		flex: 1,
		backgroundColor: colour.white
	},
	main: {
		normal: {
			flex: 1,
		},
		modal: {
			flex: 1,
			backgroundColor: colour.blackTranslucent
		},
		products: {
			container: {
				flex: -1,
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'space-around',
				// paddingHorizontal: scaling.moderateScale(10),
				// marginVertical: 10,
				marginHorizontal: 10,
			}
		}
	},
	container: {
		flex: 1,
		backgroundColor: colour.white,
		// marginTop: 100,
	},
	cartContainer: {
		flex: 1,
		paddingVertical: scaling.moderateScale(10),
		// backgroundColor: 'blue'
	},
	clear: {
		button: {
			width: width * 0.5,
			height: width * 0.1,
			backgroundColor: colour.white,
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			borderColor: colour.red,
			borderWidth: 1,
			borderRadius: 100,
			marginBottom: scaling.moderateScale(10),
			marginTop: scaling.moderateScale(10)
		},
		text: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(14),
			color: colour.red,
		}
	},
	icon: {
		clear:{
			height: scaling.moderateScale(20),
			width: scaling.moderateScale(20)
		}
	},
	modal: {
		container: {
			flex: 1, 
			backgroundColor: 'black', 
			opacity: 0.7, 
			justifyContent: 'center', 
			alignItems: 'center',
		},
		card: {
			height: height * 0.2,
			width: width * 0.9,
			backgroundColor: 'white',
			position: 'absolute',
			top: 250,
			left: 22,
			justifyContent: 'center',
			alignItems: 'center',
			// borderRadius: 50,
		},
		content: {
			flexDirection: 'row',
			paddingHorizontal: 50,
		},
		image: {
			height: 50,
			width: 56,
			marginRight: 10,
			// marginLeft: 20,
			marginTop: 13,
		},
		title: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(14),
			color: colour.black,
			// marginVertical: 20,
			marginHorizontal: 8,
			
		},
		text: {
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(13),
			color: colour.black,
			// marginTop : 100,
			marginHorizontal: 10,
		}
	}
}

export default styles;