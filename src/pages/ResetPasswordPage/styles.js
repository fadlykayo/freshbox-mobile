import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.white,
		flex: 1,
		paddingTop: width * 0.05,
		paddingHorizontal: width * 0.05,
    },
    formPassword: {
        flex: 1,
    },
    buttonPlace: {
        flex: -1,
        paddingBottom: width * 0.05,
    }
}

export default styles;