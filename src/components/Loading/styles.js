import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	loading: {
		container: {
			padding: scaling.moderateScale(10),
			borderWidth: 1,
			borderColor: colour.whiteAO,
			borderRadius: 10,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colour.whiteAO,
		},
		image: {
			width: width * 0.3,
			height: width * 0.3,
		},
		text: {
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(14),
			color: colour.red,
			paddingTop: scaling.moderateScale(5),
		},
	},
}

export default styles;