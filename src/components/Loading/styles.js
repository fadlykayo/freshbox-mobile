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
	loadingContainer:{
		padding: scaling.moderateScale(10),
		borderWidth: 1,
		borderColor: '#FFFFFF',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	loadingImage:{
		width: width * 0.2,
		height: width * 0.2,
	},
	loadingText:{
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(14),
		color: colour.red,
		// paddingTop: 10,
	},
}

export default styles;