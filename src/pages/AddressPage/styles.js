import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		backgroundColor: colour.white,
		// marginTop: width * 0.05,
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