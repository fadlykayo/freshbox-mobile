import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		backgroundColor: colour.white,
		flex: 1,
		paddingTop: width * 0.03,
	},
	cartContainer: {
		flex: 1,
	}
}

export default styles;