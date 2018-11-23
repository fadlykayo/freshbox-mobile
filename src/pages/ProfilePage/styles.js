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
            height: height * 0.15,
            padding: width * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
}

export default styles;