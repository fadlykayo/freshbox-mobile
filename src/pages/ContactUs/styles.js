import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    content:{
        flex: 1,
    },
    middleComponent: {
        flex: 1,
    },
    bottomComponent: {
        marginTop: height * 0.1,
        flex: -1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.16,
    },
}

export default styles;