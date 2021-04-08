import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';
const { height, width } = Dimensions.get('window');

const style = {
  	modal: {
		container: {
			flex: 1, 
			backgroundColor: 'black', 
			opacity: 0.7, 
			justifyContent: 'center', 
			alignItems: 'center',
		},
		subcontainer: {
			position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
		},
		containerIcon: {
			marginHorizontal: 20,
			alignItems: 'flex-end',
			marginTop: 20,
			position: 'absolute',
			right: 0,
		},
		card: {
			backgroundColor: 'white',
			alignItems: 'center',
			borderRadius: 10,
			marginHorizontal: width * 0.08,
			paddingBottom: 40,
		},
		content: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 20,
		},
		imageWrapper: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		image: {
			height: 93,
			width: 115,
			marginTop: 40,
		},
		textContainer: {
			marginTop: 20,
			paddingBottom: 20,
		},
		title: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(18),
			color: colour.red,
			// marginVertical: 20,
			marginHorizontal: 8,
			textAlign: 'center'
			
		},
		text: {
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(14),
			color: '#888888',
			fontWeight: '400',
			// marginTop : 100,
			marginHorizontal: 10,
			marginTop: 15,
			textAlign: 'center'
		},
		textBottom: {
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(14),
			color: '#888888',
			fontWeight: '400',
			// marginTop : 100,
			marginHorizontal: 20,
			marginTop: 25,
			textAlign: 'center'
		},
		textBold: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
			fontWeight: '400',
			// marginTop : 100,
			margin: 10,
			textAlign: 'center'
		},
		button: {
			container: {
				width: scaling.moderateScale(120),
				marginHorizontal: 10
			}
		},
		buttonWrapper: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
		}
	}

}

export default style;