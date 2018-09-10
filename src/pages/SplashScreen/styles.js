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
    logo:{
        width: width * 0.5,
    }
}

export default styles;