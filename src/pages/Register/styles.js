import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingTop: width * 0.05
    },
    content:{
        flex: 1,
        justifyContent: 'center',
    }

}

export default styles;