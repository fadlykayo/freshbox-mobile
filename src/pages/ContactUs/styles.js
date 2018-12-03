import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingHorizontal: width * 0.05,
        marginVertical: width * 0.05,
    },
    content:{
        flex: 1,
    },
    subcontainer: {
        middle: {
        },
        bottom: {
            flex: -1,
            alignItems: 'center',
            marginBottom: width * 0.025,
        }
    },
}

export default styles;