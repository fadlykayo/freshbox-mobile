import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    background: {
		position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colour.blackTranslucent,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container:{
		width: width * 0.8,
		backgroundColor: colour.white,
		padding: scaling.moderateScale(10),
		borderRadius: scaling.moderateScale(5),
	},
	text:{
		title:{
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
			color: colour.black,
			textAlign: 'center',
			marginBottom: scaling.moderateScale(10),
		},
		content:{
            fontFamily: 'Avenir-Book',
            fontSize: scaling.moderateScale(12),
            color: colour.black,
			marginBottom: scaling.moderateScale(10),
		},
		button:{
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(12),
            color: colour.white,
		}
	},
	button:{
		alignItems: 'center',
		justifyContent: 'center',
		height: scaling.moderateScale(50),
		backgroundColor: colour.red,
		borderRadius: scaling.moderateScale(5)
	}
}

export default styles;