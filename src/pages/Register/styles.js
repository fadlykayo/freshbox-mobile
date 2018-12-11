import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: width * 0.05,
    },
    content:{
        justifyContent: 'center',
    }
}

export default styles;