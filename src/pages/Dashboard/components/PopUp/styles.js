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
		card: {
			height: height * 0.65,
			width: width * 0.9,
			backgroundColor: 'white',
			position: 'absolute',
			top: 150,
			left: 20,
			// justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
		},
		content: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 20,
		},
		image: {
			height: 93,
			width: 115,
			marginRight: 10,
			// marginLeft: 20,
			marginTop: 40,
			paddingVertical: 20,
		},
		textContainer: {
			marginTop: 50,
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
			marginHorizontal: 10,
			textAlign: 'center'
		},
		button: {
			container: {
				width: width * 0.8,
				position: 'absolute',
				bottom: 30,
			}
		}
	}

}

export default style;