import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.veryLightGrey,
		flex: 1,
		paddingTop: width * 0.01,
    },
  	cartContainer: {
		flex: 1,
		paddingTop: width * 0.02,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
	},
}

export default styles;