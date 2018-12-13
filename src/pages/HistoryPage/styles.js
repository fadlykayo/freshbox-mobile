import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = {
  	container: {
		flex: 1,
		paddingVertical: width * 0.03,	
	},
}

export default styles;