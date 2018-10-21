import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.white,
		flex: 1,
		paddingTop: height * 0.05,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
		marginBottom: height * 0.05,
	},
	content:{
        justifyContent: 'center',
	},
	outerScrollView: {
		flex: 1,
		paddingBottom: width * 0.05,
	}
	
}

export default styles;