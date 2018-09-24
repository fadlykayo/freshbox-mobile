import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.white,
		flex: 1,
		paddingTop: width * 0.05,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
    },
    formPhone: {
        flex: 1,
    },
    buttonPlace: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: width * 0.05,
    }
}

export default styles;