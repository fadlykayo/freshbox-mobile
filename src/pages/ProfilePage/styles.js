import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
		flex: 1,
        backgroundColor: colour.white,
    },
    subcontainer: {
        bottom: {
            flex: -1,
            paddingHorizontal: width * 0.05,
            marginBottom: width * 0.05,
        }
    },
}

export default styles;