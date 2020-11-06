import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        marginHorizontal: 20,
        alignItems: 'flex-end',
        marginTop: 20
    }
}

export default styles