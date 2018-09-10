import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        backgroundColor: colour.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background:{
        flex: 1,
        width: width,
    }
}

export default styles;